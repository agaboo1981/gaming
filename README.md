# SALVAGE — Orbital Extraction Shooter

A single-page marketing site for **SALVAGE**, a fictional free-to-play orbital
extraction shooter. Six crews enter an abandoned refinery grid. One squad
carries the helium-3 payload out. Everyone else becomes salvage.

> Portfolio concept only. There is no game client, no backend, and no checkout.
> All art is generated placeholder, all dates and stats are sample copy.

Live: `https://gaming-ecru-phi.vercel.app` (set `SITE_URL` at build time to
generate correct SEO URLs for your own domain).

## The concept

In 2081 the Atlas Corporation abandoned its orbital manufacturing grid —
reactors hot, defense drones armed, and a fortune in helium-3 fuel rods sealed
behind Class-3 bulkheads. Now six factions fight over what's left. Matches run
one clock and one objective:

1. **Drop in** — pods punch the hull; landing zones shift every cycle.
2. **Crack the core** — contest ports, hold corridors, breach the bulkheads.
3. **Carry it out** — signal the shuttle and defend the pad. Only the squad
   holding the rods boards.

Four contractors are cleared for deployment (Breacher, Recon, Engineer,
Assault) across four sectors (Refinery Core, Cryo-Vault 4, Shipbreaker Yard,
Logistics Hub).

## Page tour

Home (`/`) runs: Hero → Fiction → Protocol → Operatives → Sectors → Deploy →
Footer. Each route below also works standalone (React Router), with per-route
`<title>` and meta descriptions managed in `src/App.tsx`:

| Route          | Content                                              |
| -------------- | ---------------------------------------------------- |
| `/`            | Full page                                            |
| `/fiction`     | The Atlas abandonment story                          |
| `/protocol`    | The three-beat match loop                           |
| `/operatives`  | Contractor roster with interactive dossier           |
| `/sectors`     | Deployment zones with auto-cycling showcase          |
| `/deploy`      | Platforms, client size, lobby info                   |
| `/terms`, `/privacy`, `/cookies`, `/eula` | Legal screens (`src/lib/legal.ts`) |

The operative roster is the page's one interactive piece: hover, tap, or
arrow-key through Anvil, Phantom, Forge, and Ripper and the dossier follows.
The sector showcase auto-cycles (tap advances; holds still under
`prefers-reduced-motion`). The Deploy band is a single whole-section link.
The footer carries a dispatch-signal signup with inline validation
(`#recruit-form`).

## Design system

One idea runs the whole page: the **Class-3 bulkhead chamfer**. It masks
every photograph, shapes every button, bullets every list, and appears once at
enormous scale as the yellow hero block cropped by the viewport.

- **Palette** — bone ground `#f7f7f7`, bottle-green ink `#0d2a1c`, hazard
  yellow `#f6e016` as the single accent (buttons, hero field, Deploy band,
  footer wordmark blocks).
- **Type** — Bricolage Grotesque only, sentence case. Display 96/64/44px,
  section heads 48/36px, body 16–18px.
- **Rules enforced by tooling** — no eyebrow labels, no monospace UI text, no
  index numbering, no hairlines, no gradients, no resting shadows, no glass,
  no card grids. `npm run` lint/gate below measure all of it: lint reports
  **0 FAIL / 0 WARN**, page inspect **0 FAIL** (one defended WARN: no video —
  no honest footage exists of a fictional station).

## Tech stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS 4 (design tokens in `src/index.css`)
- **Animation:** Framer Motion (staggered entrances, crossfades, press
  feedback — all with reduced-motion fallbacks)
- **Routing:** React Router 7 with scroll restoration
- **Tests:** Playwright e2e (`tests/`)
- **Deploy:** any static host serving `dist/` (Vercel configured)

## Getting started

```bash
npm install
npm run dev      # local dev server
```

## Scripts

| Command        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `npm run dev`  | Start the Vite dev server                                |
| `npm run build`| Regenerate SEO files, then production build into `dist/`|
| `npm run preview` | Serve `dist/` locally (also what Playwright uses)     |
| `npm run seo`  | Generate `sitemap.xml` + `robots.txt` (root and `public/`, both gitignored) |
| `npm run format` | Prettier-format the repo                              |
| `npm run test` | Run the Playwright e2e suite (requires `npx playwright install` first) |

## Project structure

```
├── index.html              Entry, fonts, social/SEO meta
├── manifest.json           PWA manifest
├── vercel.json             SPA fallback rewrite
├── public/assets/          Shipped images + favicon (only referenced files)
├── scripts/
│   └── generate-seo-files.cjs  Sitemap + robots generator (SITE_URL-aware)
├── src/
│   ├── App.tsx             Routes, per-route meta, page composition
│   ├── main.tsx            React entry
│   ├── index.css           Design tokens, motif utilities, type steps
│   ├── lib/                legal.ts (legal copy), utils.ts (cn + easings)
│   ├── hooks/              useMediaQuery
│   └── components/
│       ├── layout/         Navbar (plain bar + mobile menu), Footer (block wordmark + signal form)
│       ├── sections/       Hero, Fiction, Loop, Operatives, Sectors, Deploy
│       ├── screens/        LegalScreen
│       └── system/         Modal (field-recording dialog)
├── tests/                  Playwright specs (modal, mobile menu, keyboard nav, responsive, forms)
└── vite.config.ts          Tailwind + image-copy plugin, `@` alias
```

## SEO & deployment

- `npm run seo` (also runs automatically before every build) writes
  `sitemap.xml` and `robots.txt` to the repo root for local inspection and to
  `public/` so Vite copies them into `dist/` — root copies alone would never
  deploy. Override the domain with `SITE_URL=https://example.com npm run build`.
- `index.html` carries canonical URL, Open Graph/Twitter cards, and
  `VideoGame` JSON-LD. Keep the `og:image` pointed at a real deployed asset.
- `vercel.json` rewrites all routes to `/` so deep links (`/operatives`, …)
  resolve to the SPA.

## Assets & sample copy (swap before any real launch)

- `public/assets/images/` holds **generated placeholder art** (hero, four
  operatives, two sectors, CTA backdrop, modal backdrop). Treat it as
  stand-in for real key art.
- Fictional/sample content: dispatch dates, "12-player lobbies", "24 GB",
  platform availability, patch notes, and legal text in `src/lib/legal.ts`.
- No real quotes, reviews, press, or player statistics are claimed anywhere —
  keep it that way.

## License

All rights reserved. Fictional game concept created as a portfolio
demonstration.
