# Performance Optimization Guide

## Recent Optimizations (March 2026)

### ✅ Completed Improvements

#### 1. Build Configuration
- **Disabled source maps in production** - Reduces bundle size and parser overhead
- **Implemented manual code splitting** - Separated heavy libraries into dedicated chunks:
  - `three-vendor`: Three.js and @react-three/fiber (~300KB)
  - `lottie-vendor`: Lottie animations (~50KB)
  - `sanity-vendor`: Sanity CMS client (~80KB)
  - `animation-vendor`: Framer Motion and GSAP (~120KB)
- **Set chunk size warning limit** to 600KB

#### 2. Lazy Loading Strategy
- **Contact Section**: Lazy loaded DotScreenShader (Three.js) component
  - Saves ~300KB on initial page load
  - Loads only when user scrolls to contact section
- **Page Routes**: All routes except Home are lazy loaded
- **Section Components**: About, Skills, Projects, Blog, FAQ, Contact use intersection observer
- **Lottie Animations**: Dynamic imports for animation JSON files

#### 3. Image Optimization
- **Converted 7 images to WebP** format:
  - favicon.png: 54% smaller
  - logo.png: 79.1% smaller
  - og-image.png: 80.9% smaller
  - Blog images: 15-40% smaller
- **Total savings**: ~1.2MB across all images
- **Created optimization script**: `npm run optimize:images`

#### 4. Content Additions
- **Added llms.txt** - Machine-readable portfolio for AI crawlers
- Improves discoverability in AI search engines (ChatGPT, Perplexity, Claude)

### 📊 Expected Performance Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Desktop Performance | 99/100 | 99/100 | Maintained |
| Mobile Performance | 54/100 | 75-80/100 | +40% |
| Initial Bundle Size | ~1.2MB | ~600KB | -50% |
| Contact Page Load | 846KB | ~300KB | -65% |
| Image Payload | ~2.5MB | ~1.3MB | -48% |

### 🎯 Next Steps (Priority Order)

#### High Priority
1. **Test Mobile Performance**
   ```bash
   npm run build
   npm run preview
   # Test on actual mobile device or Chrome DevTools mobile emulation
   ```

2. **Monitor Core Web Vitals**
   - LCP (Largest Contentful Paint): Target <2.5s
   - FID (First Input Delay): Target <100ms
   - CLS (Cumulative Layout Shift): Target <0.1

3. **Add Resource Hints**
   - Preconnect to critical origins (already done)
   - Consider dns-prefetch for non-critical origins

#### Medium Priority
4. **Implement Service Worker**
   - Cache static assets
   - Offline support for visited pages
   - Background sync for form submissions

5. **Optimize Fonts**
   - Use font-display: swap
   - Subset fonts to include only used characters
   - Consider variable fonts

6. **Add Image Lazy Loading**
   - Add loading="lazy" to below-fold images
   - Implement blur-up placeholders

#### Low Priority
7. **Consider CDN**
   - Cloudflare for edge caching
   - Reduces TTFB (Time to First Byte)
   - Enables security headers

8. **Implement Critical CSS**
   - Inline critical CSS in <head>
   - Defer non-critical styles

## Performance Testing Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Optimize images
npm run optimize:images

# Analyze bundle (if configured)
npm run analyze
```

## Lighthouse Testing

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse on production
lighthouse https://www.robinfrancis.in/ --view

# Mobile test
lighthouse https://www.robinfrancis.in/ --preset=mobile --view

# Desktop test
lighthouse https://www.robinfrancis.in/ --preset=desktop --view
```

## Bundle Analysis

To analyze bundle size:

```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  visualizer({ open: true, gzipSize: true })
]

# Build and view
npm run build
```

## Performance Monitoring

### Real User Monitoring (RUM)
Consider adding:
- Google Analytics 4 (already implemented)
- Microsoft Clarity for heatmaps
- Sentry for error tracking

### Synthetic Monitoring
- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/
- GTmetrix: https://gtmetrix.com/

## Best Practices Checklist

- [x] Minimize JavaScript bundle size
- [x] Lazy load non-critical components
- [x] Optimize images (WebP format)
- [x] Enable compression (Gzip/Brotli via hosting)
- [x] Implement code splitting
- [x] Use modern image formats
- [x] Preload critical resources
- [x] Defer non-critical JavaScript
- [ ] Implement service worker
- [ ] Add resource hints (dns-prefetch)
- [ ] Optimize web fonts
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Implement CDN
- [ ] Add security headers via Cloudflare

## Troubleshooting

### Large Bundle Size
1. Check `docs/assets/` folder after build
2. Identify large chunks
3. Consider dynamic imports for heavy libraries
4. Remove unused dependencies

### Slow Mobile Performance
1. Test on real device (not just emulator)
2. Check network throttling (3G/4G)
3. Reduce JavaScript execution time
4. Optimize images further
5. Remove unnecessary animations on mobile

### High LCP
1. Optimize hero image
2. Reduce render-blocking resources
3. Improve server response time
4. Use CDN for static assets

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [React Performance](https://react.dev/learn/render-and-commit)

---

Last Updated: March 19, 2026
