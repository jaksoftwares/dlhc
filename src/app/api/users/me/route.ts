import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, email, full_name, avatar_url, phone_number, account_type, email_verified, created_at, last_login_at')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return NextResponse.json({ error: 'Failed to fetch user profile', details: profileError }, { status: 500 })
    }

    return NextResponse.json({ profile })
  } catch (err) {
    console.error('GET /api/users/me error:', err)
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

    const body = await request.json()
    const { full_name, avatar_url, phone_number } = body

    const updateData: any = {}
    if (full_name !== undefined) updateData.full_name = full_name
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url
    if (phone_number !== undefined) updateData.phone_number = phone_number

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No data to update' }, { status: 400 })
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update user profile', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ profile: updatedProfile })
  } catch (err) {
    console.error('PATCH /api/users/me error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
