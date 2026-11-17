# Project Neptune

Minimal React / TypeScript / Vite showcase. Motion handles the depth carousel, shared media expansion, and scroll handoff. Tailwind is available alongside composition CSS.

## Run

```sh
npm install
npm run dev
npm run build
npm run lint
```

## Deploy to Cloudflare

Use Node.js 24.13.0, pinned in `.node-version`. The website builds to `dist` and requires no environment variables.

### Cloudflare Workers with GitHub

Connect `sidhantjha/neptune_demo_website` in Cloudflare Workers & Pages and select the `main` branch. Set the root directory to the repository root, the build command to `npm run build`, and the deploy command to `npx wrangler deploy`. The included `wrangler.jsonc` serves the static files in `dist`.

Cloudflare deployment guide — https://developers.cloudflare.com/workers/static-assets/

### Cloudflare Pages with GitHub

Create a Pages project connected to the same repository. Select production branch `main`, framework preset `React (Vite)`, build command `npm run build`, and build output directory `dist`. Leave the root directory at the repository root.

Cloudflare React guide — https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

Subsequent pushes to `main` trigger production builds once Git integration is connected. To preview a production build locally, run `npm run build` followed by `npm run preview`.

## Content

Edit `src/content/showcase.json`. Demos are sorted by `order`; pagination adapts automatically. Add an image (`.webp`, `.jpg`, `.png`, or `.svg`) or video (`.mp4`, `.webm`) to `public/media/demo-XX/`, then update `media.src`, `media.type`, `media.alt`, and optional video `media.poster`. Paths start with `/media/`. Images fill the card; expanded media preserves its aspect ratio. Videos have controls in the expanded viewer, never autoplay, and unmount when inactive. Missing files show a quiet fallback.

All four supplied visuals are original SVG concept illustrations, not actual Neptune hardware or footage. `generate-media.mjs` regenerates them. Timeline entries are illustrative placeholders, not reported engineering progress. Replace these and the timeline note with verified content before sharing.

Content is validated at startup in `src/types/showcase.ts`. Navigation supports buttons, pagination, arrow keys while focused in the carousel, and horizontal swipes. Escape or the backdrop closes the viewer; focus returns to the opening control. Reduced-motion preferences disable scroll choreography.

