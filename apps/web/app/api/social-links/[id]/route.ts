import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { proxyRequest } from '@/lib/api-proxy'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies()
  const { id } = await params
  const response = await proxyRequest(`/social-links/${id}`, {}, false, cookieStore)
  return response
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies()
  const { id } = await params
  const body = await request.text()
  const response = await proxyRequest(`/social-links/${id}`, {
    method: 'PUT',
    body,
    headers: { 'Content-Type': 'application/json' },
  }, true, cookieStore)
  return response
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies()
  const { id } = await params
  const response = await proxyRequest(`/social-links/${id}`, {
    method: 'DELETE',
  }, true, cookieStore)
  return response
}

