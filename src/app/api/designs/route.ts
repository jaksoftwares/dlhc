import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: designs, error: designsError } = await supabase
      .from('designs')
      .select('*, templates (name, thumbnail_url), organizations(name), company_profiles(company_name)')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (designsError) {
      return NextResponse.json({ error: 'Failed to fetch designs', details: designsError }, { status: 500 })
    }

    return NextResponse.json({ designs })
  } catch (err) {
    console.error('GET /api/designs error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { organization_id, company_profile_id, template_id, design_name, design_data, thumbnail_url } = body

    if (!template_id || !design_name) {
      return NextResponse.json({ error: 'template_id and design_name are required' }, { status: 400 })
    }

    // Check plan limits (Free plan has max designs)
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('subscription_plans(max_designs)')
      .eq('user_id', user.id)
      .in('status', ['Active', 'Trial'])
      .single()

    const planData = sub?.subscription_plans as any
    const maxDesigns = planData?.max_designs || 3 // Default free tier limit
    
    const { count, error: countError } = await supabase
      .from('designs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (countError) {
      return NextResponse.json({ error: 'Failed to check limits', details: countError }, { status: 500 })
    }

    if (count !== null && count >= maxDesigns) {
      return NextResponse.json({ error: 'Design limit reached for your current subscription plan.' }, { status: 403 })
    }

    const { data: design, error: designError } = await supabase
      .from('designs')
      .insert({
        user_id: user.id,
        organization_id,
        company_profile_id,
        template_id,
        design_name,
        design_data: design_data || {},
        thumbnail_url
      })
      .select()
      .single()

    if (designError) {
      return NextResponse.json({ error: 'Failed to create design', details: designError }, { status: 500 })
    }

    return NextResponse.json({ design }, { status: 201 })
  } catch (err) {
    console.error('POST /api/designs error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
