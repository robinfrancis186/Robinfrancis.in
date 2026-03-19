# Robin Francis - Portfolio

A modern, high-performance portfolio website showcasing projects, achievements, and skills. Built with React, TypeScript, Vite, and Tailwind CSS.

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-99%2F100-success)](https://www.robinfrancis.in/)
[![Mobile Performance](https://img.shields.io/badge/Mobile-75%2B-success)](https://www.robinfrancis.in/)
[![SEO](https://img.shields.io/badge/SEO-100%2F100-success)](https://www.robinfrancis.in/)
[![Accessibility](https://img.shields.io/badge/A11y-100%2F100-success)](https://www.robinfrancis.in/)

🌐 **Live Site**: [www.robinfrancis.in](https://www.robinfrancis.in/)

---

## ✨ Features

### 💻 Technical Features
- ⚡ **Lightning Fast**: Optimized for 99/100 desktop, 75+ mobile Lighthouse scores
- 🎨 **Modern UI**: Glassmorphism, 3D effects, smooth animations
- 🌓 **Dark/Light Theme**: Seamless theme switching with system preference detection
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG AA compliant, keyboard navigation, screen reader support
- 🔍 **SEO Optimized**: Comprehensive meta tags, Schema.org markup, sitemap
- 🤖 **AI-Ready**: llms.txt for AI search engines (ChatGPT, Perplexity, Claude)
- 📦 **Code Splitting**: Lazy loading for optimal performance
- 🖼️ **Image Optimization**: WebP format with automatic conversion
- 🎯 **Progressive Loading**: Intersection observer for below-fold content

### 🎯 Content Sections
- **Hero**: Eye-catching introduction with animated background
- **About**: Interactive portrait, education timeline, achievements
- **Skills**: Technology stack with categorized display
- **Projects**: Featured projects with 3D carousel and detailed cards
- **Blog**: 3D carousel with Sanity CMS integration
- **Gallery**: Masonry layout with Sanity CDN images
- **Contact**: Interactive form with Three.js shader background
- **FAQ**: Expandable questions with Schema.org markup

### 🚀 Performance Optimizations
- Disabled source maps in production
- Manual code splitting for heavy libraries (Three.js, Lottie, Sanity)
- Lazy loaded Three.js shader (saves 300KB on initial load)
- WebP image format (48% smaller than PNG/JPEG)
- Intersection observer for progressive loading
- Optimized bundle sizes (main: 600KB, chunks: <350KB)

---

## 🛠️ Technologies Used

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### UI & Animations
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **Lottie React** - Lottie animations
- **GSAP** - Animation platform
- **Lucide React** - Icon library

### CMS & Data
- **Sanity** - Headless CMS for blog and gallery
- **@sanity/client** - Sanity API client
- **@sanity/image-url** - Image URL builder

### Routing & SEO
- **React Router DOM** - Client-side routing
- **React Helmet Async** - Dynamic meta tags
- **Next Themes** - Theme management

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Sharp** - Image optimization

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/robinfrancis186/robinfrancis186.github.io.git
cd robinfrancis186.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Available Scripts
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Lint code
npm run optimize:images  # Convert images to WebP
npm run audit:performance # Analyze bundle sizes
```

---

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)
The site automatically deploys to GitHub Pages when you push to the `main` branch.

```bash
git add .
git commit -m "feat: your changes"
git push origin main
```

### Manual Deployment
```bash
# Build production version
npm run build

# The build output is in the docs/ folder
# Commit and push to deploy
git add docs/
git commit -m "build: production build"
git push origin main
```

---

## 📊 Performance Metrics

### Current Scores (March 2026)
| Metric | Desktop | Mobile |
|--------|---------|--------|
| Performance | 99/100 | 75+/100 |
| SEO | 100/100 | 100/100 |
| Accessibility | 100/100 | 100/100 |
| Best Practices | 100/100 | 100/100 |

### Bundle Sizes
- Initial Bundle: ~600KB (down from 1.2MB)
- Contact Chunk: ~300KB (down from 846KB)
- Page Chunks: <150KB each

### Core Web Vitals
- LCP (Largest Contentful Paint): <2.5s ✅
- FID (First Input Delay): <100ms ✅
- CLS (Cumulative Layout Shift): <0.1 ✅

---

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',
      // ... other colors
    }
  }
}
```

### Content
- **Personal Info**: Update `src/components/sections/Hero.tsx`
- **About Section**: Edit `src/components/sections/About.tsx`
- **Projects**: Modify `src/components/sections/Projects.tsx`
- **Skills**: Update `src/components/sections/Skills.tsx`

### Images
- Place images in `public/images/`
- Run `npm run optimize:images` to convert to WebP
- Update image paths in components

---

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get started quickly
- [Implementation Checklist](IMPLEMENTATION_CHECKLIST.md) - Complete task list
- [Performance Optimization](PERFORMANCE_OPTIMIZATION.md) - Technical deep dive
- [Optimization Summary](OPTIMIZATION_SUMMARY.md) - What was changed
- [Pre-Deployment Checklist](PRE_DEPLOYMENT_CHECKLIST.md) - Before deploying
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [SEO & Security Plan](SEO_AEO_SECURITY_PLAN.md) - SEO strategy

---

## 🔧 Configuration

### Sanity CMS Setup
1. Navigate to `portfolio-cms/`
2. Install dependencies: `npm install`
3. Configure `sanity.config.ts` with your project ID
4. Deploy: `npm run build`

### Google Analytics
Update the GTM ID in `docs/index.html`:
```html
<script>
  // ... GTM code
  'GTM-KGFM5K9N' // Replace with your GTM ID
</script>
```

### EmailJS (Contact Form)
The contact form currently uses `mailto:`. To use EmailJS:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your service ID, template ID, and public key
3. Update `src/components/sections/Contact.tsx`

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
rm -rf docs
npm install
npm run build
```

### Images Not Loading
```bash
# Verify images exist
ls -la public/images/

# Re-optimize
npm run optimize:images
```

### Performance Issues
```bash
# Analyze bundle
npm run audit:performance

# Check for large dependencies
npm install -g bundlephobia
bundlephobia <package-name>
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 👤 Author

**Robin Francis**
- Website: [www.robinfrancis.in](https://www.robinfrancis.in/)
- GitHub: [@robinfrancis186](https://github.com/robinfrancis186)
- LinkedIn: [Robin Francis](https://www.linkedin.com/in/robin-francis-b43565175)
- Email: robinfrancis186@gmail.com
- Twitter: [@robinfrancis186](https://twitter.com/robinfrancis186)

---

## 🙏 Acknowledgments

- IEEE Community for support and recognition
- Sahrdaya College of Engineering & Technology
- All mentors, collaborators, and supporters
- Open source community for amazing tools and libraries

---

## 📈 Future Updates

- [ ] Add more blog posts and case studies
- [ ] Implement comments system (Giscus)
- [ ] Add newsletter subscription
- [ ] Create downloadable resources
- [ ] Add more interactive elements
- [ ] Implement service worker for offline support
- [ ] Add push notifications for new content

---

**Last Updated**: March 19, 2026

**Status**: ✅ Production Ready | 🚀 Optimized | ♿ Accessible | 🔍 SEO Ready 