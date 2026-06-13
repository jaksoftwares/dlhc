import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch organizations where the user is an owner, OR where the user is a member
    const { data: orgs, error: orgsError } = await supabase
      .from('organizations')
      .select(`
        *,
        organization_members!inner(role)
      `)
      .eq('organization_members.user_id', user.id)

    if (orgsError) {
      return NextResponse.json({ error: 'Failed to fetch organizations', details: orgsError }, { status: 500 })
    }

    return NextResponse.json({ organizations: orgs })
  } catch (err) {
    console.error('GET /api/organizations error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, logo_url } = body

    if (!name) {
      return NextResponse.json({ error: 'Organization name is required' }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

    // 1. Create Organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        owner_id: user.id,
        name,
        slug,
        logo_url
      })
      .select()
      .single()

    if (orgError) {
      return NextResponse.json({ error: 'Failed to create organization', details: orgError }, { status: 500 })
    }

    // 2. Add user as Owner to organization_members
    const { error: memberError } = await supabase
      .from('organization_members')
      .insert({
        organization_id: org.id,
        user_id: user.id,
        role: 'Owner'
      })

    if (memberError) {
      return NextResponse.json({ error: 'Failed to add owner member to organization', details: memberError }, { status: 500 })
    }

    return NextResponse.json({ organization: org }, { status: 201 })
  } catch (err) {
    console.error('POST /api/organizations error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
