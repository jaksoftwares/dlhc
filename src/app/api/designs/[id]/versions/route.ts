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

    // Check design ownership
    const { data: designCheck } = await supabase.from('designs').select('id').eq('id', id).eq('user_id', user.id).single()
    if (!designCheck) return NextResponse.json({ error: 'Design not found' }, { status: 404 })

    const { data: versions, error: versionsError } = await supabase
      .from('design_versions')
      .select('*')
      .eq('design_id', id)
      .order('version_number', { ascending: false })

    if (versionsError) {
      return NextResponse.json({ error: 'Failed to fetch versions', details: versionsError }, { status: 500 })
    }

    return NextResponse.json({ versions })
  } catch (err) {
    console.error('GET /api/designs/[id]/versions error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: designCheck } = await supabase.from('designs').select('id, design_data').eq('id', id).eq('user_id', user.id).single()
    if (!designCheck) return NextResponse.json({ error: 'Design not found' }, { status: 404 })

    // Determine next version number
    const { data: latestVersion } = await supabase
      .from('design_versions')
      .select('version_number')
      .eq('design_id', id)
      .order('version_number', { ascending: false })
      .limit(1)
      .single()

    const nextVersionNum = latestVersion ? latestVersion.version_number + 1 : 1

    const { data: newVersion, error: versionError } = await supabase
      .from('design_versions')
      .insert({
        design_id: id,
        version_number: nextVersionNum,
        version_data: designCheck.design_data
      })
      .select()
      .single()

    if (versionError) {
      return NextResponse.json({ error: 'Failed to save version snapshot', details: versionError }, { status: 500 })
    }

    return NextResponse.json({ version: newVersion }, { status: 201 })
  } catch (err) {
    console.error('POST /api/designs/[id]/versions error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
