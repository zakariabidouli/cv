import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { proxyRequest } from '@/lib/api-proxy'

export async function GET() {
  const cookieStore = await cookies()
  const response = await proxyRequest('/contacts/', {}, false, cookieStore)
  return response
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const body = await request.text()
  const response = await proxyRequest('/contacts/', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
  }, true, cookieStore)
  return response
}

