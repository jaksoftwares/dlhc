import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: downloads, error: fetchError } = await supabase
      .from('downloads')
      .select('*, designs (design_name, thumbnail_url)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch downloads history', details: fetchError }, { status: 500 })
    }

    return NextResponse.json({ downloads })
  } catch (err) {
    console.error('GET /api/downloads error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
