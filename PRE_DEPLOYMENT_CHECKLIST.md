# Pre-Deployment Checklist

Use this checklist before every deployment to ensure quality and performance.

## 🔍 Code Quality

- [ ] All TypeScript errors resolved (`npm run lint`)
- [ ] No console errors in browser
- [ ] All components render correctly
- [ ] Dark/light theme works on all pages
- [ ] Mobile responsive on all breakpoints (320px, 768px, 1024px, 1440px)

## 🚀 Performance

- [ ] Images optimized (`npm run optimize:images`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Performance audit passes (`npm run audit:performance`)
- [ ] Bundle sizes within limits:
  - Main bundle: < 600KB
  - Contact chunk: < 350KB
  - Page chunks: < 150KB each
- [ ] No source maps in production build

## 🎨 Visual Testing

### Homepage
- [ ] Hero section loads with correct images (light/dark)
- [ ] About section displays portrait and content
- [ ] Skills section shows all technologies
- [ ] Projects grid displays correctly
- [ ] Blog carousel works (3D rotation)
- [ ] FAQ section expands/collapses
- [ ] Contact form displays and submits

### Projects Page
- [ ] All project cards display
- [ ] Images load correctly
- [ ] Tags display properly
- [ ] Hover effects work
- [ ] Links work (if any)

### Blog Page
- [ ] Blog list displays
- [ ] Individual blog posts load
- [ ] Images display correctly
- [ ] Navigation works (back to list)
- [ ] Sanity CMS integration works

### Gallery Page
- [ ] Images load from Sanity CDN
- [ ] Masonry layout displays correctly
- [ ] Images are optimized (WebP)
- [ ] Lazy loading works

## 🔗 Links & Navigation

- [ ] All internal links work
- [ ] All external links open in new tab
- [ ] Resume PDF downloads correctly
- [ ] Social media links work:
  - [ ] LinkedIn
  - [ ] GitHub
  - [ ] Twitter/X
- [ ] Email link works (mailto:)
- [ ] Navigation menu works on mobile
- [ ] Smooth scroll to sections works

## 📱 Mobile Testing

Test on actual devices or Chrome DevTools:

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad (768px)
- [ ] Android phone (360px)

Check:
- [ ] Text is readable (no tiny fonts)
- [ ] Buttons are tappable (min 44x44px)
- [ ] No horizontal scroll
- [ ] Images fit screen
- [ ] Forms are usable

## 🔒 Security

- [ ] No API keys in code
- [ ] No sensitive data exposed
- [ ] HTTPS enforced (redirect script in index.html)
- [ ] Content Security Policy meta tag present
- [ ] security.txt accessible at /.well-known/security.txt

## 🔍 SEO

- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URLs set correctly
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible and valid
- [ ] llms.txt accessible
- [ ] humans.txt accessible
- [ ] Structured data (Schema.org) present:
  - [ ] ProfilePage
  - [ ] Person
  - [ ] SoftwareApplication
  - [ ] FAQPage
  - [ ] BreadcrumbList

## ♿ Accessibility

- [ ] All images have alt text
- [ ] Heading hierarchy is correct (h1 → h2 → h3)
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels where needed
- [ ] No accessibility errors in Lighthouse

## 📊 Analytics

- [ ] Google Analytics tracking code present
- [ ] Google Tag Manager configured
- [ ] Events tracking works:
  - [ ] Contact form clicks
  - [ ] Resume downloads
  - [ ] External link clicks
- [ ] No tracking in development mode

## 🧪 Testing Commands

```bash
# Lint code
npm run lint

# Optimize images
npm run optimize:images

# Build production
npm run build

# Audit performance
npm run audit:performance

# Preview production
npm run preview

# Run Lighthouse
lighthouse http://localhost:4173 --preset=mobile --view
lighthouse http://localhost:4173 --preset=desktop --view
```

## 📈 Performance Targets

### Lighthouse Scores
- Desktop Performance: 99+
- Mobile Performance: 75+
- SEO: 100
- Accessibility: 100
- Best Practices: 100

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Bundle Sizes
- Initial JS: < 600KB
- Initial CSS: < 100KB
- Total Assets: < 2MB

## 🚨 Critical Issues (Must Fix Before Deploy)

If any of these fail, DO NOT deploy:

- [ ] Build fails
- [ ] TypeScript errors
- [ ] Broken links on homepage
- [ ] Images not loading
- [ ] Contact form broken
- [ ] Mobile layout broken
- [ ] Lighthouse Performance < 50 (mobile)
- [ ] Accessibility errors

## ⚠️ Warnings (Should Fix Soon)

These can be deployed but should be fixed ASAP:

- [ ] Bundle size > 700KB
- [ ] Images > 200KB each
- [ ] Lighthouse Performance 50-75 (mobile)
- [ ] Missing alt text on some images
- [ ] Slow API responses (Sanity)

## ✅ Deployment Steps

Once all checks pass:

1. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: [describe changes]"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Monitor deployment**
   - Check GitHub Actions for build status
   - Wait 2-3 minutes for deployment
   - Verify site is live

4. **Post-deployment verification**
   - Visit https://www.robinfrancis.in/
   - Test critical paths (homepage, projects, blog, contact)
   - Check browser console for errors
   - Test on mobile device

5. **Monitor analytics**
   - Check Google Analytics for traffic
   - Monitor Core Web Vitals in Search Console
   - Check for 404 errors

## 📝 Deployment Notes

**Date**: _______________
**Version**: _______________
**Deployed by**: _______________

**Changes in this deployment**:
- 
- 
- 

**Known issues**:
- 
- 

**Rollback plan** (if needed):
```bash
git revert HEAD
git push origin main
```

---

**Last Updated**: March 19, 2026
**Next Review**: Before every deployment
