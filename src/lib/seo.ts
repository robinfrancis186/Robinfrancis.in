export const siteUrl = "https://robinfrancis.in";

export const siteName = "Robin Francis";

export const xHandle = "@robinfrancis186";

/*
 * Shared social defaults.
 *
 * Next replaces a parent `openGraph` / `twitter` object when a page declares
 * its own rather than deep-merging them, so anything set only in the root
 * layout silently disappears from every page that overrides it. Spreading
 * these into each page's block is what keeps og:type, og:site_name, og:locale
 * and the X attribution on the rendered pages.
 */
export const ogDefaults = {
  type: "website",
  siteName,
  locale: "en_US",
} as const;

/**
 * Canonical profile URLs for schema.org sameAs.
 *
 * One list, imported everywhere a sameAs is emitted; it previously lived in
 * both this file and the card page and had already drifted. YouTube is listed
 * by handle and by channel ID: handles can be changed, the UC id cannot, and
 * the Knowledge Graph commonly keys on the channel form.
 */
export const socialProfiles = [
  "https://github.com/robinfrancis186",
  "https://www.linkedin.com/in/robin-francis-b43565175",
  "https://www.instagram.com/robinfrancis186",
  "https://x.com/robinfrancis186",
  "https://www.youtube.com/@robinfrancis186",
  "https://www.youtube.com/channel/UCNiT4BYZc8RVxwhSdexgxFQ",
  "https://medium.com/@robinfrancis186",
  "https://www.wikidata.org/wiki/Q141142455",
] as const;

export const twitterDefaults = {
  card: "summary_large_image",
  site: xHandle,
  creator: xHandle,
} as const;

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
    "Autonomous QA",
    "Local-first web applications",
    "Inclusive innovation",
  ],
  award: [
    "IEEE Region 10 Outstanding Volunteer Award 2024",
    "IBM watsonx GenAI Challenge second prize",
    "IEEE Kerala Section Outstanding Humanitarian Volunteer Award",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "AI Product Builder and Software Engineer",
    skills: [
      "AI product development",
      "Accessible web development",
      "Community leadership",
      "Full-stack software engineering",
      "Generative AI prototyping",
    ],
  },
  subjectOf: [
    {
      "@type": "NewsArticle",
      name: "Amal Jyothi College aces hackathon at GenAI conclave",
      url: "https://www.theweek.in/education/latest/2024/07/13/amal-jyothi-college-aces-hackathon-at-genai-conclave.html",
      publisher: {
        "@type": "Organization",
        name: "The Week",
      },
    },
    {
      "@type": "VideoObject",
      name: "Sahrdaya Team grabs 2nd in IBM WatsonX Challenge conducted for students",
      url: "https://www.youtube.com/watch?v=B0OYd-Bit2Y",
    },
    {
      "@type": "WebPage",
      name: "Past recipients of IEEE Region 10 Awards",
      url: "https://www.ieeer10.org/past-recipients-of-ieee-region-10-awards/",
    },
    {
      "@type": "Report",
      name: "2026 IEEE Kerala Section Region 10 Report",
      url: "https://www.ieeer10.org/wp-content/uploads/2026/02/2026-IEEE-Kerala-Section-Region-10-Report-Nandan-S.pdf",
    },
    {
      "@type": "Article",
      name: "Hubs & Nodes Initiative: Faculty Development Programme on Activity-Based Pedagogy in Kochi, India",
      url: "https://iten.ieee-ies.org/featured-news/2026/hubs-nodes-initiative-faculty-development-programme-on-activity-based-pedagogy-in-kochi-india/",
    },
    {
      "@type": "WebPage",
      name: "K-DISC Social Enterprises and Inclusion",
      url: "https://kdisc.kerala.gov.in/en/social-enterprises-and-inclusion/",
    },
  ],
  sameAs: [...socialProfiles],
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
