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

    const { data: users, error: fetchError } = await supabase
      .from('users')
      .select('id, email, full_name, account_type, created_at, last_login_at')
      .order('created_at', { ascending: false })

    if (fetchError) {
      return NextResponse.json({ error: 'Failed to fetch users', details: fetchError }, { status: 500 })
    }

    return NextResponse.json({ users })
  } catch (err) {
    console.error('GET /api/admin/users error:', err)
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
    const { target_user_id, account_type } = body

    if (!target_user_id || !account_type) {
       return NextResponse.json({ error: 'target_user_id and account_type are required' }, { status: 400 })
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ account_type })
      .eq('id', target_user_id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update user', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (err) {
    console.error('PATCH /api/admin/users error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
