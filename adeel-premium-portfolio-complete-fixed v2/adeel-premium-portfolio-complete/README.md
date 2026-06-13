# Muhammad Adeel Iqbal — Premium Portfolio

A premium freelance portfolio built for client acquisition.

## Built with

- Next.js static export
- HTML/CSS/JavaScript
- GSAP animations
- Three.js hero visual
- Digitalists-inspired premium header behavior
- Static case-study pages
- GitHub Pages deployment workflow
- FormSubmit contact form

## Local setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build static site

```bash
npm run build
```

The static site is exported to:

```text
out/
```

## GitHub Pages deployment

This project includes:

```text
.github/workflows/deploy.yml
```

For the repository `adeeliqbalanjum/Portfolio`, the workflow uses:

```text
BASE_PATH=/Portfolio
NEXT_PUBLIC_BASE_PATH=/Portfolio
```

After pushing to GitHub:

1. Go to your GitHub repository.
2. Open **Settings**.
3. Go to **Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Push to the `main` branch.
6. Wait for the Actions workflow to finish.

Your site should be available at:

```text
https://adeeliqbalanjum.github.io/Portfolio/
```

## Case-study pages

Every project in `data/projects.js` automatically generates a static case-study page:

```text
/projects/griffin-it/
/projects/desert-safari-dubai/
/projects/artisan-technologies/
```

To add a new case study, add a new object to:

```text
data/projects.js
```

Required fields:

```text
slug, title, industry, category, role, stack, summary, result, challenge, solution, outcome, highlights, liveUrl
```

## Contact form

The contact form posts to FormSubmit:

```text
https://formsubmit.co/adeeliqbalajum@gmail.com
```

Important: the first form submission may send a confirmation email to activate FormSubmit for this inbox. After activation, inquiries will arrive directly in the email inbox.

To replace with another service, edit:

```text
lib/site.js
```

and change:

```js
formEndpoint
```

## Editing content

Project data:

```text
data/projects.js
```

Services, process, and tech stack:

```text
data/services.js
```

Main brand/contact settings:

```text
lib/site.js
```

Project images:

```text
public/images/projects/
```

Resume PDF:

```text
public/docs/muhammad-adeel-iqbal-resume.pdf
```
