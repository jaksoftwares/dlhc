import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Ensure user is part of the org
    const { data: memberCheck, error: memberCheckError } = await supabase
      .from('organization_members')
      .select('id')
      .eq('organization_id', id)
      .eq('user_id', user.id)
      .single()

    if (memberCheckError || !memberCheck) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: members, error: membersError } = await supabase
      .from('organization_members')
      .select(`
        *,
        users ( id, email, full_name, avatar_url )
      `)
      .eq('organization_id', id)

    if (membersError) {
      return NextResponse.json({ error: 'Failed to fetch members', details: membersError }, { status: 500 })
    }

    return NextResponse.json({ members })
  } catch (err) {
    console.error('GET /api/organizations/[id]/members error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Ensure user is Admin or Owner
    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !member || (member.role !== 'Owner' && member.role !== 'Admin')) {
       return NextResponse.json({ error: 'Forbidden. Requires Admin or Owner role.' }, { status: 403 })
    }

    const body = await request.json()
    const { email, role } = body // Target user's email

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 })
    }

    // Lookup user by email in the users table
    const { data: targetUser, error: targetUserError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (targetUserError || !targetUser) {
       return NextResponse.json({ error: 'User not found with this email' }, { status: 404 })
    }

    // Add to members
    const { data: newMember, error: newMemberError } = await supabase
      .from('organization_members')
      .insert({
        organization_id: id,
        user_id: targetUser.id,
        role: role,
        invited_by: user.id
      })
      .select()
      .single()

    if (newMemberError) {
      return NextResponse.json({ error: 'Failed to invite user', details: newMemberError }, { status: 500 })
    }

    return NextResponse.json({ member: newMember }, { status: 201 })
  } catch (err) {
    console.error('POST /api/organizations/[id]/members error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
