import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
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
    const { name, description } = body

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    const { data: category, error: createError } = await supabase
      .from('template_categories')
      .insert({ name, description })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: 'Failed to create category', details: createError }, { status: 500 })
    }

    return NextResponse.json({ category }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/template-categories error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
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
    const { id, name, description } = body

    if (!id) {
       return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { data: category, error: updateError } = await supabase
      .from('template_categories')
      .update({ name, description })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update category', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ category })
  } catch (err) {
    console.error('PATCH /api/admin/template-categories error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
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
    const { id } = body

    if (!id) {
       return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error: deleteError } = await supabase
      .from('template_categories')
      .delete()
      .eq('id', id)

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete category', details: deleteError }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/admin/template-categories error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
