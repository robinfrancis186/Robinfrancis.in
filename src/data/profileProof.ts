export type ProofLink = {
  title: string;
  label: string;
  href: string;
  description: string;
  category: "award" | "press" | "project" | "product" | "speaking" | "publication";
};

export type Award = {
  title: string;
  issuer: string;
  year: string;
  summary: string;
  image: string;
  imageAlt: string;
  proofTitles: string[];
};

export type SpeakingItem = {
  title: string;
  context: string;
  audience: string;
  summary: string;
  proofTitles: string[];
};

export const proofLinks: ProofLink[] = [
  {
    title: "The Week coverage of Team Bits & Bytes at the IBM watsonx GenAI Challenge",
    label: "The Week",
    href: "https://www.theweek.in/education/latest/2024/07/13/amal-jyothi-college-aces-hackathon-at-genai-conclave.html",
    description:
      "The Week reports that Team Bits & Bytes from Sahrdaya College won second prize at the IBM student hackathon, listing Robin Francis as a team member and describing the team's SoulSync app for the silver economy.",
    category: "press",
  },
  {
    title: "IBM watsonx Challenge video coverage",
    label: "YouTube",
    href: "https://www.youtube.com/watch?v=B0OYd-Bit2Y",
    description:
      "Video coverage titled Sahrdaya Team grabs 2nd in IBM WatsonX Challenge conducted for students.",
    category: "press",
  },
  {
    title: "K-DISC Social Enterprises and Inclusion listing",
    label: "K-DISC",
    href: "https://kdisc.kerala.gov.in/en/social-enterprises-and-inclusion/",
    description:
      "K-DISC describes its Social Enterprises and Inclusion division as work for social change and marginalized communities, and lists Robin Francis as Junior Programme Executive.",
    category: "project",
  },
  {
    title: "STRIDE Kerala live website",
    label: "Live project",
    href: "https://stride.kerala.gov.in/",
    description:
      "Official STRIDE Kerala website for a K-DISC inclusive innovation and assistive technology initiative with product catalog, ecosystem, community, media, and engagement sections.",
    category: "project",
  },
  {
    title: "Robin Francis first-person account of the NCC Thal Sainik Camp",
    label: "Journal",
    href: "https://robinfrancis.in/blog/ncc-thal-sainik-camp-national-bronze-medal-journey/",
    description:
      "Robin's own detailed account of the NCC selection camps, the Grouping and Snap Shooting practices, and the national bronze medal won with the Kerala contingent in Delhi.",
    category: "publication",
  },
  {
    title: "IEEE Spectrum coverage of the global Virtual Career Fairs",
    label: "IEEE Spectrum",
    href: "https://spectrum.ieee.org/ieee-global-virtual-career-fairs",
    description:
      "IEEE Spectrum reports on IEEE's global Virtual Career Fair initiative, describing how the virtual format reduces geographic barriers between technical talent and industry.",
    category: "press",
  },
  {
    title: "IEEE Career Fair official platform",
    label: "IEEE Career Fair",
    href: "https://careerfair.ieee.org/",
    description:
      "The official IEEE Career Fair platform presenting the regional virtual fairs as a OneIEEE collaboration between Young Professionals, the Industry Engagement Committee, and IEEE Students.",
    category: "speaking",
  },
  {
    title: "The Hindu BusinessLine coverage of Codex Nightline",
    label: "The Hindu BusinessLine",
    href: "https://www.thehindubusinessline.com/info-tech/kochi-to-host-codex-nightline-ai-build-sprint-in-moving-metro-system-on-july-18/article71192353.ece",
    description:
      "The Hindu BusinessLine reports that Kochi will host Codex Nightline, an AI build sprint held inside a moving metro system on 18 July.",
    category: "press",
  },
  {
    title: "Codex Nightline official event site",
    label: "Codex Nightline",
    href: "https://www.codexnightline.in/",
    description:
      "Official Codex Nightline site describing the after-hours Kochi Metro AI build sprint, its solo-build format, build tracks, and organising partners.",
    category: "speaking",
  },
  {
    title: "INSPIRA IEEE Sahrdaya SB Magazine 2024",
    label: "IEEE Sahrdaya",
    href: "https://cdnc.heyzine.com/files/uploaded/97d868213fc130fa21bf351552f7747c05e9778f.pdf",
    description:
      "Public 2024 magazine artifact for IEEE Sahrdaya Student Branch. The PDF is image-only, so it is cited as a publication/context source rather than a text-searchable award record.",
    category: "publication",
  },
  {
    title: "IEEE Region 10 Outstanding Volunteer Award recipients",
    label: "IEEE R10",
    href: "https://www.ieeer10.org/past-recipients-of-ieee-region-10-awards/",
    description:
      "IEEE Region 10's past recipients page lists Robin Francis, Kerala Section, under the 2024 Region 10 Outstanding Volunteer Award recipients.",
    category: "award",
  },
  {
    title: "IEEE Kerala Section Region 10 Report 2026",
    label: "IEEE Kerala",
    href: "https://www.ieeer10.org/wp-content/uploads/2026/02/2026-IEEE-Kerala-Section-Region-10-Report-Nandan-S.pdf",
    description:
      "The IEEE Kerala Section report lists Robin Francis, K-DISC, under the Outstanding Humanitarian Volunteer Award in its awards and recognition section.",
    category: "award",
  },
  {
    title: "IEEE IES Faculty Development Programme article",
    label: "IEEE IES",
    href: "https://iten.ieee-ies.org/featured-news/2026/hubs-nodes-initiative-faculty-development-programme-on-activity-based-pedagogy-in-kochi-india/",
    description:
      "IEEE IES ITeN coverage of the Kochi FDP names Robin Francis as a session contributor focused on innovation ecosystems, assistive technologies, and societal impact.",
    category: "speaking",
  },
  {
    title: "Argus GitHub repository",
    label: "GitHub",
    href: "https://github.com/robinfrancis186/argus.git",
    description:
      "Open repository for Argus, a local-first autonomous QA browser agent that scouts websites and returns evidence-backed bug reports.",
    category: "product",
  },
  {
    title: "BulkyFi live app",
    label: "Live product",
    href: "https://bulkyfi.vercel.app/",
    description:
      "Live local-first bulk certificate generator that runs in the browser and exports PDF or PNG certificates.",
    category: "product",
  },
  {
    title: "BulkyFi GitHub repository",
    label: "GitHub",
    href: "https://github.com/robinfrancis186/bulkyfi",
    description:
      "Open repository for BulkyFi, including the browser-based certificate generation workflow.",
    category: "product",
  },
];

export const awards: Award[] = [
  {
    title: "IEEE Region 10 Outstanding Volunteer Award",
    issuer: "IEEE Region 10",
    year: "2024",
    summary:
      "IEEE Region 10's public past recipients page lists Robin Francis from Kerala Section among the 2024 Region 10 Outstanding Volunteer Award recipients.",
    image: "/images/blog/blog2/1731994207232.webp",
    imageAlt:
      "IEEE Region 10 feature recognizing Robin Francis for 2024 volunteer leadership",
    proofTitles: ["IEEE Region 10 Outstanding Volunteer Award recipients"],
  },
  {
    title: "IBM watsonx GenAI Challenge second prize",
    issuer: "GenAI Conclave",
    year: "2024",
    summary:
      "The Week reports that Team Bits & Bytes from Sahrdaya College, including Robin Francis, won second prize with SoulSync, a digital companion app for seniors.",
    image: "/images/blog/1720937580394.webp",
    imageAlt:
      "Robin Francis and teammates receiving recognition on stage at a watsonx event",
    proofTitles: [
      "The Week coverage of Team Bits & Bytes at the IBM watsonx GenAI Challenge",
      "IBM watsonx Challenge video coverage",
    ],
  },
  {
    title: "Outstanding Humanitarian Volunteer Award",
    issuer: "IEEE Kerala Section",
    year: "2025",
    summary:
      "The IEEE Kerala Section Region 10 report lists Robin Francis, K-DISC, under Outstanding Humanitarian Volunteer Award in its awards section.",
    image: "/images/gallery/gallery-ieee-kerala-public-awards-2025.webp",
    imageAlt:
      "Robin Francis at the IEEE Kerala Section Public Awards Ceremony 2025",
    proofTitles: ["IEEE Kerala Section Region 10 Report 2026"],
  },
  {
    title: "NCC Thal Sainik Camp national bronze medal",
    issuer: "National Cadet Corps",
    year: "2017",
    summary:
      "Robin Francis represented Kerala as a Junior Division cadet in the firing events at the NCC Thal Sainik Camp national competition in Delhi, where the Kerala team placed third across the Grouping and Snap Shooting practices.",
    image: "/images/blog/ncc-thal-sainik-camp/ncc-kerala-contingent-trophies.webp",
    imageAlt:
      "The Kerala NCC contingent with their trophies and medals after the Thal Sainik Camp national competition",
    proofTitles: ["Robin Francis first-person account of the NCC Thal Sainik Camp"],
  },
];

export const speakingItems: SpeakingItem[] = [
  {
    title: "IEEE Sahrdaya Student Branch leadership sessions",
    context: "Community leadership and volunteer systems",
    audience: "Student volunteers, society leads, and campus teams",
    summary:
      "Sessions on building resilient student communities, converting events into leadership pipelines, and running volunteer teams with clear ownership.",
    proofTitles: ["INSPIRA IEEE Sahrdaya SB Magazine 2024"],
  },
  {
    title: "GenAI and applied product building",
    context: "IBM watsonx challenge and AI product prototyping",
    audience: "Students, builders, and hackathon teams",
    summary:
      "Talks and demos around turning GenAI ideas into practical products, using the SoulSync second-prize IBM watsonx challenge journey as a concrete case study.",
    proofTitles: [
      "The Week coverage of Team Bits & Bytes at the IBM watsonx GenAI Challenge",
      "IBM watsonx Challenge video coverage",
    ],
  },
  {
    title: "Innovation ecosystems and assistive technology",
    context: "IEEE IES Hubs & Nodes Faculty Development Programme",
    audience: "Faculty members, researchers, IEEE volunteers, industry professionals, and Young Professionals",
    summary:
      "IEEE IES coverage of the Kochi FDP names Robin Francis as a session contributor on innovation ecosystems, assistive technologies, and the societal impact of technology-driven solutions.",
    proofTitles: ["IEEE IES Faculty Development Programme article"],
  },
  {
    title: "Assistive technology and inclusive innovation",
    context: "STRIDE Kerala and social impact technology",
    audience: "Inclusive innovation ecosystem, product teams, and public-interest partners",
    summary:
      "Speaking and product storytelling around accessibility, social impact, assistive technology catalogs, and digital platforms for inclusive ecosystems.",
    proofTitles: [
      "K-DISC Social Enterprises and Inclusion listing",
      "STRIDE Kerala live website",
    ],
  },
];

export const mediaKit = {
  headshot: "/images/card/robin-francis-primary.jpg",
  headshotAlt: "Robin Francis portrait for press and speaking use",
  shortBio:
    "Robin Francis is an AI product builder, software engineer, and community leader from Kerala, India. He builds accessible, people-centric technology across AI, web platforms, and civic innovation. A B.Tech Computer Science graduate of Sahrdaya College of Engineering & Technology, Robin is listed by IEEE Region 10 as a 2024 Outstanding Volunteer Award recipient, co-built the second-prize SoulSync IBM watsonx challenge project, led IEEE Sahrdaya SB through major growth, and develops products including Argus, BulkyFi, and STRIDE Kerala's digital platform.",
  longBio:
    "Robin Francis is an AI product builder, software engineer, and community leader from Kerala, India. His work sits at the intersection of applied AI, accessibility, public-interest platforms, and student-community leadership. Robin has built and shipped products including Argus, a local-first autonomous QA browser agent; BulkyFi, a browser-based bulk certificate generator; and the official STRIDE Kerala website, a platform for inclusive innovation and assistive technology. He also works on AI concepts for emotional wellness, food sustainability, and people-centric product systems. As Chairperson of IEEE Sahrdaya Student Branch, Robin helped grow the branch from 110 to 534 members, supported 136+ programs, and built operating systems for volunteer leadership, mentorship, and high-impact events. Source-backed recognitions include IEEE Region 10 Outstanding Volunteer Award 2024, IBM watsonx GenAI Challenge second prize with Team Bits & Bytes for SoulSync, and an IEEE Kerala Section Outstanding Humanitarian Volunteer Award listing. He is available for product collaborations, AI and accessibility talks, community leadership sessions, and public-interest technology work.",
  contactEmail: "robinfrancis186@gmail.com",
  links: [
    {
      label: "Website",
      href: "https://robinfrancis.in/",
    },
    {
      label: "GitHub",
      href: "https://github.com/robinfrancis186",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/robin-francis-b43565175",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/robinfrancis186",
    },
    {
      label: "Medium",
      href: "https://medium.com/@robinfrancis186",
    },
  ],
};

export function findProofLinks(titles: string[]) {
  return titles
    .map((title) => proofLinks.find((proof) => proof.title === title))
    .filter((proof): proof is ProofLink => Boolean(proof));
}
