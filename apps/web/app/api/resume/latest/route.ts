import { cookies } from 'next/headers'
import { proxyRequest } from '@/lib/api-proxy'

export async function GET() {
  const cookieStore = await cookies()
  const response = await proxyRequest('/resume/latest', {}, false, cookieStore)
  return response
}
