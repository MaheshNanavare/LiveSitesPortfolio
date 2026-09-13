# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Portfolio and blog for Mahesh Nanavare (maheshnanavare.co.uk). Next.js
App Router + TypeScript + Tailwind CSS v4, built as a fully static
export (`output: "export"` in `next.config.ts`) with no server runtime.
Deploys to Cloudflare Pages.

## Commands

```bash
npm run dev     # local dev server, http://localhost:3000
npm run build   # static export to out/
npm run lint    # eslint
```

There is no test suite, so `npm run build` (which also type-checks)
and `npm run lint` are the checks. The Cloudflare Pages build command
is `npm run build` with output directory `out`. Don't use `npm run
start` (`next start`): it doesn't serve a static export.

## Architecture

- **`app/`** — routes. `app/page.tsx` is the homepage; `app/blog/`
  lists posts and `app/blog/[slug]/page.tsx` renders one, using
  `generateStaticParams` (all routes are pre-rendered at build time,
  required by static export — there is no on-demand rendering).
- **`lib/posts.ts`** — reads markdown files from `content/blog/`,
  parses frontmatter with `gray-matter`, and renders body markdown to
  HTML with `remark`/`remark-html` at build time. This is the only
  data layer for blog content; there's no CMS or database.
- **`content/blog/*.md`** — one file per post. Adding a file is
  sufficient to publish a post; no registration needed elsewhere (see
  README "Adding a blog post" for the frontmatter shape).
- **`data/projects.ts`** — hand-maintained array of portfolio
  projects. Each one renders twice on the homepage: as a folder card
  (`components/ProjectFolder.tsx`) that links to `#project-<slug>`,
  and as its own case-study panel (`components/ProjectCaseStudy.tsx`)
  with three screenshots in `BrowserFrame`s.
  `lib/media.ts#resolveScreenshots` maps a project to
  `public/media/projects/<slug>/<n>.webp` and `<n>-sm.webp`. Only list
  projects that are actually deployed and live; entries with
  `placeholder: true` are stand-ins to be replaced, not real content.
- **`app/maintenance/monthly` and `app/maintenance/annual`** — exist
  intentionally but are not linked from any nav; they carry `noindex`
  metadata. Don't add nav links to them without being asked.
- **Homepage panels** (`app/page.tsx`) are direct children of
  `components/StickyStack.tsx` marked `data-panel` with class `panel`,
  so each needs its own full-width opaque background. On the client,
  StickyStack makes each panel sticky, and as the next one slides over
  it the panel shrinks, dims and rounds its corners. A panel taller
  than the viewport sticks only once its bottom reaches the bottom of
  the screen. Elements marked `data-reveal` (`"fan-left"`/`"fan-right"`
  variants, stagger via the `--reveal-i` style) animate in on scroll.
  The CSS is gated on the `.motion` class, so without JS or with
  reduced motion the page scrolls normally. Anchor targets (`#work`,
  `#project-<slug>`, `#builds`) are zero-height `.stack-anchor` spans
  between panels, because a stuck panel's own position isn't its page
  position. Don't put ids on the panels for linking.
- **Bridge backdrop** — each case-study panel has
  `components/BridgeBackdrop.tsx` behind it: the Clifton Suspension
  Bridge construction renders in `public/media/bridge/<n>.webp`
  (transparent WebPs, stage 1 to 5, same camera). The panel for stage
  n shows stage n over stage n+1, and the top image fades with
  `--panel-progress`, which StickyStack sets on panels marked
  `data-progress`. The last stage is the finished bridge on its own.
- **`data/hero.ts`** — the homepage hero media. `lib/media.ts` checks
  at build time whether a media `src` exists under `public/`; missing
  files render as a labelled placeholder
  (`components/MediaSlot.tsx`), so adding the file is enough.
- **Server/client split** — `lib/posts.ts` and `lib/media.ts` use
  `fs`, so they only run in server components at build time.
  `StickyStack` is the only `"use client"` component and receives
  server-rendered panels as `children`. Don't import `fs`-backed
  modules into client components.
- Next 16 conventions used here: route `params` is a `Promise` and
  must be awaited, and layouts use the generated global
  `LayoutProps<"/">` type. Blog HTML is injected with
  `dangerouslySetInnerHTML` and styled by `.prose-post` rules in
  `app/globals.css`.
- Design tokens (`--color-stone`, `--color-iron`, `--color-ink`,
  `--color-signal` yellow accent, and the currently unused
  `--color-house-*` colours taken from the Cliftonwood houses) and fonts (`--font-sans` = Archivo,
  used wide via `.type-display`/`.type-wide`; `--font-mono` = Martian
  Mono, only for real code) are declared on `:root` in
  `app/globals.css` and exposed to Tailwind utilities (`bg-stone`,
  `text-house-mint`, …) through Tailwind v4's `@theme inline`. There
  is no `tailwind.config`.

## Constraints from static export

- No API routes, middleware, server actions, or anything requiring a
  Node server at runtime — `images.unoptimized: true` is set because
  Next's image optimizer needs a server.
- Every dynamic route must be enumerable at build time via
  `generateStaticParams` (see the blog `[slug]` route).
