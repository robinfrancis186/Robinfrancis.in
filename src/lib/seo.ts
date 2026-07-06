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
  sameAs: [
    "https://github.com/robinfrancis186",
    "https://www.linkedin.com/in/robin-francis-b43565175",
    "https://www.instagram.com/robinfrancis186",
    "https://medium.com/@robinfrancis186",
    "https://stride.kerala.gov.in/",
    "https://github.com/robinfrancis186/argus.git",
    "https://github.com/robinfrancis186/bulkyfi",
    "https://bulkyfi.vercel.app/",
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
