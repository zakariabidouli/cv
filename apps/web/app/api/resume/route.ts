import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { proxyRequest } from '@/lib/api-proxy'

export async function GET() {
  const cookieStore = await cookies()
  const response = await proxyRequest('/resume/latest', {}, false, cookieStore)
  return response
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const body = await request.json()
  const response = await proxyRequest('/resume/', {
    method: 'POST',
    body: JSON.stringify(body),
  }, true, cookieStore)
  return response
}

