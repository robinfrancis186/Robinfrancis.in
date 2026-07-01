# Social Links And Icons

Current social/profile links are used across the portfolio, profile card, structured data, and contact areas.

## Primary Links

- GitHub: `https://github.com/robinfrancis186`
- LinkedIn: `https://www.linkedin.com/in/robin-francis-b43565175`
- Instagram: `https://www.instagram.com/robinfrancis186`
- Medium: `https://medium.com/@robinfrancis186`
- Email: `robinfrancis186@gmail.com`

## Where Links Are Maintained

- `src/components/sections/Hero.tsx`
- `src/components/sections/Contact.tsx`
- `src/views/CardPage.tsx`
- `src/app/page.tsx` for home `sameAs` structured data
- `src/app/card/page.tsx` for profile-card structured data

## Icon Assets

Animated icon JSON/SVG assets live in:

```text
micro animation icons/
src/assets/lottie/
```

Prefer existing icon assets or lucide icons before adding a new icon package.

## Contact Form

The contact form should use the Resend-backed API route:

```text
src/app/api/contact/route.ts
```

Do not replace it with a plain `mailto:` link unless intentionally simplifying the form.

Last updated: July 1, 2026
