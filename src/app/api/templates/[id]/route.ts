import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .eq('status', 'Published')
      .single()

    if (templateError || !template) {
      return NextResponse.json({ error: 'Template not found or not published' }, { status: 404 })
    }

    // Check if it's premium and if the user has access via their subscription
    // If we want to strictly gate premium templates before loading them into the editor:
    if (template.is_premium) {
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('subscription_plans(plan_name)')
        .eq('user_id', user.id)
        .in('status', ['Active', 'Trial'])
        .single()
      
      const planData = sub?.subscription_plans as any
      const isProOrEnterprise = planData && 
        (planData.plan_name === 'Professional' || planData.plan_name === 'Enterprise')

      if (!isProOrEnterprise) {
        return NextResponse.json({ error: 'Premium template requires Professional or Enterprise plan' }, { status: 403 })
      }
    }

    return NextResponse.json({ template })
  } catch (err) {
    console.error('GET /api/templates/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
