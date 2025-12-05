import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { proxyRequest } from '@/lib/api-proxy'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies()
  const response = await proxyRequest(`/about/content/${params.id}`, {}, false, cookieStore)
  return response
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies()
  const body = await request.text()
  const response = await proxyRequest(`/about/content/${params.id}`, {
    method: 'PUT',
    body,
    headers: { 'Content-Type': 'application/json' },
  }, true, cookieStore)
  return response
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies()
  const response = await proxyRequest(`/about/content/${params.id}`, {
    method: 'DELETE',
  }, true, cookieStore)
  return response
}

