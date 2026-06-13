import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify Admin role
    const { data: adminCheck } = await supabase.from('users').select('account_type').eq('id', user.id).single()
    if (!adminCheck || adminCheck.account_type !== 'Admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    // Gather metrics concurrently
    const [usersCount, orgsCount, templatesCount, downloadsCount] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('templates').select('*', { count: 'exact', head: true }),
      supabase.from('downloads').select('*', { count: 'exact', head: true })
    ])

    return NextResponse.json({ 
      metrics: {
        totalUsers: usersCount.count || 0,
        totalOrganizations: orgsCount.count || 0,
        totalTemplates: templatesCount.count || 0,
        totalDownloads: downloadsCount.count || 0
      }
    })
  } catch (err) {
    console.error('GET /api/admin/metrics error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
