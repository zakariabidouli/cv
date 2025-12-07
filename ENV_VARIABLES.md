# Environment Variables Checklist

## 🔴 BACKEND (Railway) - REQUIRED

```env
# Authentication
API_KEY=your-secure-admin-password
JWT_SECRET_KEY=your-very-secure-random-key-min-32-chars

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# CORS
CORS_ORIGINS=https://cv-delta-vert.vercel.app,http://localhost:3000

# Environment
ENVIRONMENT=production
```

### Generate Secure JWT_SECRET_KEY:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## 🟢 FRONTEND (Vercel) - REQUIRED

```env
API_URL=https://your-railway-backend-url.railway.app
```

### Variables to DELETE from Frontend:
```
❌ API_KEY (REMOVE THIS!)
```

---

## Summary Table

| Variable | Backend | Frontend | Purpose |
|----------|---------|----------|---------|
| API_KEY | ✅ Required | ❌ DELETE | Admin login password |
| JWT_SECRET_KEY | ✅ Required | ❌ No | Sign JWT tokens |
| JWT_ALGORITHM | ✅ Auto (HS256) | ❌ No | Token algorithm |
| JWT_EXPIRATION_HOURS | ✅ Auto (24) | ❌ No | Token lifetime |
| API_URL | ❌ No | ✅ Required | Backend URL |
| DATABASE_URL | ✅ Required | ❌ No | Database connection |
| CORS_ORIGINS | ✅ Required | ❌ No | Allowed domains |
| ENVIRONMENT | ✅ Required | ❌ No | Deployment stage |

---

## Deployment Steps

### 1. Railway Backend
```
1. Go to Railway project settings
2. Add environment variables:
   - API_KEY = your-secure-key
   - JWT_SECRET_KEY = generated-key
   - CORS_ORIGINS = your-frontend-url
3. Deploy
```

### 2. Vercel Frontend
```
1. Go to Vercel project settings → Environment Variables
2. Update:
   - API_URL = your-railway-url
3. Remove API_KEY variable
4. Deploy
```

---

## Verification

After deployment, test:

```bash
# 1. Get JWT token
curl -X POST https://your-backend.railway.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"api_key": "your-api-key"}'

# 2. Use token for protected endpoint
curl -X PUT https://your-backend.railway.app/about/content/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'
```

Expected: 200 OK response
