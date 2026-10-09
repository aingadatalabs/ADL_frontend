# Ainga Data Labs — ADL Frontend

The public website and interactive product demonstrations for **Ainga Data Labs (ADL)**, a data engineering and market intelligence company. ADL builds extraction pipelines, normalization layers, enrichment systems, and APIs for pricing intelligence, lead ICPs, market research, and data products.

Production website: [www.aingadatalabs.com](https://www.aingadatalabs.com/)

## What’s in the application

- **Landing page (`/`)** — ADL positioning and calls to action, a six-stage pipeline visualization, and the “Why ADL?” section. On mobile, the header collapses to an accessible menu for the primary site routes.
- **Products (`/products`)** — ADL product portfolio.
- **Solutions (`/solutions`)** — What ADL builds, delivery capabilities, and published case studies and results.
- **About ADL (`/about`)** — Company purpose, engineering approach, operating principles, and team approach.
- **Documentation (`/docs`)** — Schema documentation and a representative API payload.
- **Contact (`/contact`)** — Project inquiry form.
- **Privacy and Terms (`/privacy`, `/terms`)** — Legal information.
- **SSIP — Shopify Supplements Intelligence Pipeline (`/ssip`, `/ssip/api-demo`)** — Product experience and API playground backed by ADL’s live SSIP engine hosted on Render. The playground sends requests to the deployed SSIP API (`https://ssip.aingadatalabs.com` in production; the Render service URL during local development). If an API request fails, the playground displays a clearly defined fallback fixture so the UI remains explorable; that fallback is not live backend data. The overview page also includes a curated sample catalog for its product presentation.

The shared footer provides grouped Company, Explore, Connect, and Legal links, a contact callout, and ADL social profiles.

## Routes and canonical URLs

| URL | Purpose |
| --- | --- |
| `/` | ADL landing page |
| `/products` | Product portfolio |
| `/solutions` | Capabilities and case studies |
| `/about` | About ADL |
| `/docs` | Schema documentation |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/ssip` | SSIP overview |
| `/ssip/api-demo` | SSIP API demonstration |

Legacy URLs are handled client-side and replaced with their canonical destinations:

- `/services` and `/work` → `/solutions`
- `/insights` → `/solutions#case-studies`
- `/legal` → `/terms`

The deployment must serve the SPA entry point for application routes. The included `vercel.json` configures a catch-all rewrite to `/index.html`. The Case Studies section is an anchor within Solutions, not a separate page.

## Technology

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4 through the Vite plugin, alongside the application’s custom CSS
- ESLint 10
- Vercel rewrite configuration for client-side routes

## Requirements

- Node.js 20 or newer (the version declared in `package.json`)
- npm

## Local development

From the repository root:

```bash
npm install
npm run dev
```

Vite prints the local development URL, normally `http://localhost:5173`.

### Quality checks

```bash
npm run type-check
npm run lint
npm run build
npm run preview
```

`npm run build` runs the TypeScript check before producing the optimized Vite build in `dist/`. `npm run preview` serves that built output locally; it is not a production server.

## Configuration

Market quote and company fundamentals requests use `VITE_API_BASE_URL` when set, and otherwise use `/api/v1`. To point the frontend at another API origin, provide the variable in the build environment:

```text
VITE_API_BASE_URL=https://api.example.com/api/v1
```

Vite embeds `VITE_` variables in client-side assets. **Never put credentials, private keys, or other secrets in this variable or any `VITE_` variable.** API authentication secrets belong on a server-side service.

Representative API response files and the OpenAPI document are in `public/`. They are public static assets; the SSIP playground’s live backend is a separate deployed service.

## SEO and crawler configuration

- `public/sitemap.xml` lists canonical public pages on `https://www.aingadatalabs.com`.
- `public/robots.txt` points crawlers to that sitemap and allows public pages while excluding `/api/` and JSON files from crawling.
- `index.html` contains the application-wide title, description, Open Graph, and social-card metadata.

When introducing or renaming public routes, update the router, navigation, sitemap, and crawler policy together. Keep aliases out of the sitemap; redirect them to canonical destinations.

## Repository layout

```text
.
├── api/                    # Frontend API client modules
├── public/                 # Static assets, API examples, sitemap, robots policy
├── src/
│   ├── assets/             # Imported static assets
│   ├── components/         # Shared UI components, including the footer
│   ├── types/              # Shared TypeScript contracts
│   ├── App.tsx             # Page views, navigation, and route handling
│   ├── LegalDocsApp.tsx    # Privacy and Terms content
│   ├── SsipApp.tsx         # SSIP product demonstration
│   ├── SsipApiDemo.tsx     # SSIP API playground
│   ├── main.tsx            # React entry point
│   ├── index.css           # Global styles and responsive layouts
│   └── footer.css          # Shared footer styles
├── index.html              # HTML document and global metadata
├── vercel.json             # SPA route rewrite
├── vite.config.ts          # Vite, React, Tailwind, and path alias config
├── tsconfig*.json          # TypeScript project configuration
└── package.json            # Dependencies and project scripts
```

## Ownership

Proprietary. © Ainga Data Labs. All rights reserved.
