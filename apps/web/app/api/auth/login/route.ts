import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_KEY = process.env.API_KEY || ''

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Use API_KEY as admin password (must match Railway API_KEY)
    if (!API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    if (password === API_KEY) {
      const cookieStore = await cookies()
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

