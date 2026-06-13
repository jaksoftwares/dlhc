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

    const { data: design, error: designError } = await supabase
      .from('designs')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id) // Simple ownership check (in future we could allow org members to view)
      .single()

    if (designError || !design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 })
    }

    return NextResponse.json({ design })
  } catch (err) {
    console.error('GET /api/designs/[id] error:', err)
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

    const body = await request.json()
    const { design_name, design_data, thumbnail_url, company_profile_id } = body

    const updateData: any = {}
    if (design_name !== undefined) updateData.design_name = design_name
    if (design_data !== undefined) updateData.design_data = design_data
    if (thumbnail_url !== undefined) updateData.thumbnail_url = thumbnail_url
    if (company_profile_id !== undefined) updateData.company_profile_id = company_profile_id

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No data to update' }, { status: 400 })
    }

    const { data: updatedDesign, error: updateError } = await supabase
      .from('designs')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update design', details: updateError }, { status: 500 })
    }

    return NextResponse.json({ design: updatedDesign })
  } catch (err) {
    console.error('PATCH /api/designs/[id] error:', err)
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

    const { error: deleteError } = await supabase
      .from('designs')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete design', details: deleteError }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/designs/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
