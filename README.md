# IdeaCrew Corporate Website

![IdeaCrew](public/ideacrew-og.jpg)

The public website for IdeaCrew. This site showcases IdeaCrew's services, portfolio, leadership, careers, news, and contact information. It is built with custom pages, components, and content models.

## Overview

- **Framework**: Astro with TypeScript and React components
- **Styling**: Tailwind CSS
- **Content**: Markdown/MDX via Astro Content Collections
- **Deployment**: Netlify (configured via `netlify.toml`)
- **OG Images**: Dynamic generation for posts and site pages

## Content Model

Content lives under `src/content/` and is organized by collection:

- `site/config.md`: Site-wide metadata
- `news/`: News posts (blog)
- `careers/`: Job postings
- `leaders/`: Leadership bios
- `work/`: Case studies and client work

Static pages live in `src/pages/` (e.g., `about.md`, `contact.md`, `work.md`, etc.). Shared layouts are in `src/layouts/`, and reusable components in `src/components/`.

## Project Structure

```bash
/
├── public/
│   ├── assets/
│   └── ideacrew-og.jpg
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── netlify.toml
└── package.json
```

## Getting Started

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321/` by default.

### Build & Preview

```bash
npm run build
npm run preview
```

The build output is generated in `dist/`.

## Commands

All commands are run from the repository root:

| Command                | Description                                    |
| :--------------------- | :--------------------------------------------- |
| `npm install`          | Install dependencies                           |
| `npm run dev`          | Start the local dev server at `localhost:4321` |
| `npm run build`        | Build the production site to `./dist/`         |
| `npm run preview`      | Preview the built site locally                 |
| `npm run format`       | Format the codebase with Prettier              |
| `npm run format:check` | Check formatting                               |
| `npm run lint`         | Lint with ESLint                               |
| `npm run sync`         | Generate TypeScript types for Astro modules    |

Note: A `prebuild` script copies images from `src/assets/images` to `public/images/` automatically during builds.

## Environment Variables (optional)

Google Search Console site verification can be added via:

```bash
# .env
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

## Deployment

The site is configured for Netlify:

- Build command: `npm run build`
- Publish directory: `dist`
- Additional settings are defined in `netlify.toml`.

## License

MIT License. See `LICENSE` for details.
