# API Integration Guide

## ✅ Completed

1. **API Client** (`lib/api.ts`)
   - TypeScript types matching backend schemas
   - API client class with all endpoints
   - Error handling

2. **Custom Hooks** (`lib/hooks.ts`)
   - `useProjects()` - Fetch projects
   - `useExperiences()` - Fetch experiences
   - `useSkills()` - Fetch skills and categories
   - `useAbout()` - Fetch about content and stats
   - `useSocialLinks()` - Fetch social links
   - All hooks include loading and error states

3. **Updated Components**
   - ✅ `Projects` - Now fetches from API with loading/error states

## 🔄 Still Need to Update

Update these components to use the API hooks:

1. **Experience Component** (`components/experience.tsx`)
   ```tsx
   import { useExperiences } from "@/lib/hooks"
   const { experiences, loading, error } = useExperiences()
   ```

2. **Skills Component** (`components/skills.tsx`)
   ```tsx
   import { useSkills } from "@/lib/hooks"
   const { categories, loading, error } = useSkills()
   ```

3. **About Component** (`components/about.tsx`)
   ```tsx
   import { useAbout } from "@/lib/hooks"
   const { about, stats, loading, error } = useAbout()
   ```

4. **Hero Component** (`components/hero.tsx`)
   ```tsx
   import { useSocialLinks } from "@/lib/hooks"
   const { links, loading, error } = useSocialLinks()
   ```

5. **Contact Component** (`components/contact.tsx`)
   ```tsx
   import { api } from "@/lib/api"
   // Update handleSubmit to call api.createContact()
   ```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in `/apps/web/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For Docker, the API URL should be:
```env
NEXT_PUBLIC_API_URL=http://api:8000
```

But since frontend runs in browser, use:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📝 Next Steps

1. Update remaining components (Experience, Skills, About, Hero, Contact)
2. Add loading skeletons/spinners for better UX
3. Add error boundaries
4. Consider adding React Query for caching and refetching
5. Test API integration end-to-end

