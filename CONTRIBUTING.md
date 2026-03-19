# Contributing to Robin Francis Portfolio

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Setup
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

## 📁 Project Structure

```
.
├── src/
│   ├── components/      # React components
│   │   ├── sections/    # Page sections (Hero, About, etc.)
│   │   ├── ui/          # Reusable UI components
│   │   └── seo/         # SEO components
│   ├── pages/           # Route pages
│   ├── lib/             # Utilities and helpers
│   ├── assets/          # Static assets (Lottie, etc.)
│   └── App.tsx          # Main app component
├── public/              # Public static files
│   ├── images/          # Images
│   └── *.txt            # SEO files (robots, humans, llms)
├── scripts/             # Build and utility scripts
├── portfolio-cms/       # Sanity CMS configuration
└── docs/                # Build output (GitHub Pages)
```

## 🛠️ Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 3. Test Locally
```bash
# Run linter
npm run lint

# Build production
npm run build

# Preview production build
npm run preview

# Test on http://localhost:4173
```

### 4. Commit Changes
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve bug"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Code Style Guidelines

### TypeScript/React
- Use functional components with hooks
- Use TypeScript for type safety
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Destructure props and state

```typescript
// Good
const MyComponent = ({ title, description }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

// Avoid
function MyComponent(props) {
  let isOpen = false;
  
  return (
    <div className="container">
      <h1>{props.title}</h1>
    </div>
  );
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Use semantic class names for custom CSS
- Avoid inline styles unless necessary

```tsx
// Good
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  <h1 className="text-2xl md:text-4xl font-bold">Title</h1>
</div>

// Avoid
<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
  <h1 style={{ fontSize: '32px' }}>Title</h1>
</div>
```

### Performance
- Lazy load heavy components
- Use intersection observer for below-fold content
- Optimize images (WebP format)
- Code split large dependencies
- Avoid unnecessary re-renders

```typescript
// Good - Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Good - Intersection observer
const [isVisible, setIsVisible] = useState(false);
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.disconnect();
    }
  });
  observer.observe(ref.current);
}, []);
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test dark/light theme
- [ ] Test all interactive elements
- [ ] Check console for errors
- [ ] Verify accessibility (keyboard navigation)

### Performance Testing
```bash
# Run performance audit
npm run audit:performance

# Run Lighthouse
lighthouse http://localhost:4173 --view
```

## 🎨 Design Guidelines

### Colors
- Use theme colors from Tailwind config
- Maintain WCAG AA contrast ratios
- Support dark/light themes

### Typography
- Use system font stack for performance
- Maintain clear hierarchy (h1 > h2 > h3)
- Ensure readability (line height, spacing)

### Spacing
- Use consistent spacing scale (4px, 8px, 16px, 24px, 32px)
- Maintain visual rhythm
- Use whitespace effectively

### Accessibility
- All images must have alt text
- Maintain heading hierarchy
- Ensure keyboard navigation
- Use ARIA labels where needed
- Test with screen readers

## 📦 Adding Dependencies

Before adding a new dependency:
1. Check if it's really needed
2. Consider bundle size impact
3. Check for lighter alternatives
4. Verify it's actively maintained

```bash
# Check package size
npm install -g bundlephobia
bundlephobia <package-name>

# Add dependency
npm install <package-name>

# Add dev dependency
npm install -D <package-name>
```

## 🐛 Reporting Bugs

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Browser and device information
- Console errors (if any)

## 💡 Suggesting Features

When suggesting features:
- Explain the use case
- Describe the expected behavior
- Consider performance impact
- Provide mockups if applicable

## 📚 Resources

### Documentation
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Framer Motion](https://www.framer.com/motion/)

### Tools
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [WebPageTest](https://www.webpagetest.org/)
- [Can I Use](https://caniuse.com/)
- [Bundlephobia](https://bundlephobia.com/)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

If you have questions, feel free to:
- Open an issue on GitHub
- Email: robinfrancis186@gmail.com
- LinkedIn: [Robin Francis](https://www.linkedin.com/in/robin-francis-b43565175)

---

Thank you for contributing! 🎉
