import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: activities, error: fetchError } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch activity logs', details: fetchError }, { status: 500 })
    }

    return NextResponse.json({ activities })
  } catch (err) {
    console.error('GET /api/activity error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
