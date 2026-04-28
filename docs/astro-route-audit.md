# Astro Route Audit

This audit maps the current TanStack Router app to the Astro SSG structure.

## Current App Shell

- Current root: `src/routes/__root.tsx`
- Current router bootstrap: `src/router.tsx`
- Generated route tree: `src/routeTree.gen.ts`
- Current app shell responsibilities:
  - HTML document structure
  - theme initialization script
  - global `Header`
  - route content
  - global `Footer`
  - TanStack devtools
  - TanStack Query devtools
  - demo store devtools

Astro replacement:

- Create `src/layouts/BaseLayout.astro`.
- Move HTML metadata, theme initialization, `Header`, `Footer`, and page slot into the layout.
- Remove TanStack devtools and query/store devtools from the production Astro shell.

## Public Route Mapping

| Current route file            | URL               | Astro route                      | Data source                                                      | Hydration notes                                                              |
| ----------------------------- | ----------------- | -------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/routes/index.tsx`        | `/`               | `src/pages/index.astro`          | Static components for first pass; later optional `/api/homepage` | Hydrate `DidYouKnowSection` because it uses carousel state/effects.          |
| `src/routes/tentang-kami.tsx` | `/tentang-kami`   | `src/pages/tentang-kami.astro`   | `/api/about`                                                     | No hydration expected unless child components require it.                    |
| `src/routes/mitra.tsx`        | `/mitra`          | `src/pages/mitra.astro`          | `/api/mitra`                                                     | Hydrate `PartnerHeroSection` because video modal/play state uses `useState`. |
| `src/routes/relawan.tsx`      | `/relawan`        | `src/pages/relawan.astro`        | Static component                                                 | No hydration expected unless child component requires it.                    |
| `src/routes/merchandise.tsx`  | `/merchandise`    | `src/pages/merchandise.astro`    | `/api/merchandise-page`                                          | Hydrate `MerchandiseCatalog` because filters use `useState`.                 |
| none                          | `/artikel`        | `src/pages/artikel/index.astro`  | `/api/articles?status=published`                                 | Static listing for first pass.                                               |
| none                          | `/artikel/[slug]` | `src/pages/artikel/[slug].astro` | `/api/articles` with `filters[slug][$eq]`                        | Hydrate slider blocks only if interactive behavior is required.              |

## Demo Route Decision

Current demo routes:

- `src/routes/demo/tanstack-query.tsx`
- `src/routes/demo/store.tsx`

These are starter/demo routes and should not be ported to Astro unless explicitly requested. Removing them also allows TanStack Query/Store demo-only dependencies to be removed if no production components use them.

## Server Function Migration

Current `createServerFn` usage:

- `src/routes/tentang-kami.tsx`: fetches `https://promising-freedom-82afaec97e.strapiapp.com/api/about?populate=*`
- `src/routes/mitra.tsx`: fetches `https://promising-freedom-82afaec97e.strapiapp.com/api/mitra?populate[flowSteps][populate]=*&populate[heroBackgroundMedia][populate]=*`
- `src/routes/merchandise.tsx`: fetches `https://promising-freedom-82afaec97e.strapiapp.com/api/merchandise-page?populate=*`

Astro replacement:

- Move all Strapi calls into `src/lib/strapi/*`.
- Fetch in Astro frontmatter at build time.
- Use `STRAPI_URL` with fallback to the current Strapi Cloud URL for local development.
- Keep singleton page fallback behavior where current components already tolerate missing data.

## Browser-Only Components

These components require hydration in Astro:

- `Header`
  - Currently uses `useLocation` from TanStack Router and Radix sheet components.
  - Must be refactored to accept `currentPath` as a prop from Astro, then hydrate for mobile sheet behavior.
- `ThemeToggle`
  - Uses `window`, `localStorage`, `matchMedia`, and `document`.
  - Hydrate only if included in the layout.
- `DidYouKnowSection`
  - Uses carousel state/effects.
- `PartnerHeroSection`
  - Uses local state for video modal/play behavior.
- `MerchandiseCatalog`
  - Uses local state for category filtering.
- `shared.slider` article block renderer
  - Can start as static gallery; hydrate only if interactive carousel is added.

Static/server-renderable components:

- Most marketing sections can render through Astro's React integration without client hydration.
- Article cards and singleton page sections should be static unless they include browser state.

## Header Refactor Requirement

`src/components/Header.tsx` currently imports `useLocation` from `@tanstack/react-router`. Astro has no TanStack router context, so the component must change to:

- Accept `currentPath?: string`.
- Calculate active links from that prop.
- Keep regular `<a href>` navigation.
- Be hydrated in `BaseLayout.astro` if mobile sheet interactivity requires client JavaScript.

## Cleanup Candidates After Astro Port

Remove only after the Astro equivalents build successfully:

- `src/routes/*`
- `src/routeTree.gen.ts`
- `src/router.tsx`
- `src/integrations/tanstack-query/*` if no production island needs TanStack Query
- `src/lib/demo-store.ts`
- `src/lib/demo-store-devtools.tsx`
- `src/components/demo-AIAssistant.tsx` if unused

Keep:

- `src/components`
- `src/styles.css`
- component tests that still cover reusable UI
- public assets, including the untracked Figma Instagram assets currently used by `AwardsInstagramSection`
