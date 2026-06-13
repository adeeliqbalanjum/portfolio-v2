# Muhammad Adeel Iqbal — Premium WordPress Portfolio

A premium Next.js portfolio for Muhammad Adeel Iqbal, redesigned with a Digitalists-inspired layout and interaction direction while keeping Adeel's own visual identity: iCloud-style soft gradients, orange/black/cream color system, glassmorphism cards, Inter typography, rounded buttons, project content, screenshots, and contact details.

## What changed

- Floating pill header with glass blur, light/dark mode toggle, search overlay, Start button, and full-screen animated menu
- Orange preloader, top scroll progress, Lenis smooth scrolling, GSAP + ScrollTrigger reveals
- Rebuilt editorial hero with project mockup, floating labels, clean copy hierarchy, and mobile-safe wrapping
- Premium services section with sticky sidebar, 50+ Projects metric, and glass service cards
- Large stacked selected-work case-study cards with animated screenshots and clear CTAs
- Digitalists-style project index with hover previews
- Polished process, about, and contact sections
- Persistent light/dark mode using `localStorage`, with system-theme fallback on first visit
- Responsive layouts for desktop, tablet, and mobile
- GitHub Pages static export support with `/Portfolio` basePath via the existing workflow

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

## Deploy to GitHub Pages

The repo includes:

```text
.github/workflows/deploy.yml
```

GitHub Pages settings:

```text
Settings → Pages → Source → GitHub Actions
```

Live URL:

```text
https://adeeliqbalanjum.github.io/Portfolio/
```

## Edit content

Project data:

```text
data/projects.js
```

Services/process/tech stack:

```text
data/services.js
```

Contact, resume, and brand settings:

```text
lib/site.js
```
