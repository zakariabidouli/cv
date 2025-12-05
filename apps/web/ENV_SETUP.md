# Environment Setup

## Create `.env.local` file

Create a `.env.local` file in the `/apps/web/` directory with the following content:

```env
# Backend API URL (server-side only, not exposed to browser)
API_URL=http://localhost:8000

# API Key (server-side only, never exposed to browser)
# This is used for:
# 1. Admin login password (user enters this to login)
# 2. Authenticating with backend API (sent in X-API-Key header)
# Must match API_KEY in Railway backend
API_KEY=your-secure-api-key-here
```

## For Production

Update the URLs to your production endpoints:

```env
API_URL=https://your-api.railway.app
API_KEY=your-secure-api-key-here
```

## Important Notes

- **API_KEY** must match exactly between Vercel (frontend) and Railway (backend)
- This environment variable is **server-side only** and **never exposed to the browser**
- The frontend uses Next.js API routes (`/api/*`) which proxy requests to the backend
- All authentication is handled via HTTP-only cookies
- `.env.local` is gitignored and won't be committed

## Security

- ✅ API key is stored server-side only
- ✅ Authentication uses HTTP-only cookies
- ✅ No sensitive data exposed to browser
- ✅ One secret (API_KEY) used for both admin login and backend auth

## Admin Authentication

1. Click the "Admin" button in the navigation bar
2. Enter your **API_KEY** as the password (same value as Railway API_KEY)
3. Session is stored in an HTTP-only cookie (7 days)
4. Click "Logout" to end your session
