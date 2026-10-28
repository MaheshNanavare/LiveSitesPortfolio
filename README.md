# maheshnanavare.co.uk

Portfolio and blog for Mahesh Nanavare. Next.js (App Router), TypeScript,
Tailwind CSS, static export — no server runtime, deploys to Cloudflare
Pages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a project

Edit `data/projects.ts` and add an entry to the `projects` array. Only
add projects that are actually deployed and live — remove the
`placeholder: true` entries as real ones replace them.

Each project gets a folder card and its own section on the homepage,
both showing three screenshots. Save them as 1440×900 WebP files at
`public/media/projects/<slug>/1.webp`, `2.webp` and `3.webp`, plus
640×400 copies named `1-sm.webp` and so on for the folder cards. Set
each screenshot's `page` (shown in the browser frame's address bar) and
`caption` in the project entry. Missing files show a placeholder naming
the expected path.

## Hero image

The homepage hero is `heroMedia` in `data/hero.ts`: a portrait photo at
`public/media/hero/portrait.webp` (960×1200, 4:5) with a 640×800
`portrait-sm.webp` beside it. Until a file exists at the path, the site
shows a placeholder naming it. To use a video instead, change `kind`
and `src`, and keep it short and compressed (videos autoplay on loop).

## Experience

Jobs live in `data/experience.ts`, newest first, and render in the
Experience section of the homepage.

## Adding a blog post

Add a markdown file to `content/blog/`, e.g. `content/blog/my-post.md`:

```md
---
title: "Post title"
date: "2026-01-01"
excerpt: "One line summary shown on the /blog index."
---

Body content in markdown.
```

The post is picked up automatically at build time — no code changes
needed.

## Build & deploy (Cloudflare Pages)

```bash
npm run build
```

This produces a static export in `out/`. In Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: `out`
- Framework preset: None (or Next.js static export, if offered)

No environment variables or server-side functions are required.
