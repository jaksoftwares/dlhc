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

    const { data: orgs, error: fetchError } = await supabase
      .from('organizations')
      .select('id, name, slug, created_at, users (email)')
      .order('created_at', { ascending: false })

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch organizations', details: fetchError }, { status: 500 })
    }

    return NextResponse.json({ organizations: orgs })
  } catch (err) {
    console.error('GET /api/admin/organizations error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
