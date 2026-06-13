# Portfolio V2

Premium modern portfolio / agency-style website for a WordPress, WooCommerce, and frontend developer.

## Live URL

After GitHub Pages finishes deploying, the frontend will be available at:

```text
https://adeeliqbalanjum.github.io/portfolio-v2/
```

## Stack

- Next.js App Router
- React + TypeScript
- CSS Modules
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Static export for GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

The static site is exported to `out/`.

## GitHub Pages

This repo includes `.github/workflows/deploy.yml`. In GitHub, go to:

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

Then push to `main` or manually run the workflow.
