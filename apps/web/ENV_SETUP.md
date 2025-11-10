# Environment Setup

## Create `.env.local` file

Create a `.env.local` file in the `/apps/web/` directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## For Docker

If running in Docker, the API URL should point to the API service:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Note: Even in Docker, use `localhost:8000` because the browser makes the request, not the container.

## For Production

Update the URL to your production API:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Verification

The API client in `lib/api.ts` is already configured to use this environment variable:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

It will:
1. Use `NEXT_PUBLIC_API_URL` if set
2. Fall back to `http://localhost:8000` if not set

## Important Notes

- The `NEXT_PUBLIC_` prefix is required for Next.js to expose the variable to the browser
- Restart the Next.js dev server after creating/modifying `.env.local`
- `.env.local` is gitignored and won't be committed

