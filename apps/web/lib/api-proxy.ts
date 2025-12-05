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

  try {
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // Forward the response as-is (including error statuses)
    return response
  } catch (error) {
    // Handle network errors or fetch failures
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Proxy request failed to ${BACKEND_API_URL}${endpoint}:`, errorMessage)
    
    return new Response(
      JSON.stringify({ 
        error: `Failed to connect to backend API: ${errorMessage}`,
        details: `Check if API_URL is set correctly. Current: ${BACKEND_API_URL}`
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

