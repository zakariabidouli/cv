# Deployment Guide

## Environment Variables Setup

### Backend API (Railway)

Add these environment variables in Railway:

```env
API_KEY=your-secure-api-key-here
DATABASE_URL=your-postgresql-connection-string
CORS_ORIGINS=https://your-frontend.vercel.app
ENVIRONMENT=production
```

**Important:**
- `API_KEY` - Must match the `API_KEY` in Vercel
- `CORS_ORIGINS` - Add your Vercel domain (e.g., `https://your-portfolio.vercel.app`)

### Frontend (Vercel)

Add these environment variables in Vercel:

```env
API_URL=https://your-api.railway.app
API_KEY=your-secure-api-key-here
ADMIN_PASSWORD=your-admin-password-here
```

**Important:**
- `API_URL` - Your Railway API URL
- `API_KEY` - Must match the `API_KEY` in Railway (same value!)
- `ADMIN_PASSWORD` - Password for admin login (can be different from API_KEY)

## Security Notes

✅ **API_KEY is server-side only** - Never exposed to browser
✅ **ADMIN_PASSWORD is server-side only** - Never exposed to browser  
✅ **Authentication uses HTTP-only cookies** - Secure session management

## Quick Checklist

- [ ] Set `API_KEY` in Railway (backend)
- [ ] Set `API_KEY` in Vercel (frontend) - **same value**
- [ ] Set `ADMIN_PASSWORD` in Vercel (frontend)
- [ ] Set `API_URL` in Vercel (points to Railway API)
- [ ] Set `CORS_ORIGINS` in Railway (includes Vercel domain)
- [ ] Set `DATABASE_URL` in Railway

## Testing

1. Deploy backend to Railway
2. Deploy frontend to Vercel
3. Test admin login at `/admin`
4. Test creating/updating content (should work if authenticated)

