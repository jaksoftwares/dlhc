import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')
    const isPremium = searchParams.get('is_premium')
    const search = searchParams.get('search')

    let query = supabase
      .from('templates')
      .select('id, category_id, name, description, thumbnail_url, preview_url, is_premium, status, created_at')
      .eq('status', 'Published')

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (isPremium !== null) {
      query = query.eq('is_premium', isPremium === 'true')
    }

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data: templates, error: templatesError } = await query.order('created_at', { ascending: false })

    if (templatesError) {
      return NextResponse.json({ error: 'Failed to fetch templates', details: templatesError }, { status: 500 })
    }

    return NextResponse.json({ templates })
  } catch (err) {
    console.error('GET /api/templates error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
