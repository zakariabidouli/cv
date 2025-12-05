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
    // Ensure BACKEND_API_URL is set
    if (!BACKEND_API_URL || BACKEND_API_URL.trim() === '') {
      console.error('❌ API_URL environment variable is not set!')
      return new Response(
        JSON.stringify({ 
          error: 'API_URL not configured',
          details: 'Set API_URL environment variable in Vercel to your Railway API URL'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
    
    // Remove trailing slash from BACKEND_API_URL
    const baseUrl = BACKEND_API_URL.trim().replace(/\/+$/, '')
    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const fullUrl = `${baseUrl}${cleanEndpoint}`
    
    // Log in all environments for debugging
    console.log(`🔗 Proxying to: ${fullUrl}`)
    
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    })

    // Forward the response as-is (including error statuses)
    return response
  } catch (error) {
    // Handle network errors or fetch failures
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const fullUrl = `${BACKEND_API_URL}${endpoint}`
    
    console.error(`❌ Proxy request failed:`)
    console.error(`   URL: ${fullUrl}`)
    console.error(`   Error: ${errorMessage}`)
    console.error(`   API_URL env: ${BACKEND_API_URL || 'NOT SET'}`)
    
    return new Response(
      JSON.stringify({ 
        error: `Failed to connect to backend API: ${errorMessage}`,
        details: `Unable to reach ${BACKEND_API_URL}${endpoint}`,
        troubleshooting: {
          checkApiUrl: 'Verify API_URL is set in Vercel environment variables',
          checkBackend: 'Verify backend API is running and accessible',
          currentApiUrl: BACKEND_API_URL || 'NOT SET'
        }
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

