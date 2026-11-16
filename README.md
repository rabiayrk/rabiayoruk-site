# rabiayoruk.com

Personal research and project site of Rabia Yoruk. Static, built with Astro, hosted on Cloudflare Workers.

## Run locally

Needs Node 22.12 or newer (`.nvmrc`).

```bash
nvm use
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/ (also regenerates Open Graph images)
npm run preview    # serves dist/
```

## Where the content lives

Editing content means editing one file. No code changes needed.

| What | File |
|---|---|
| Name, intro, links, research interests, papers in preparation, experience, education, mentoring | `src/data/profile.yaml` |
| Papers and books (synced from ORCID, BibTeX is generated from these) | `src/data/publications.json`, edits in `publications.overrides.yml` |
| Project case studies (text, numbers, stack, architecture diagram) | `src/content/projects/*.md` |
| Demo listings for the home page playground (synthetic) | `src/data/listings.ts` |
| Portrait and screenshots | `src/assets/` |

### Add a paper

Add it to ORCID. Every Monday the Publications workflow runs [orcid2site](https://github.com/rabiayrk/orcid2site), which reads ORCID, fills in the details from Crossref and opens a pull request that updates `src/data/publications.json`. Merge it and the paper appears on the home page, in `/publications.bib`, in `/bib/<id>.bib` and in the JSON-LD. To run it now, start the workflow by hand under Actions.

Do not edit `publications.json` by hand. Roles, notes, fixes and works that are not in ORCID (the books) go in `publications.overrides.yml`.

### Add a project

Copy a file in `src/content/projects/`. The `diagram` block draws the architecture figure:
`columns` is a list of columns (left to right on desktop, top to bottom on phones), each a list of nodes.
`kind` is `process`, `model` (amber), `store` or `external` (dashed). `edges` connect node ids.

## Structure

```
src/
  components/   Pipeline (home demo), Diagram, Chart, Header, Footer
  content/      project case studies (Markdown)
  data/         profile, publications, demo listings
  layouts/      Base layout: meta, Open Graph, JSON-LD, theme
  lib/          BibTeX and JSON-LD helpers, YAML loader
  pages/        routes, plus .bib and robots.txt endpoints
scripts/og.mjs  builds Open Graph PNGs before each build
```

## Dependencies and why

| Package | Why |
|---|---|
| `astro` | Static output, zero JS by default, scripts only where needed. |
| `@astrojs/sitemap` | Generates `sitemap-index.xml`. |
| `@fontsource-variable/schibsted-grotesk` | Text face. One variable file, self-hosted, no Google request. |
| `@fontsource-variable/jetbrains-mono` | Mono face for numbers and metadata. Variable, self-hosted. |
| `satori`, `@resvg/resvg-js` (dev) | Render Open Graph images at build time. Nothing ships to the browser. |
| `@fontsource/*` static (dev) | WOFF files for satori, which cannot read WOFF2. |
| `js-yaml` (dev) | Reads `profile.yaml` at build time. |
| `wrangler` (dev) | Cloudflare's CLI. Deploys `dist/` as Workers static assets. |

No UI framework, no animation library, no D3. The demo is plain SVG with about 7 KB of JavaScript.

## Deploy

The site runs on Cloudflare Workers (static assets). Config: `wrangler.jsonc`.

Push to `main`. GitHub Actions builds the site and runs `wrangler deploy` (`.github/workflows/deploy.yml`).
Repository secrets: `CLOUDFLARE_API_TOKEN` (template "Edit Cloudflare Workers") and `CLOUDFLARE_ACCOUNT_ID`.

Manual deploy from your machine: `npm run build && npx wrangler deploy` (asks you to log in once).

## Analytics

Cloudflare Web Analytics, turned on in the dashboard (Analytics and logs, Web Analytics). No cookies, no banner needed.
