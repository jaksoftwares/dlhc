import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    // Publicly accessible, no auth required to view pricing plans
    const { data: plans, error: plansError } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('monthly_price', { ascending: true })

    if (plansError) {
      return NextResponse.json({ error: 'Failed to fetch plans', details: plansError }, { status: 500 })
    }

    return NextResponse.json({ plans })
  } catch (err) {
    console.error('GET /api/billing/plans error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
