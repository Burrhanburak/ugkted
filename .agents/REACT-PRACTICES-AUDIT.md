# Vercel React Best Practices – Audit Summary

Applied checks from `.agents/skills/vercel-react-best-practices/` (2025-02-15).

## Applied Changes

### 1. Bundle: optimizePackageImports (bundle-barrel-imports)
**Impact:** CRITICAL – 200–800ms import cost reduction

- **apps/web/next.config.js:** Added `optimizePackageImports: ["lucide-react", "@tabler/icons-react"]`
- **apps/admin/next.config.js:** Same configuration

Effect: Barrel imports are transformed into direct imports at build time. Expect faster dev boot and smaller bundles.

### 2. Bundle: Dynamic imports (bundle-dynamic-imports)
**Impact:** CRITICAL – Smaller initial JS

- **apps/web/app/page.tsx:** Below-the-fold components dynamically loaded:
  - `BenefitsTabs`, `UGKTEDTimeline`, `Event`, `TestimonialsComponent`, `EcosystemMarqueeSection`

### 3. Server: React.cache() for auth (server-cache-react)
**Impact:** MEDIUM – Per-request deduplication

- **apps/web/lib/server-auth.ts:** `getCachedSession()` – cached auth for server components
- Use in server components: `const session = await getCachedSession()` instead of direct `auth.api.getSession()`

### 4. Rendering: content-visibility (rendering-content-visibility)
**Impact:** HIGH – Faster initial render for long lists

- **packages/ui/Event.tsx:** Carousel slides: `[content-visibility:auto] [contain-intrinsic-size:0_280px]`
- **apps/web/components/data-table.tsx:** Table rows: `[content-visibility:auto] [contain-intrinsic-size:0_48px]`

### 5. Images: next/image for hero marquee (image optimization)
**Impact:** HIGH – Faster load, WebP/AVIF, proper sizing

- **packages/ui/hero-3.tsx:** Replaced raw `<img>` with `next/image`
  - `priority` for first 2 images (above-fold)
  - `sizes="(max-width: 768px) 144px, 192px"` for responsive loading
  - Automatic WebP/AVIF, lazy loading for rest

### 6. Bundle: Defer third-party (bundle-defer-third-party)
**When adding Analytics:** Use dynamic import with `ssr: false`:

```tsx
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(m => m.Analytics),
  { ssr: false }
)
```

### 7. Lighthouse fixes (2025-02)
- **BenefitsTabs:** Unsplash URLs w=2070→800 (~40MB savings)
- **services-card:** Raw img→next/image with fill
- **Event:** backgroundImage→next/image with fill
- **logo-cloud:** Raw img→next/image
- **Layout:** Added `<main id="main-content">` landmark
- **Event carousel:** aria-label on prev/next buttons
- **Font:** display: "swap" to reduce render blocking

## Remaining (apply when relevant)

| Rule | When to apply |
|------|---------------|
| **async-parallel** | Use `Promise.all()` when multiple independent fetches exist |
| **client-swr-dedup** | Use SWR when adding client-side data fetching |

## References

- Skill: `.agents/skills/vercel-react-best-practices/SKILL.md`
- Full rules: `.agents/skills/vercel-react-best-practices/AGENTS.md`
