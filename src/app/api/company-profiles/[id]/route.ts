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

    const { data: profile, error: profileError } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Company profile not found' }, { status: 404 })
    }

    // Check if user is part of the organization
    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', profile.organization_id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !member) {
       return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ profile })
  } catch (err) {
    console.error('GET /api/company-profiles/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current profile to check org
    const { data: profileCheck } = await supabase
      .from('company_profiles')
      .select('organization_id')
      .eq('id', id)
      .single()

    if (!profileCheck) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Verify user is Admin or Owner
    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', profileCheck.organization_id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !member || (member.role !== 'Owner' && member.role !== 'Admin')) {
       return NextResponse.json({ error: 'Forbidden. Requires Admin or Owner role.' }, { status: 403 })
    }

    const body = await request.json()
    // Extract editable fields
    const { 
      company_name, tagline, registration_number, tax_pin,
      email, phone, website, address_line_1, address_line_2, city, country, postal_code,
      logo_url, primary_color, secondary_color
    } = body

    const updateData: any = {}
    if (company_name !== undefined) updateData.company_name = company_name
    if (tagline !== undefined) updateData.tagline = tagline
    if (registration_number !== undefined) updateData.registration_number = registration_number
    if (tax_pin !== undefined) updateData.tax_pin = tax_pin
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (website !== undefined) updateData.website = website
    if (address_line_1 !== undefined) updateData.address_line_1 = address_line_1
    if (address_line_2 !== undefined) updateData.address_line_2 = address_line_2
    if (city !== undefined) updateData.city = city
    if (country !== undefined) updateData.country = country
    if (postal_code !== undefined) updateData.postal_code = postal_code
    if (logo_url !== undefined) updateData.logo_url = logo_url
    if (primary_color !== undefined) updateData.primary_color = primary_color
    if (secondary_color !== undefined) updateData.secondary_color = secondary_color

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No data to update' }, { status: 400 })
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('company_profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update company profile', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ profile: updatedProfile })
  } catch (err) {
    console.error('PATCH /api/company-profiles/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profileCheck } = await supabase
      .from('company_profiles')
      .select('organization_id')
      .eq('id', id)
      .single()

    if (!profileCheck) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const { data: member, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', profileCheck.organization_id)
      .eq('user_id', user.id)
      .single()

    if (memberError || !member || member.role !== 'Owner') {
       return NextResponse.json({ error: 'Forbidden. Only the organization Owner can delete profiles.' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('company_profiles')
      .delete()
      .eq('id', id)

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete company profile', details: deleteError }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/company-profiles/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
