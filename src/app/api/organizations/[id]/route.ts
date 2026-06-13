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

    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single()

    if (orgError) {
      return NextResponse.json({ error: 'Organization not found', details: orgError }, { status: 404 })
    }

    // Ensure user is a member
    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !member) {
       return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ organization: org, userRole: member.role })
  } catch (err) {
    console.error(`GET /api/organizations/[id] error:`, err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Ensure user is Owner or Admin
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
    const { name, logo_url } = body

    const updateData: any = {}
    if (name !== undefined) {
       updateData.name = name
       updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)
    }
    if (logo_url !== undefined) updateData.logo_url = logo_url

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No data to update' }, { status: 400 })
    }

    const { data: updatedOrg, error: updateError } = await supabase
      .from('organizations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update organization', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ organization: updatedOrg })
  } catch (err) {
    console.error('PATCH /api/organizations/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Ensure user is Owner
    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !member || member.role !== 'Owner') {
       return NextResponse.json({ error: 'Forbidden. Only the organization Owner can delete it.' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id)

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete organization', details: deleteError }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/organizations/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
