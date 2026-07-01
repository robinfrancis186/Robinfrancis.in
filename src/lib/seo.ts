export const siteUrl = "https://robinfrancis.in";

export const siteName = "Robin Francis";

export const defaultSeoDescription =
  "Robin Francis builds accessible AI products, scalable web systems, and community programs for people-centric technology.";

export const defaultSeoImage = "/images/card/robin-francis-primary.jpg";

export const defaultSeoKeywords = [
  "Robin Francis",
  "AI innovator",
  "software engineer",
  "accessible technology",
  "AI engineering",
  "people-centric AI",
  "community leader",
  "Kerala developer",
  "assistive technology",
  "product builder",
  "GenAI solutions",
];

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Robin Francis",
  url: `${siteUrl}/`,
  image: `${siteUrl}${defaultSeoImage}`,
  jobTitle: "AI Innovator and Software Engineer",
  email: "mailto:robinfrancis186@gmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sahrdaya College of Engineering & Technology",
  },
  knowsAbout: [
    "Artificial intelligence",
    "Accessible technology",
    "Assistive technology",
    "Software engineering",
    "Community leadership",
    "Product strategy",
    "Generative AI",
  ],
  sameAs: [
    "https://github.com/robinfrancis186",
    "https://www.linkedin.com/in/robin-francis-b43565175",
    "https://www.instagram.com/robinfrancis186",
    "https://medium.com/@robinfrancis186",
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/images/favicon-r.png`,
  founder: {
    "@id": `${siteUrl}/#person`,
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: `${siteUrl}/`,
  description: defaultSeoDescription,
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
