# Quick Start

Current stack: Next.js 16, React 19, TypeScript, Tailwind CSS, Sanity Studio, Resend, and Vercel.

## 1. Install

```bash
git clone https://github.com/robinfrancis186/Robinfrancis.in.git
cd Robinfrancis.in
npm install
```

## 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174).

## 3. Validate

```bash
npm run typecheck
npm run build
```

The build script:

1. Optimizes images through `prebuild`.
2. Builds the Sanity Studio in `portfolio-cms`.
3. Copies the Studio output into `public/cms`.
4. Builds the Next.js app.

## 4. Preview Production Locally

```bash
npm start
```

Open [http://localhost:5174](http://localhost:5174).

## 5. Deploy

```bash
git add .
git commit -m "describe the change"
git push origin main
vercel --prod --yes
```

Production domains:

- [https://robinfrancis.in](https://robinfrancis.in)
- [https://robinfrancis.in](https://robinfrancis.in)

## 6. Post-Deploy Smoke Test

```bash
curl -I https://robinfrancis.in/
curl -L https://robinfrancis.in/sitemap.xml
```

Check:

- Home, projects, blog, gallery, card, and one blog post render.
- Contact form submits through `/api/contact`.
- Security headers are present.
- `sitemap.xml`, `robots.txt`, `llms.txt`, and `humans.txt` load.
- No browser console errors on the main user paths.

## Useful Commands

```bash
npm run dev              # development server
npm run typecheck        # TypeScript verification
npm run build            # production build
npm start                # local production server
npm run optimize:images  # image optimization
```

Last updated: July 1, 2026
