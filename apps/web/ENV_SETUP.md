# Environment Setup

## Create `.env.local` file

Create a `.env.local` file in the `/apps/web/` directory with the following content:

```env
# Backend API URL (server-side only, not exposed to browser)
API_URL=http://localhost:8000

# API Key (server-side only, never exposed to browser)
API_KEY=your-secure-api-key-here

# Admin password for login (server-side only)
ADMIN_PASSWORD=your-secure-password-here
```

## For Production

Update the URLs to your production endpoints:

```env
API_URL=https://your-api.railway.app
API_KEY=your-secure-api-key-here
ADMIN_PASSWORD=your-secure-password-here
```

## Important Notes

- **API_KEY** and **ADMIN_PASSWORD** should match the same values set in your backend API
- These environment variables are **server-side only** and **never exposed to the browser**
- The frontend uses Next.js API routes (`/api/*`) which proxy requests to the backend
- All authentication is handled via HTTP-only cookies
- `.env.local` is gitignored and won't be committed

## Security

- ✅ API key is stored server-side only
- ✅ Admin password is stored server-side only
- ✅ Authentication uses HTTP-only cookies
- ✅ No sensitive data exposed to browser

## Admin Authentication

1. Click the "Admin" button in the navigation bar
2. Enter your admin password
3. Session is stored in an HTTP-only cookie (7 days)
4. Click "Logout" to end your session
