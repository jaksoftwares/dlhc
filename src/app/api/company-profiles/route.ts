import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get organizations the user belongs to
    const { data: userOrgs } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)

    if (!userOrgs || userOrgs.length === 0) {
      return NextResponse.json({ profiles: [] })
    }

    const orgIds = userOrgs.map(org => org.organization_id)

    // Fetch company profiles that belong to these organizations
    const { data: profiles, error: profilesError } = await supabase
      .from('company_profiles')
      .select('*')
      .in('organization_id', orgIds)

    if (profilesError) {
      return NextResponse.json({ error: 'Failed to fetch company profiles', details: profilesError }, { status: 500 })
    }

    return NextResponse.json({ profiles })
  } catch (err) {
    console.error('GET /api/company-profiles error:', err)
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
    const { 
      organization_id, company_name, tagline, registration_number, tax_pin,
      email, phone, website, address_line_1, address_line_2, city, country, postal_code,
      logo_url, primary_color, secondary_color
    } = body

    if (!organization_id || !company_name) {
      return NextResponse.json({ error: 'organization_id and company_name are required' }, { status: 400 })
    }

    // Verify user is part of the organization and has permissions (Admin/Owner)
    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', organization_id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !member || (member.role !== 'Owner' && member.role !== 'Admin')) {
       return NextResponse.json({ error: 'Forbidden. Requires Admin or Owner role in the organization.' }, { status: 403 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('company_profiles')
      .insert({
        organization_id, company_name, tagline, registration_number, tax_pin,
        email, phone, website, address_line_1, address_line_2, city, country, postal_code,
        logo_url, primary_color, secondary_color
      })
      .select()
      .single()

    if (profileError) {
      return NextResponse.json({ error: 'Failed to create company profile', details: profileError }, { status: 500 })
    }

    return NextResponse.json({ profile }, { status: 201 })
  } catch (err) {
    console.error('POST /api/company-profiles error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
