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
    const { plan_id, interval } = body // interval: 'monthly' or 'yearly'

    if (!plan_id) {
      return NextResponse.json({ error: 'plan_id is required' }, { status: 400 })
    }

    // Verify plan exists
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', plan_id)
      .single()

    if (planError || !plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    // -------------------------------------------------------------
    // TODO: Integrate actual Payment Provider (e.g. Stripe) here.
    // -------------------------------------------------------------
    // Example:
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{ price: interval === 'monthly' ? plan.stripe_price_id_monthly : plan.stripe_price_id_yearly, quantity: 1 }],
    //   mode: 'subscription',
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    //   client_reference_id: user.id
    // })
    // return NextResponse.json({ checkoutUrl: session.url })
    
    // Stub response
    const mockCheckoutUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?checkout_stub=success&plan=${plan.plan_name}`

    return NextResponse.json({ checkoutUrl: mockCheckoutUrl })
  } catch (err) {
    console.error('POST /api/billing/checkout error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
