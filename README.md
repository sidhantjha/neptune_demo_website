# Project Neptune — Lumyn

**Live showcase:** https://neptune-demo-website.pages.dev/

Project Neptune is a Lumyn underwater robotics project exploring autonomous operation, vehicle design, robotic-arm manipulation, and maintenance behaviors. This website is a lightweight, media-first portfolio of its demonstrations and engineering progress—not a full project or company website.

## What you'll see

- **What We've Built:** Three media cards featuring early 3D-printed fins, a prototype update, and a Neptune solution demonstration video. Select a card to expand its media.
- **Project Development Timeline:** A high-level view of initial autonomy development, CAD design and performance analysis, ongoing robotic-arm and maintenance-autonomy work, and the start of physical fabrication (printed fins and fuselage work).

The showcase reflects work in progress; demonstrations and milestones should be updated as the team validates new results.

## Run locally

Node.js `24.13.0` is specified in `.node-version`.

```sh
npm ci
npm run dev
npm run build
npm run lint
```

## Update showcase content

Edit `src/content/showcase.json` to change titles, summaries, ordering, and timeline entries. Add images or video files inside `public/media/demo-XX/` and reference them with a URL beginning `/media/` (omit `public`). Supported formats include JPEG, PNG, WebP, SVG, MP4, and WebM. Video entries may specify an optional `poster` image.

The three current demo assets are:

- `public/media/demo-01/demo1.jpeg`
- `public/media/demo-02/image.png`
- `public/media/demo-03/Project_Neptune_Demo.mp4`

Content is validated by `src/types/showcase.ts`. The carousel supports navigation buttons, pagination, arrow keys, and horizontal swipes. Media opens in an expanded viewer; reduced-motion preferences are respected.

## Deployment

The website is deployed on **Cloudflare Pages**, connected to this repository's `main` branch. New pushes to `main` trigger production builds.

| Setting | Value |
| --- | --- |
| Production URL | https://neptune-demo-website.pages.dev/ |
| Framework | React (Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root |
| Environment variables | None required |

For local production preview:

```sh
npm run build
npm run preview
```
