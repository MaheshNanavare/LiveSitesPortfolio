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

## Hero video

The homepage hero is `heroMedia` in `data/hero.ts`, a path under
`public/` (e.g. `/media/hero/bristol-harbourside.mp4`). Until a file
exists at that path, the site shows a placeholder naming it. To add it,
drop the file at that path and rebuild; to use a photo instead, change
`kind` and `src`. Keep videos short, muted-friendly and compressed
(they autoplay on loop).

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

## Unlinked pages

`/maintenance/monthly` and `/maintenance/annual` exist but are not
linked from anywhere in the site nav. They carry `noindex` metadata.

## Build & deploy (Cloudflare Pages)

```bash
npm run build
```

This produces a static export in `out/`. In Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: `out`
- Framework preset: None (or Next.js static export, if offered)

No environment variables or server-side functions are required.
