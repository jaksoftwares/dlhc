import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    // Template categories are publicly viewable or for logged-in users only.
    // Enforcing auth check ensures platform is restricted appropriately.
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: categories, error: fetchError } = await supabase
      .from('template_categories')
      .select('*')
      .order('name', { ascending: true })

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch categories', details: fetchError }, { status: 500 })
    }

    return NextResponse.json({ categories })
  } catch (err) {
    console.error('GET /api/template-categories error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
