import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename')

  if (!filename) {
    return NextResponse.json(
      { error: 'Filename is required' },
      { status: 400 }
    )
  }

  try {
    const buffer = await request.arrayBuffer()
    const blob = await put(filename, buffer, {
      access: 'public',
    })

    return NextResponse.json(blob)
  } catch (error) {
    console.error('Blob upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload blob' },
      { status: 500 }
    )
  }
}
