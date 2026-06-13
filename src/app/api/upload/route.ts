import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@/lib/supabase/server'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { public_id } = body

    if (!public_id) {
      return NextResponse.json({ error: 'public_id is required' }, { status: 400 })
    }

    // Call Cloudinary Admin API to destroy the asset
    const result = await cloudinary.uploader.destroy(public_id)

    if (result.result !== 'ok' && result.result !== 'not found') {
      return NextResponse.json({ error: 'Failed to delete image from Cloudinary', details: result }, { status: 500 })
    }

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('DELETE /api/upload error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
