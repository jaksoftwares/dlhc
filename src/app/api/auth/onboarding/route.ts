import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Validate session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { companyName, organizationName } = body

    if (!companyName) {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 })
    }

    // Default org name to company name if not provided
    const orgName = organizationName || companyName
    const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

    // 1. Create Organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        owner_id: user.id,
        name: orgName,
        slug: slug,
      })
      .select()
      .single()

    if (orgError) {
      return NextResponse.json({ error: 'Failed to create organization', details: orgError }, { status: 500 })
    }

    // 2. Add user as Owner to organization_members
    const { error: memberError } = await supabase
      .from('organization_members')
      .insert({
        organization_id: org.id,
        user_id: user.id,
        role: 'Owner'
      })

    if (memberError) {
      return NextResponse.json({ error: 'Failed to add organization member', details: memberError }, { status: 500 })
    }

    // 3. Create initial Company Profile
    const { data: profile, error: profileError } = await supabase
      .from('company_profiles')
      .insert({
        organization_id: org.id,
        company_name: companyName,
        email: user.email,
        primary_color: '#2563EB',
        secondary_color: '#1E3A8A'
      })
      .select()
      .single()

    if (profileError) {
      return NextResponse.json({ error: 'Failed to create company profile', details: profileError }, { status: 500 })
    }

    // 4. Set User Settings default if needed
    const { error: settingsError } = await supabase
      .from('user_settings')
      .upsert({ user_id: user.id, preferred_theme: 'system' })

    if (settingsError) {
      console.error('Failed to create user settings', settingsError)
    }

    return NextResponse.json({ 
      success: true, 
      organization: org, 
      companyProfile: profile 
    })
    
  } catch (err) {
    console.error('Onboarding error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
