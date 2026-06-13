import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: adminCheck } = await supabase.from('users').select('account_type').eq('id', user.id).single()
    if (!adminCheck || adminCheck.account_type !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const body = await request.json()
    const { category_id, name, description, thumbnail_url, preview_url, template_schema, is_premium, status } = body

    const updateData: any = {}
    if (category_id !== undefined) updateData.category_id = category_id
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (thumbnail_url !== undefined) updateData.thumbnail_url = thumbnail_url
    if (preview_url !== undefined) updateData.preview_url = preview_url
    if (template_schema !== undefined) updateData.template_schema = template_schema
    if (is_premium !== undefined) updateData.is_premium = is_premium
    if (status !== undefined) updateData.status = status

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No data to update' }, { status: 400 })
    }

    const { data: updatedTemplate, error: updateError } = await supabase
      .from('templates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update template', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ template: updatedTemplate })
  } catch (err) {
    console.error('PATCH /api/admin/templates/[id] error:', err)
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

    const { data: adminCheck } = await supabase.from('users').select('account_type').eq('id', user.id).single()
    if (!adminCheck || adminCheck.account_type !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('templates')
      .delete()
      .eq('id', id)

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete template', details: deleteError }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/admin/templates/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
