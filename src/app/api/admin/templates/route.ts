import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
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

    const { data: templates, error: fetchError } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch templates', details: fetchError }, { status: 500 })
    }

    return NextResponse.json({ templates })
  } catch (err) {
    console.error('GET /api/admin/templates error:', err)
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

    const { data: adminCheck } = await supabase.from('users').select('account_type').eq('id', user.id).single()
    if (!adminCheck || adminCheck.account_type !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const body = await request.json()
    const { category_id, name, description, thumbnail_url, preview_url, template_schema, is_premium, status } = body

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    const { data: template, error: createError } = await supabase
      .from('templates')
      .insert({ category_id, name, description, thumbnail_url, preview_url, template_schema: template_schema || {}, is_premium: is_premium || false, status: status || 'Draft' })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: 'Failed to create template', details: createError }, { status: 500 })
    }

    return NextResponse.json({ template }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/templates error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
