export type ProjectGalleryImage = {
  src: string;
  alt: string;
};

export type ProjectPageData = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  accent: string;
  repo?: string;
  live?: string;
  highlights: string[];
  stack: string[];
  details: { heading: string; body: string }[];
  images?: ProjectGalleryImage[];
};

export const PROJECT_DETAILS: ProjectPageData[] = [
  {
    slug: "argus",
    title: "Argus",
    category: "AI QA • Browser Agent",
    summary:
      "Argus is a local-first autonomous QA agent that scouts a website, understands the product, deploys synthetic user personas, and returns evidence-backed bug reports with screenshots, logs, and run summaries.",
    image: "/images/projects/argus.webp",
    imageAlt: "Argus autonomous QA browser agent launch screen",
    accent: "lime",
    repo: "https://github.com/robinfrancis186/argus",
    highlights: [
      "Scouts real websites before running a test journey.",
      "Uses synthetic user personas to exercise different paths.",
      "Returns screenshots, logs, and evidence-backed findings.",
    ],
    stack: ["Browser automation", "AI agents", "Synthetic QA", "Evidence capture"],
    details: [
      {
        heading: "A QA agent that starts with context",
        body: "Argus treats a website as a product to understand, not just a collection of selectors. It explores the surface first, then uses that context to plan more useful journeys.",
      },
      {
        heading: "Findings you can act on",
        body: "Every run is designed to leave behind a trail of evidence. Screenshots, logs, and a compact run summary make it easier to reproduce a problem and decide what to fix next.",
      },
    ],
  },
  {
    slug: "bulkyfi",
    title: "BulkyFi",
    category: "Certificates • Local-First Tool",
    summary:
      "BulkyFi is a local-first bulk certificate generator for creating professional certificates from templates and recipient spreadsheets. It runs in the browser, stores projects locally, and exports high-quality PDF or PNG certificates without requiring a backend.",
    image: "/images/projects/bulkyfi-landing-v2.webp",
    imageAlt: "BulkyFi landing page for instant bulk certificate generation",
    accent: "blue",
    repo: "https://github.com/robinfrancis186/bulkyfi",
    live: "https://bulkyfi.vercel.app/",
    highlights: [
      "Turns a template and recipient spreadsheet into a batch of certificates.",
      "Keeps project data in the browser for a simple local-first workflow.",
      "Exports polished PDF or PNG certificates ready to share.",
    ],
    stack: ["React", "Browser storage", "Template rendering", "PDF and PNG export"],
    details: [
      {
        heading: "The repetitive work, removed",
        body: "BulkyFi is built for the moment after an event, workshop, or programme when a spreadsheet of names still needs to become a complete set of certificates. The workflow is deliberately direct: choose a template, bring in the recipients, review the result, and export.",
      },
      {
        heading: "Local by default",
        body: "The browser holds the working project, so a batch can be prepared without setting up a backend or sending a participant list to a remote service. That makes the tool practical for small teams and privacy-sensitive events.",
      },
    ],
    images: [
      {
        src: "/images/projects/bulkyfi-dashboard-v2.webp",
        alt: "BulkyFi certificate batch dashboard with template design and recipient preview",
      },
    ],
  },
  {
    slug: "soulsync",
    title: "SoulSync",
    category: "AI Companion • Cognitive Wellness",
    summary:
      "An AI companion for emotional and cognitive wellness, built for the silver economy. It combines emotion tracking, memory recall, and privacy-conscious caregiver support, with models tuned to run on-device so personal context never leaves the phone.",
    image: "/images/project-soulsync.webp",
    imageAlt: "SoulSync AI companion dashboard showing emotion tracking and memory recall",
    accent: "emerald",
    highlights: [
      "Connects emotion tracking with memory recall.",
      "Keeps caregiver support privacy-conscious and human-centred.",
      "Won second prize with Team Bits & Bytes at the IBM watsonx GenAI Challenge.",
    ],
    stack: ["Applied AI", "On-device models", "Cognitive wellness", "Caregiver support"],
    details: [
      {
        heading: "Designed around continuity",
        body: "SoulSync explores how an assistant can help people keep track of emotional moments and personal memories without turning care into a stream of disconnected notifications.",
      },
      {
        heading: "Privacy is part of the product",
        body: "The concept treats personal context as sensitive by design. On-device processing is part of the product direction, so useful support does not require every detail of a person's life to leave their phone.",
      },
    ],
  },
  {
    slug: "foodloop",
    title: "FoodLoop",
    category: "Sustainability • Machine Learning",
    summary:
      "A food redistribution platform that uses machine-learning surplus prediction to cut waste and route edible surplus to the people who need it, turning an operations problem into a forecasting one.",
    image: "/images/project-foodloop.webp",
    imageAlt: "FoodLoop food redistribution platform interface with surplus prediction charts",
    accent: "amber",
    highlights: [
      "Predicts surplus before it becomes waste.",
      "Connects food-service operations with redistribution workflows.",
      "Frames sustainability as a coordination and forecasting problem.",
    ],
    stack: ["Machine learning", "Forecasting", "Food systems", "Impact design"],
    details: [
      {
        heading: "From waste to signal",
        body: "FoodLoop starts with a practical question: can a team know about likely surplus early enough to do something useful with it? Prediction creates that window, turning a last-minute disposal problem into a coordinated handoff.",
      },
      {
        heading: "Technology in service of logistics",
        body: "The interesting work is not only the model. It is the workflow around the model, where kitchens, coordinators, and community partners can act on a clearer picture of what is available and when.",
      },
    ],
  },
  {
    slug: "techx-infinia",
    title: "TechX Infinia",
    category: "Flagship Event • Leadership",
    summary:
      "An emerging-technology festival founded and led for more than 450 participants, spanning talks, an expo, and school outreach. Built the programme, the partner roster, and the volunteer structure that ran it.",
    image: "/images/project-techx.webp",
    imageAlt: "TechX Infinia audience holding up lit phone torches during the flagship event",
    accent: "violet",
    highlights: [
      "Designed a multi-part programme around emerging technology.",
      "Coordinated talks, an expo, school outreach, and volunteers.",
      "Built a shared experience for more than 450 participants.",
    ],
    stack: ["Programme design", "Community building", "Partnerships", "Event operations"],
    details: [
      {
        heading: "A programme, not just a stage",
        body: "TechX Infinia brought talks, demonstrations, an expo, and school outreach into one programme. The work was as much about the connective tissue as the sessions themselves: a clear flow, the right partners, and volunteers who could carry the experience.",
      },
      {
        heading: "Making technology feel close",
        body: "The event was designed to make emerging technology approachable. People could listen, see, ask questions, and move between a stage conversation and a hands-on exhibit without feeling that the subject belonged only to experts.",
      },
    ],
    images: [
      {
        src: "/images/gallery/gallery-techx-infinia-audience.webp",
        alt: "TechX Infinia audience holding up lit phone torches during the flagship event",
      },
      {
        src: "/images/gallery/gallery-techx-infinia-opening-panel.webp",
        alt: "TechX Infinia opening panel on the main stage",
      },
      {
        src: "/images/gallery/gallery-techx-infinia-drone-expo.webp",
        alt: "TechX Infinia drone exhibition display",
      },
      {
        src: "/images/gallery/gallery-techx-infinia-stage-appreciation.webp",
        alt: "TechX Infinia stage appreciation moment",
      },
      {
        src: "/images/gallery/gallery-techx-infinia-letters.webp",
        alt: "TechX Infinia event lettering installation",
      },
    ],
  },
  {
    slug: "stride",
    title: "STRIDE Website",
    category: "Accessibility • Social Impact",
    summary:
      "Developed the official STRIDE website from scratch, creating a modern and accessible platform for an inclusive innovation initiative focused on assistive technology and social impact.",
    image: "/images/projects/stride-website.webp",
    imageAlt: "Official STRIDE Kerala website hero page",
    accent: "fuchsia",
    live: "https://stride.kerala.gov.in/",
    highlights: [
      "Explains STRIDE's mission and inclusive innovation ecosystem.",
      "Gives assistive-technology products and community stories a clear home.",
      "Creates accessible paths to news, engagement, and participation.",
    ],
    stack: ["Accessible web design", "Content architecture", "Public-interest technology", "Next.js"],
    details: [
      {
        heading: "A public-facing home for inclusion",
        body: "STRIDE brings assistive technology, social impact, products, people, and opportunities together. The website turns that breadth into a structure that helps a first-time visitor understand what the initiative is and where they can take part.",
      },
      {
        heading: "Clarity is an accessibility feature",
        body: "The build focuses on readable content, clear pathways, and a visual system that supports the story instead of competing with it. A public-interest platform should make the next useful action easy to find.",
      },
    ],
    images: [
      {
        src: "/images/gallery/gallery-stride-inclusive-innovation-summit-2025.webp",
        alt: "STRIDE inclusive innovation summit in Kerala",
      },
    ],
  },
  {
    slug: "ieee-sight-kerala",
    title: "IEEE SIGHT Kerala",
    category: "Humanitarian Technology • Public Interest",
    summary:
      "A public-interest website for IEEE Kerala Section SIGHT, bringing its 2026 leadership directory, mission, community projects, events, funding opportunities, and contact pathways into one accessible home.",
    image: "/images/projects/ieee-sight-website.webp",
    imageAlt: "IEEE SIGHT Kerala website homepage with the Engineering for the everyday headline",
    accent: "sky",
    live: "https://sight.ieeekerala.org/",
    highlights: [
      "Presents the 2026 leadership directory and mission clearly.",
      "Connects projects, events, funding opportunities, and contact pathways.",
      "Uses a public-interest structure that helps communities find a way in.",
    ],
    stack: ["Information architecture", "Public-interest web", "Accessible content", "Community platform"],
    details: [
      {
        heading: "One accessible home for the section",
        body: "The site gathers the information people need to understand IEEE Kerala Section SIGHT and participate in its work. Leadership, mission, projects, events, funding, and contact details are treated as connected parts of one public-facing experience.",
      },
      {
        heading: "Technology with a public purpose",
        body: "SIGHT exists around humanitarian technology and community impact. The website keeps that purpose visible while making the practical details easier for volunteers, partners, and people looking for support to find.",
      },
    ],
  },
  {
    slug: "ieee-global-career-fair",
    title: "IEEE Global Career Fair",
    category: "Global Programme • Operations & Platform Lead • 2026",
    summary:
      "Led the Operations and Platform team, and recruiter outreach for South India, for the IEEE Global Career Fair 2026: a 27-hour, follow-the-sun virtual event that drew 11,020 candidates from 131 countries, 700+ jobs across 163 hiring locations, and 8,169 applications.",
    image: "/images/projects/ieee-global-career-fair-results.webp",
    imageAlt:
      "IEEE Global Career Fair 2026 results: 163 hiring locations, 40 sectors, 700+ jobs, 43 recruiter countries, 11,020 candidates from 131 countries, and 8,169 applications",
    accent: "sky",
    live: "https://careerfair.ieee.org/global",
    highlights: [
      "Operations and Platform Team Lead for a 27-hour, follow-the-sun virtual career fair.",
      "Recruiter Outreach Team Lead for South India.",
      "11,020 candidates from 131 countries submitted 8,169 applications.",
      "Recruiters offered 700+ jobs across 163 hiring locations, 43 countries, and 40 sectors.",
      "20+ sessions and 80+ speakers ran alongside the virtual exhibit hall.",
    ],
    stack: ["Operations leadership", "Virtual event platform", "Recruiter outreach", "Global volunteer coordination"],
    details: [
      {
        heading: "One fair, five regions, 27 hours",
        body: "The IEEE Global Career Fair 2026, run under IEEE Technical Activities and its Industry Engagement Committee, followed the sun: it opened with Asia and Oceania, moved through India, then Europe, the Middle East and Africa, and closed with Latin America and the USA and Canada. Each region ran its own working day, so the event stayed open for 27 hours end to end.",
      },
      {
        heading: "My role: operations, platform, and South India outreach",
        body: "I led the Operations and Platform team, which kept the virtual venue running as each region handed over to the next, so that booths, sessions, and candidate journeys worked for whoever was online at that hour. I also led recruiter outreach for South India, bringing employers from the region into the fair.",
      },
      {
        heading: "What the numbers describe",
        body: "On the recruiter side the fair covered 163 hiring locations in 43 countries, across 40 sectors, with more than 700 jobs on offer. On the candidate side, 11,020 people from 131 countries took part and submitted 8,169 applications. Just over half of them, 52 percent, had less than a year of experience, which makes the fair a first door into industry for many of them.",
      },
    ],
    images: [
      {
        src: "/images/projects/ieee-global-career-fair-follow-the-sun.webp",
        alt: "IEEE Global Career Fair 27-hour follow-the-sun schedule across Asia and Oceania, India, EMEA, Latin America, and USA and Canada",
      },
      {
        src: "/images/projects/ieee-global-career-fair-hiring-locations.webp",
        alt: "World map of the IEEE Global Career Fair's 163 hiring locations across 43 countries",
      },
      {
        src: "/images/projects/ieee-global-career-fair-event-highlights.webp",
        alt: "Highlights from the IEEE Global Career Fair: live sessions, speakers, and the virtual exhibit hall",
      },
      {
        src: "/images/projects/ieee-global-career-fair-asia-pacific-recruiters.webp",
        alt: "Featured Asia Pacific recruiters at the IEEE Global Career Fair",
      },
    ],
  },
  {
    slug: "ieee-r10-career-fair",
    title: "IEEE R10 Career Fair",
    category: "Global Community • Programme Design • 2025",
    summary:
      "Co-led IEEE Region 10's first international Virtual Career Fair in 2025, connecting 245 registrants with 31 global recruiters across 2,578 booth visits and 310 applications.",
    image: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-participation-outcomes.webp",
    imageAlt: "IEEE Region 10 Virtual Career Fair 2025 outcomes: 245 registrations, 31 recruiters, 2,578 booth visits, 310 applications",
    accent: "sky",
    live: "https://robinfrancis.in/blog/ieee-region-10-international-virtual-career-fair-2025/",
    highlights: [
      "Connected 245 registrants with 31 global recruiters.",
      "Produced 2,578 virtual booth visits and 310 applications.",
      "Made an international career programme possible in a virtual format.",
    ],
    stack: ["Programme design", "Virtual events", "Recruiter coordination", "Community operations"],
    details: [
      {
        heading: "A global opportunity, made practical",
        body: "The career fair brought candidates and recruiters together across IEEE Region 10. The goal was not simply to host another online event, but to build a navigable environment where people could discover organisations, ask questions, and take a concrete next step.",
      },
      {
        heading: "What the numbers represent",
        body: "Registrations, booth visits, and applications show the scale of the programme, but they also describe a series of small moments: a candidate finding the right recruiter, a conversation starting, and an opportunity becoming visible.",
      },
    ],
    images: [
      {
        src: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-banner.webp",
        alt: "IEEE Region 10 Virtual Career Fair 2025 banner",
      },
      {
        src: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-recruiters.webp",
        alt: "IEEE Region 10 Virtual Career Fair 2025 recruiter participation",
      },
      {
        src: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-virtual-exhibit-hall.webp",
        alt: "IEEE Region 10 Virtual Career Fair 2025 virtual exhibit hall",
      },
    ],
  },
  {
    slug: "readit",
    title: "Readit",
    category: "Local-First Library • Reading Tools",
    summary:
      "A private, local-first library and reader for books, periodicals, and PDFs, with searchable reading notes and bundled Malayalam and English dictionaries.",
    image: "/images/projects/readit.webp",
    imageAlt: "Readit personal library project page for books, periodicals, PDFs, and dictionary tools",
    accent: "amber",
    repo: "https://github.com/robinfrancis186/readit",
    live: "https://readit-opal.vercel.app/",
    highlights: [
      "Imports and classifies EPUBs, PDFs, magazines, and newspapers.",
      "Keeps reading notes and looked-up words in searchable notebooks.",
      "Bundles Malayalam and English dictionaries for offline lookup.",
    ],
    stack: ["React", "Vite", "SQLite", "Progressive web app", "Malayalam and English dictionaries"],
    details: [
      {
        heading: "A library that belongs to the reader",
        body: "Readit is designed for people who want one searchable place for books, periodicals, and PDFs. The library, notebooks, and dictionaries stay together in a local-first workflow that can run on a personal computer or a private host.",
      },
      {
        heading: "Reading, lookup, and notes in one loop",
        body: "A word can lead to a dictionary lookup, a passage can become a note, and both can be found again later. The product treats those actions as part of reading rather than separate tools that make the reader leave the page.",
      },
      {
        heading: "Built for Malayalam and English",
        body: "The bundled dictionaries make lookup useful without an external connection. Malayalam inflections are normalised toward their headword, while English definitions and examples remain available alongside the Malayalam results.",
      },
    ],
  },
  {
    slug: "crown-of-bharat",
    title: "Crown of Bharat",
    category: "Indian Strategy Game • 3D Web Game",
    summary:
      "An Indian-inspired 3D strategy game where players build a kingdom, upgrade buildings, prepare troops and heroes, and play campaign, practice, or asynchronous online battles.",
    image: "/images/projects/crown-of-bharat.webp",
    imageAlt: "Crown of Bharat strategy game entry screen with a kingdom and Google sign-in panel",
    images: [
      {
        src: "/images/projects/crown-of-bharat-mobile.webp",
        alt: "Crown of Bharat mobile entry screen with the kingdom and Google sign-in panel",
      },
    ],
    accent: "emerald",
    repo: "https://github.com/robinfrancis186/crown-of-bharat",
    live: "https://crown-of-bharat.vercel.app/",
    highlights: [
      "Builds an Indian-inspired kingdom with upgradeable buildings.",
      "Supports campaign, practice, and asynchronous online battle modes.",
      "Uses landscape-first controls with drag to pan and pinch or scroll to zoom.",
    ],
    stack: ["Three.js", "Firebase Auth", "Firestore", "Supabase", "Landscape gameplay"],
    details: [
      {
        heading: "A strategy game with a sense of place",
        body: "Crown of Bharat turns kingdom building into an Indian-inspired 3D experience. Players grow a village, make upgrade decisions, prepare their forces, and shape a space that feels like their own.",
      },
      {
        heading: "Built for the landscape screen",
        body: "The game is designed around a wide view. Dragging pans across the kingdom, pinch or scroll changes the zoom, and selecting a building opens the actions that move the next decision forward.",
      },
      {
        heading: "A connected progression loop",
        body: "Google sign-in and Firestore-backed account storage support per-player kingdom saves. Campaign and practice play provide a solo path, while asynchronous battle features add a way to compete without requiring a synchronous multiplayer session.",
      },
    ],
  },
  {
    slug: "floodrise",
    title: "floodRISE",
    category: "Flood Intelligence • Emergency Decision Support",
    summary:
      "A human-verified flood-intelligence and emergency decision-support MVP, demonstrated through a deterministic Chennai replay. Its hosted preview is labeled demo data and is not a live emergency service.",
    image: "/images/projects/floodrise-preview.webp",
    imageAlt: "floodRISE operations map showing a clearly labeled Chennai demo replay, not live flood data",
    accent: "sky",
    repo: "https://github.com/robinfrancis186/floodRISE",
    live: "https://floodrise.vercel.app/",
    highlights: [
      "Demonstrates a deterministic Chennai flood replay with visible demo labeling.",
      "Brings community reports, impact estimates, shelters, and evacuation routing into an operations view.",
      "Keeps human review and audit workflows central to emergency decision support.",
    ],
    stack: ["React", "FastAPI", "MapLibre", "OpenStreetMap", "Deterministic replay"],
    details: [
      {
        heading: "Flood intelligence with human review",
        body: "floodRISE brings reported conditions, impact estimates, shelters, and lower-risk routes into an operations view. The project explores how those signals can support decisions while keeping verification and human approval visible.",
      },
      {
        heading: "A replay, not a live alert system",
        body: "The hosted experience is a deterministic Chennai scenario marked DEMO DATA and NOT LIVE. It is a demonstration of the workflow and must not be used to make real emergency or evacuation decisions.",
      },
    ],
    images: [
      {
        src: "/images/projects/floodrise-field.webp",
        alt: "floodRISE field view showing Chennai flood conditions and community reports",
      },
      {
        src: "/images/projects/floodrise-route.webp",
        alt: "floodRISE field route view showing demo map conditions and route guidance status",
      },
    ],
  },
  {
    slug: "rofin-ui",
    title: "Rofin UI",
    category: "Open Source • Vanilla Web UI",
    summary:
      "A modular, framework-independent UI library built with HTML, CSS, and vanilla JavaScript. Its live gallery documents reusable components, optional effects, and ready-to-use sections without runtime dependencies.",
    image: "/images/projects/rofin-ui-preview.webp",
    imageAlt: "Rofin UI documentation page introducing its lightweight component library",
    accent: "violet",
    repo: "https://github.com/robinfrancis186/rofin-ui",
    live: "https://rofin-ui.vercel.app/",
    highlights: [
      "Uses native HTML, CSS, and vanilla JavaScript with no runtime dependencies.",
      "Keeps components framework-independent and individually usable.",
      "Pairs the library with a live gallery of components, effects, and page sections.",
    ],
    stack: ["HTML", "CSS", "Vanilla JavaScript", "Accessibility", "Reduced-motion support"],
    details: [
      {
        heading: "A UI library without framework lock-in",
        body: "Rofin UI is a collection of reusable interface patterns built on browser-native technologies. The aim is to make polished interactions available without asking a project to adopt a framework or add runtime dependencies.",
      },
      {
        heading: "Browse, copy, and adapt",
        body: "The documentation site provides a visual gallery of components, optional effects, and complete sections. Teams can inspect an example and adapt the parts that fit their own product.",
      },
      {
        heading: "An evolving open-source project",
        body: "Rofin UI is an early-stage library, so its APIs and styles may continue to evolve. The repository is the source of truth for its current implementation and usage guidance.",
      },
    ],
    images: [
      {
        src: "/images/projects/rofin-ui-catalog.webp",
        alt: "Rofin UI catalog showing its reusable component gallery",
      },
      {
        src: "/images/projects/rofin-ui-landing-example.webp",
        alt: "Rofin UI full-page landing example built from the component library",
      },
    ],
  },
];

export function findProjectDetail(slug: string) {
  return PROJECT_DETAILS.find((project) => project.slug === slug);
}
