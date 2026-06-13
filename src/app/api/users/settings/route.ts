import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { preferred_theme, preferred_language, email_notifications } = body

    const updateData: any = {}
    if (preferred_theme !== undefined) updateData.preferred_theme = preferred_theme
    if (preferred_language !== undefined) updateData.preferred_language = preferred_language
    if (email_notifications !== undefined) updateData.email_notifications = email_notifications

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No settings data to update' }, { status: 400 })
    }

    const { data: updatedSettings, error: updateError } = await supabase
      .from('user_settings')
      .upsert({ user_id: user.id, ...updateData }, { onConflict: 'user_id' })
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update user settings', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ settings: updatedSettings })
  } catch (err) {
    console.error('PATCH /api/users/settings error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
