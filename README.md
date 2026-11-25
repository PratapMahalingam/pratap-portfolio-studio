# Pratap Mahalingam — Studio Portfolio

An animation-first portfolio: a real-time 3D glass sculpture, pinned and scrubbed scroll scenes, a pinned horizontal project gallery, shared-element transitions into 13 case studies, and tone shifts between sections.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText · Lenis · Three.js / React Three Fiber / Drei · Motion · Lucide

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

## Checks before deploying

```bash
npx tsc --noEmit && npm run lint && npm run build
```

## Editing content

| What | File |
|---|---|
| Name, headline, intro, links, roles | `src/lib/profile.ts` |
| Experience, education, skills | `src/lib/profile.ts` |
| The 13 projects (text, metrics, figures, links) | `src/lib/projects.ts` |
| Project figures | `public/work/<slug>/` |
| Resume PDF | `public/Pratap_Mahalingam_Resume.pdf` |
| Social preview image | `public/og-image.jpg` |

## Fallbacks

- **Reduced motion** (OS setting): no preloader, no pinning, no smooth scroll; the 3D scene is replaced by a still image.
- **No WebGL, or a slow GPU**: the same still image. `PerformanceMonitor` switches to it if the frame rate stays low.
- **Touch devices**: native scrolling, a lighter 3D scene and a vertical project stack.
- **JavaScript disabled**: all content is rendered in the server HTML and stays visible.

## Deploy (Vercel)

1. Import this repository at https://vercel.com/new. The framework preset is detected as Next.js; no settings need changing.
2. Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`) if you attach a custom domain. Otherwise social-preview URLs use the Vercel production domain automatically.
