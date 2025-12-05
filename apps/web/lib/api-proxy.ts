// Server-side utility for proxying requests to backend API
const BACKEND_API_URL = process.env.API_URL || 'http://localhost:8000'
const API_KEY = process.env.API_KEY || ''

export async function checkAdminSession(cookies: any): Promise<boolean> {
  const session = cookies.get('admin_session')
  return session?.value === 'authenticated'
}

export async function proxyRequest(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = false,
  cookies: any
): Promise<Response> {
  // Check authentication for write operations
  if (requireAuth) {
    const isAuthenticated = await checkAdminSession(cookies)
    if (!isAuthenticated) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  const headers: HeadersInit = new Headers(options.headers)

  // Don't set Content-Type for FormData (browser sets it automatically)
  if (!(options.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
  } else {
    headers.delete('Content-Type')
  }

  // Add API key for write operations
  if (requireAuth && API_KEY) {
    headers.set('X-API-Key', API_KEY)
  }

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  return response
}

