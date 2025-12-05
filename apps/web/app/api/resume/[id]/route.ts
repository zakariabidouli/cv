import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { proxyRequest } from '@/lib/api-proxy'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies()
  const response = await proxyRequest(`/resume/${params.id}`, {
    method: 'DELETE',
  }, true, cookieStore)
  return response
}

