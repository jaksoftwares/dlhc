import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string, memberId: string }> }) {
  try {
    const { id, memberId } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Ensure requester is Owner or Admin
    const { data: requester, error: requesterError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', id)
      .eq('user_id', user.id)
      .single()

    if (requesterError || !requester || (requester.role !== 'Owner' && requester.role !== 'Admin')) {
       return NextResponse.json({ error: 'Forbidden. Requires Admin or Owner role.' }, { status: 403 })
    }

    const body = await request.json()
    const { role } = body

    if (!role) {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 })
    }

    const { data: updatedMember, error: updateError } = await supabase
      .from('organization_members')
      .update({ role })
      .eq('id', memberId)
      .eq('organization_id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update member role', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ member: updatedMember })
  } catch (err) {
    console.error('PATCH /api/organizations/[id]/members/[memberId] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string, memberId: string }> }) {
  try {
    const { id, memberId } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Ensure requester is Owner or Admin
    const { data: requester, error: requesterError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', id)
      .eq('user_id', user.id)
      .single()

    if (requesterError || !requester || (requester.role !== 'Owner' && requester.role !== 'Admin')) {
       return NextResponse.json({ error: 'Forbidden. Requires Admin or Owner role.' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('organization_members')
      .delete()
      .eq('id', memberId)
      .eq('organization_id', id)

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to remove member', details: deleteError }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/organizations/[id]/members/[memberId] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
