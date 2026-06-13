import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { design_id, format } = body // format: 'PDF' or 'DOCX'

    if (!design_id || !format || (format !== 'PDF' && format !== 'DOCX')) {
      return NextResponse.json({ error: 'Valid design_id and format (PDF/DOCX) are required' }, { status: 400 })
    }

    // Check subscription plan capabilities and limits
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('subscription_plans(allow_docx, max_downloads)')
      .eq('user_id', user.id)
      .in('status', ['Active', 'Trial'])
      .single()

    const planData = sub?.subscription_plans as any
    const allowDocx = planData?.allow_docx || false
    const maxDownloads = planData?.max_downloads || 10 // Free tier default

    // Validate format capability
    if (format === 'DOCX' && !allowDocx) {
      return NextResponse.json({ error: 'DOCX exports require a Professional or Enterprise plan.' }, { status: 403 })
    }

    // Validate download counts for the current billing period
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count, error: countError } = await supabase
      .from('downloads')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString())

    if (countError) {
      return NextResponse.json({ error: 'Failed to verify limits', details: countError }, { status: 500 })
    }

    if (count !== null && count >= maxDownloads) {
       return NextResponse.json({ error: 'Monthly download limit reached for your current plan.' }, { status: 403 })
    }

    // Log the download event
    const { data: downloadLog, error: downloadError } = await supabase
      .from('downloads')
      .insert({
        user_id: user.id,
        design_id,
        format,
        file_url: 'Generated Client-Side' // Adjust if needed
      })
      .select()
      .single()

    if (downloadError) {
      return NextResponse.json({ error: 'Failed to record download', details: downloadError }, { status: 500 })
    }

    // Optional: Log activity
    await supabase.from('activity_logs').insert({
      user_id: user.id,
      activity_type: `Downloaded ${format}`,
      metadata: { design_id }
    })

    return NextResponse.json({ success: true, tracking: downloadLog })
  } catch (err) {
    console.error('POST /api/export/track error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
