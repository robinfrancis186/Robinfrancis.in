import { EVENT_STORIES_2023 } from "./eventStories2023";
import { EVENT_STORIES_2024, type EventStory } from "./eventStories2024";
import { EVENT_STORIES_2024_LATE, INFINIA_SESSION_STORIES } from "./eventStories2024Late";
import { EVENT_MEDIA } from "./eventMedia";
import { COMMUNITY_EVENTS } from "./communityEvents";

export type MyEvent = {
  id: string;
  title: string;
  date?: string;
  endDate?: string;
  year: number;
  dateLabel?: string;
  unit: string;
  group: "Student Branch" | "Society chapter" | "TechX Infinia" | "Community events";
  role?: string;
  image?: { src: string; alt: string; kind: "photo" | "poster" | "document" };
  sessions?: MyEventSession[];
  story?: EventStory;
  gallery?: NonNullable<MyEvent["image"]>[];
};

export type MyEventSession = {
  id: string;
  title: string;
  date: string;
  image: NonNullable<MyEvent["image"]>;
  summary?: string;
  speakers?: string[];
};

const unitNames: Record<string, string> = {
  SB: "IEEE Sahrdaya Student Branch", "IEEE Sahrdaya SB": "IEEE Sahrdaya Student Branch",
  CS: "IEEE Computer Society", "CS Chapter": "IEEE Computer Society",
  "CS and Informatika": "IEEE Computer Society and Informatika", WIE: "IEEE Women in Engineering",
  PES: "IEEE Power & Energy Society", IAS: "IEEE Industry Applications Society",
  IES: "IEEE Industrial Electronics Society", "IES and IAS": "IEEE Industrial Electronics and Industry Applications Societies",
  CSS: "IEEE Control Systems Society", CASS: "IEEE Circuits and Systems Society",
  SPS: "IEEE Signal Processing Society", EMBS: "IEEE Engineering in Medicine and Biology Society",
  EduSoc: "IEEE Education Society", Photonics: "IEEE Photonics Society",
};

export const eventUnitName = (unit: string) => unitNames[unit] ?? unit;

export function eventSearchText(event: MyEvent) {
  return [event.title, event.unit, eventUnitName(event.unit), event.group, event.role, event.year, event.date,
    event.dateLabel, event.story?.summary, ...(event.story?.paragraphs ?? []),
    ...(event.story?.speakers ?? []), event.story?.venue,
    ...(event.sessions?.map((session) => `${session.title} ${session.summary ?? ""}`) ?? []),
  ].join(" ");
}

export function matchesEventSearch(event: MyEvent, query: string) {
  const text = eventSearchText(event).toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every((term) =>
    /^20\d{2}$/.test(term) ? event.year === Number(term) : text.includes(term),
  );
}

export function findMyEvent(id: string) {
  return MY_EVENTS.find((event) => event.id === id);
}

type EventTuple = readonly [string, string, string, string, MyEvent["group"], string?];

const events: readonly EventTuple[] = [
  ["soldering-practice-and-arduino-basics", "Soldering Practice and Arduino Basics", "2024-10-15", "CSS", "Society chapter"],
  ["ai-workshop-by-brainbrix", "AI Workshop by BrainBrix", "2024-10-15", "CS", "Society chapter"],
  ["resilient-adaptive-electrical-systems-net-zero", "Resilient and Adaptive Electrical Systems for Net-Zero Energy Buildings", "2024-10-09", "IES", "Society chapter"],
  ["augmented-reality-using-unity", "Augmented Reality Using Unity", "2024-10-08", "CS", "Society chapter"],
  ["web-development-using-angular", "Web Development Using Angular Workshop", "2024-10-08", "CS", "Society chapter"],
  ["techx-infinia", "TechX Infinia: Where Imagination Meets Technology", "2024-09-27", "IEEE Sahrdaya SB", "TechX Infinia", "/images/events/techx-infinia-opening-2024.webp"],
  ["design-on-electric-vehicle", "Design of Electric Vehicle Using MATLAB Simulink", "2024-09-25", "IAS", "Society chapter"],
  ["ias-membership-development", "Membership Development (IAS)", "2024-09-23", "IAS", "Society chapter"],
  ["orientation-session", "Orientation Session", "2024-09-03", "SB", "Student Branch"],
  ["skill-sharing-matlab", "Skill Sharing Session on MATLAB", "2024-08-31", "CSS", "Society chapter"],
  ["ai-and-its-future", "AI and Its Future: Talk Session", "2024-08-30", "CS", "Society chapter"],
  ["git-and-github-workshop", "Git and GitHub Workshop", "2024-08-27", "CS", "Society chapter"],
  ["latex-training", "LaTeX Training for BME Students", "2024-08-23", "CS", "Society chapter"],
  ["kickstart-ctf", "Kickstart CTF", "2024-08-10", "CS", "Society chapter"],
  ["ar-vr-bootcamp", "Five-Day AR/VR Bootcamp", "2024-08-05", "CS", "Society chapter"],
  ["genx-stellar", "GenX: Stellar", "2024-07-30", "WIE", "Society chapter"],
  ["genx-signal-savvy", "GenX: Signal Savvy", "2024-07-28", "SPS", "Society chapter"],
  ["genx-luma", "GenX: LUMA", "2024-07-26", "Photonics", "Society chapter"],
  ["genx-biomedley", "GenX: BioMedley", "2024-07-24", "EMBS", "Society chapter"],
  ["session-on-ar-vr", "Session on AR/VR", "2024-07-22", "CS", "Society chapter"],
  ["genx-eduquest", "GenX: EduQuest", "2024-07-22", "EduSoc", "Society chapter"],
  ["genx-bit-2-byte", "GenX: Bit-2-Byte", "2024-07-20", "CS", "Society chapter"],
  ["cybersecurity-in-iot", "Cybersecurity in IoT", "2024-07-21", "CS", "Society chapter"],
  ["codex-scientific-computing-python", "Codex: Scientific Computing Using Python", "2024-07-01", "CS", "Society chapter"],
  ["github-copilot", "GitHub Copilot", "2024-06-28", "SB", "Student Branch"],
  ["enhancer-resume", "Enhancer: Resume", "2024-06-26", "SB", "Student Branch"],
  ["infoshare", "InfoShare", "2024-06-25", "SB", "Student Branch"],
  ["echelon", "Echelon", "2024-06-22", "SB", "Student Branch"],
  ["wie-climate-innovation-pitch", "WIE Climate Innovation Pitch", "2024-06-19", "WIE", "Society chapter"],
  ["powerpack", "PowerPack", "2024-06-18", "IAS", "Society chapter"],
  ["prompt-pulse", "Prompt Pulse", "2024-05-10", "SB", "Student Branch"],
  ["sparkfix", "Sparkfix: Problem Solving Competition", "2024-04-24", "PES", "Society chapter"],
  ["watts-up", "Watts Up: Poster Design Competition", "2024-04-23", "PES", "Society chapter"],
  ["trailblazer", "Trailblazer", "2024-04-17", "EduSoc", "Society chapter"],
  ["innovate-ed", "InnovateEd", "2024-04-17", "EduSoc", "Society chapter"],
  ["eli5", "ELI5: Explain Like I'm 5", "2024-04-17", "EduSoc", "Society chapter"],
  ["edusphere", "EduSphere", "2024-04-17", "EduSoc", "Society chapter"],
  ["take-off", "Take Off", "2024-04-13", "IES and IAS", "Society chapter"],
  ["vtools-session", "Session on Usage of vTools", "2024-04-10", "SB", "Student Branch"],
  ["basics-game-development", "Basics of Game Development", "2024-04-04", "WIE", "Society chapter"],
  ["elementos", "Elementos", "2024-04-03", "CS", "Society chapter"],
  ["openai-business-impact-talk", "OpenAI: Business Impact and Job Opportunities", "2024-04-02", "CS", "Society chapter"],
  ["reel-it-up", "Reel It Up", "2024-04-01", "CSS", "Society chapter"],
  ["wie-triathlon", "WIE Triathlon", "2024-04-01", "WIE", "Society chapter"],
  ["optiq", "Optiq: Online Quiz", "2024-03-30", "Photonics", "Society chapter"],
  ["power-transformer-design-talk", "Power Transformer Design, Manufacturing and Testing", "2024-03-26", "CSS", "Society chapter"],
  ["python-machine-learning-internship", "Python and Machine Learning Internship", "2024-03-22", "SB", "Student Branch"],
  ["unleash-your-power", "Unleash Your Power", "2024-03-21", "SB", "Student Branch"],
  ["path-to-internationalization", "Path to Internationalization", "2024-03-21", "SB", "Student Branch"],
  ["efficient-linkedin-workshop", "Workshop on Efficient Usage of LinkedIn", "2024-03-10", "SB", "Student Branch"],
  ["robotics-process-automation", "Workshop on Robotic Process Automation", "2024-03-06", "CS", "Society chapter"],
  ["riseher", "RiseHER: Inspiring Spotlight", "2024-03-06", "WIE", "Society chapter"],
  ["biomed-insight", "BioMed Insight", "2024-03-05", "EMBS", "Society chapter"],
  ["annual-general-meeting", "Annual General Meeting", "2024-03-05", "SB", "Student Branch"],
  ["grand-100th-day-rtl-challenge", "GRAND: 100th Day of 100RTL Days Challenge", "2024-02-28", "CASS", "Society chapter"],
  ["pcb-workshop-kicad", "PCB Workshop Using KiCad", "2024-02-21", "CASS", "Society chapter"],
  ["quiz-b", "Quiz-B", "2024-02-15", "EMBS", "Society chapter"],
  ["machine-learning-workshop", "Machine Learning Workshop", "2024-02-13", "CS", "Society chapter"],
  ["deep-learning-workshop", "Deep Learning Workshop", "2024-02-13", "CS", "Society chapter"],
  ["ar-vr-workshop", "AR/VR Workshop", "2024-02-12", "CS", "Society chapter"],
  ["membership-drive", "Membership Drive 2024", "2024-02-06", "SB", "Student Branch", "/images/events/membership-drive-2024.webp"],
] as const;

const eventImageFiles: Record<string, string> = {
  "design-on-electric-vehicle": "p127-i02.jpg", "ias-membership-development": "p125-i02.jpg", "orientation-session": "p123-i04.jpg",
  "skill-sharing-matlab": "p121-i02.jpg", "ai-and-its-future": "p119-i03.jpg", "git-and-github-workshop": "p117-i03.jpg",
  "latex-training": "p115-i02.jpg", "kickstart-ctf": "p112-i02.jpg", "ar-vr-bootcamp": "p110-i03.jpg", "genx-stellar": "p108-i02.jpg",
  "genx-signal-savvy": "p106-i02.jpg", "genx-luma": "p104-i02.jpg", "genx-biomedley": "p102-i02.jpg", "session-on-ar-vr": "p100-i03.jpg",
  "genx-eduquest": "p098-i02.jpg", "genx-bit-2-byte": "p096-i02.jpg", "cybersecurity-in-iot": "p094-i02.jpg", "codex-scientific-computing-python": "p092-i02.jpg",
  "github-copilot": "p090-i03.jpg", "enhancer-resume": "p088-i03.jpg", "infoshare": "p086-i02.jpg", "grand-100th-day-rtl-challenge": "p020-i02.jpg",
  "prompt-pulse": "p077-i02.jpg", "sparkfix": "p075-i02.jpg", "watts-up": "p073-i02.jpg", "innovate-ed": "p069-i02.jpg", "eli5": "p067-i02.jpg",
  "edusphere": "p065-i02.jpg", "take-off": "p062-i02.jpg", "elementos": "p056-i02.jpg", "openai-business-impact-talk": "p052-i02.jpg",
  "reel-it-up": "p049-i02.jpg", "optiq": "p044-i02.jpg", "power-transformer-design-talk": "p042-i03.jpg", "python-machine-learning-internship": "p039-i02.jpg",
  "path-to-internationalization": "p035-i04.jpg", "robotics-process-automation": "p031-i03.jpg", "riseher": "p028-i05.jpg", "biomed-insight": "p025-i02.jpg",
  "annual-general-meeting": "p023-i03.jpg", "quiz-b": "p016-i02.jpg", "machine-learning-workshop": "machine-learning-workshop.webp", "deep-learning-workshop": "p012-i02.jpg",
  "ar-vr-workshop": "ar-vr-workshop.webp", "web-development-using-angular": "web-development-using-angular.webp", "augmented-reality-using-unity": "augmented-reality-using-unity.webp",
  "resilient-adaptive-electrical-systems-net-zero": "resilient-adaptive-electrical-systems-net-zero.webp", "ai-workshop-by-brainbrix": "ai-workshop-by-brainbrix.webp",
  "soldering-practice-and-arduino-basics": "soldering-practice-and-arduino-basics.webp",
};

const posterEvents = new Set([
  "design-on-electric-vehicle", "ias-membership-development", "skill-sharing-matlab", "kickstart-ctf", "genx-stellar", "genx-signal-savvy", "genx-luma",
  "genx-biomedley", "genx-eduquest", "genx-bit-2-byte", "cybersecurity-in-iot", "codex-scientific-computing-python", "enhancer-resume", "infoshare",
  "prompt-pulse", "sparkfix", "watts-up", "innovate-ed", "eli5", "edusphere", "take-off", "reel-it-up", "optiq", "python-machine-learning-internship",
  "biomed-insight", "quiz-b", "resilient-adaptive-electrical-systems-net-zero", "ai-workshop-by-brainbrix", "soldering-practice-and-arduino-basics",
]);

const infiniaSessions: MyEventSession[] = [
  ["infinia-inaugural-ceremony", "Inaugural Ceremony", "2024-09-27", "p131-i04.jpg"],
  ["infinia-personal-branding", "Personal Branding", "2024-09-27", "p134-i03.jpg"],
  ["infinia-igniting-leader", "Igniting the Leader in You", "2024-09-27", "p137-i03.jpg"],
  ["infinia-musical-night", "Musical Night", "2024-09-27", "p139-i03.jpg"],
  ["infinia-webtrix", "WebTriX", "2024-09-28", "p142-i03.jpg"],
  ["infinia-cre-8-ai", "Cre-8-AI", "2024-09-28", "p145-i03.jpg"],
  ["infinia-aerox", "AeroX", "2024-09-28", "p148-i04.jpg"],
  ["infinia-robolve", "Robolve", "2024-09-28", "p151-i04.jpg"],
  ["infinia-cloudify", "Cloudify", "2024-09-28", "p154-i04.jpg"],
  ["infinia-cybarmor", "CybArmor", "2024-09-28", "p156-i04.jpg"],
  ["infinia-flut-drive", "Flut-Drive", "2024-09-28", "p159-i03.jpg"],
  ["infinia-opimaml", "opimaML", "2024-09-28", "p165-i03.jpg"],
  ["infinia-rpa-forge", "RPA-Forge", "2024-09-28", "p167-i03.jpg"],
  ["infinia-membership-development", "Membership Development Session", "2024-09-28", "membership"],
  ["infinia-essentials-of-life", "Essentials of Life", "2024-09-28", "p170-i05.jpg"],
  ["infinia-cultural-night", "Cultural Night", "2024-09-28", "p173-i04.jpg"],
  ["infinia-product-design", "Product Design, From MVP to MLP", "2024-09-29", "p176-i04.jpg"],
  ["infinia-hackathon", "Hackathon", "2024-09-29", "p179-i03.jpg"],
  ["infinia-robotics-expo", "Robotics Expo", "2024-09-29", "p182-i04.jpg"],
  ["infinia-origami-expo", "Origami Expo", "2024-09-29", "p185-i04.jpg"],
  ["infinia-rc-car-expo", "RC Car Expo", "2024-09-29", "p188-i03.jpg"],
  ["infinia-drone-expo", "Drone Expo", "2024-09-29", "p190-i03.jpg"],
  ["infinia-puzzlers", "Puzzlers", "2024-09-29", "p193-i04.jpg"],
  ["infinia-bridge-the-gap", "Bridge the Gap", "2024-09-29", "bridge"],
  ["infinia-awards-closing", "Awards and Closing Ceremony", "2024-09-29", "p197-i03.jpg"],
].map(([id, title, date, imageFile]) => {
  const src = imageFile === "membership"
    ? "/images/events/infinia-membership-session-2024.webp"
    : imageFile === "bridge"
      ? "/images/events/bridge-the-gap-2024.webp"
      : `/images/events/2024/infinia/${id}.webp`;
  const kind = imageFile === "p142-i03.jpg" || imageFile === "p159-i03.jpg" ? "poster" : "photo";
  return {
    id,
    title,
    date,
    ...INFINIA_SESSION_STORIES[id],
    image: EVENT_MEDIA[id === "infinia-inaugural-ceremony" ? "techx-infinia" : id]?.[0] ?? {
      src,
      alt: kind === "poster" ? `Event poster for the ${title} session at TechX Infinia` : `A photo from the ${title} session at TechX Infinia`,
      kind,
    },
  };
});

const events2023: MyEvent[] = [
  { id: "api-101-postman", title: "API 101 with Postman", date: "2023-04-18", year: 2023, dateLabel: "18 April 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/api-101-postman.webp", alt: "Event poster for API 101 with Postman", kind: "poster" } },
  { id: "pace-lab-cloud-computing-internship", title: "PaceLab Cloud Computing Internship", date: "2023-05-16", endDate: "2023-05-18", year: 2023, dateLabel: "16 to 18 May 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/pace-lab-cloud-computing-internship.webp", alt: "IEEE Sahrdaya volunteers and participants at the PaceLab cloud computing internship", kind: "photo" } },
  { id: "bridge-the-gap-pre-university-track", title: "Bridge the Gap: Pre-University Track", date: "2023-09-09", year: 2023, dateLabel: "9 September 2023", unit: "IEEE Sahrdaya SB", group: "Student Branch", image: { src: "/images/events/2023/bridge-the-gap-pre-university-track.webp", alt: "Bridge the Gap event poster featuring participating students", kind: "poster" } },
  { id: "jam-engineering-day", title: "JAM: Engineering Day", date: "2023-09-15", year: 2023, dateLabel: "15 September 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/jam-engineering-day.webp", alt: "JAM Engineering Day report page with the 15 September 2023 date and event summary", kind: "document" } },
  { id: "machine-learning-using-python", title: "Machine Learning Using Python Workshop", date: "2023-09-13", year: 2023, dateLabel: "13 September 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/machine-learning-using-python.webp", alt: "Event poster for the Machine Learning Using Python workshop", kind: "poster" } },
  { id: "h2o-forge-underwater-robotics", title: "H2O Forge: Underwater Robotics Workshop", date: "2023-10-07", year: 2023, dateLabel: "7 October 2023", unit: "CS and Informatika", group: "Society chapter", image: { src: "/images/events/2023/h2o-forge-underwater-robotics.webp", alt: "Workshop poster and photo collage from H2O Forge underwater robotics", kind: "poster" } },
  { id: "confidence-development-entrepreneurship", title: "Confidence Development and Entrepreneurship", date: "2023-10-01", year: 2023, dateLabel: "1 October 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/confidence-development-entrepreneurship.webp", alt: "Event poster for the confidence development and entrepreneurship session", kind: "poster" } },
  { id: "sustainable-energy-computational-science", title: "Synergising Computational Science for Sustainable Energy Advancement", date: "2023-10-18", year: 2023, dateLabel: "18 October 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/sustainable-energy-computational-science.webp", alt: "Event poster for the sustainable energy computational science session", kind: "poster" } },
  { id: "pes-tournament", title: "PES Tournament", year: 2023, dateLabel: "October 2023", unit: "PES", group: "Society chapter", image: { src: "/images/events/2023/pes-tournament.webp", alt: "Event poster for the IEEE PES football tournament", kind: "poster" } },
  { id: "leadership-managerial-session", title: "Leadership and Managerial Session", date: "2023-11-03", year: 2023, dateLabel: "3 November 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/leadership-managerial-session.webp", alt: "Event poster for the leadership and managerial session", kind: "poster" } },
  { id: "membership-development-drive-2023", title: "Membership Development Drive", date: "2023-11-04", year: 2023, dateLabel: "4 November 2023", unit: "IEEE Sahrdaya SB", group: "Student Branch", image: { src: "/images/events/2023/membership-development-drive-2023.webp", alt: "IEEE Sahrdaya membership drive poster", kind: "poster" } },
  { id: "generative-ai-webinar", title: "Generative AI Webinar", date: "2023-11-05", year: 2023, dateLabel: "5 November 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/generative-ai-webinar.webp", alt: "Event poster for the generative AI webinar", kind: "poster" } },
  { id: "debate-competition", title: "Debate Competition", year: 2023, dateLabel: "2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/debate-competition.webp", alt: "Students seated together during a debate competition", kind: "photo" } },
  { id: "jump-start-membership-development", title: "Jump Start: Membership Development", date: "2023-11-08", year: 2023, dateLabel: "8 November 2023", unit: "CS Chapter", group: "Society chapter", image: { src: "/images/events/2023/jump-start-membership-development.webp", alt: "Event poster for the Jump Start membership development session", kind: "poster" } },
  { id: "product-marketing-competition", title: "Product Marketing Competition", date: "2023-11-08", year: 2023, dateLabel: "8 November 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/product-marketing-competition.webp", alt: "Event poster for the product marketing competition", kind: "poster" } },
  { id: "latex-workshop", title: "LaTeX Workshop", date: "2023-11-08", year: 2023, dateLabel: "8 November 2023", unit: "CS", group: "Society chapter", image: { src: "/images/events/2023/latex-workshop.webp", alt: "Event poster for the LaTeX technical paper writing workshop", kind: "poster" } },
  { id: "christmas-pool", title: "Christmas Pool", year: 2023, dateLabel: "2023", unit: "IEEE Sahrdaya SB", group: "Student Branch" },
  { id: "christmas-card-design-competition", title: "Christmas Card Designing Competition", year: 2023, dateLabel: "2023", unit: "CS", group: "Society chapter" },
];

const legacyEvents: MyEvent[] = events.map(([id, title, date, unit, group, existingImage]) => {
  const imageFile = eventImageFiles[id];
  const imageSrc = existingImage ?? (imageFile ? `/images/events/2024/${id}.webp` : undefined);
  const imageKind = posterEvents.has(id) ? "poster" : "photo";
  return {
    id,
    title,
    date,
    year: 2024,
    ...(id === "techx-infinia" ? { endDate: "2024-09-29", dateLabel: "27 to 29 September 2024", sessions: infiniaSessions } : {}),
    unit,
    group,
    ...(imageSrc ? {
      image: {
        src: imageSrc,
        alt: id === "techx-infinia"
          ? "IEEE Sahrdaya Student Branch volunteers at the TechX Infinia opening ceremony"
          : imageKind === "poster" ? `Event poster for ${title}` : `A photo from ${title}`,
        kind: imageKind,
      },
    } : {}),
  };
});

const corrections: Record<string, Partial<MyEvent>> = {
  "machine-learning-using-python": { endDate: "2023-09-14", dateLabel: "13 to 14 September 2023" },
  "debate-competition": { date: "2023-11-06", dateLabel: "6 November 2023" },
  "pes-tournament": { title: "eFootball Tournament (PES)", unit: "CS", image: { src: "/images/events/2023/pes-tournament.webp", alt: "IEEE Computer Society eFootball tournament poster", kind: "poster" } },
  "membership-development-drive-2023": { unit: "CS", group: "Society chapter" },
  "jam-engineering-day": { image: { src: "/images/events/2023/jam-engineering-day-photo.webp", alt: "Students participating in the Engineering Day Just a Minute speaking competition", kind: "photo" } },
  "christmas-pool": { image: { src: "/images/events/2023/christmas-pool-draw.webp", alt: "Archived number-draw screenshot from Christmas Pool", kind: "document" } },
  "christmas-card-design-competition": { image: { src: "/images/events/2023/christmas-card-design-competition.webp", alt: "Christmas card artwork submitted by Alan Saj", kind: "document" } },
  "deep-learning-workshop": { endDate: "2024-02-14", dateLabel: "13 to 14 February 2024" },
  "machine-learning-workshop": { endDate: "2024-02-14", dateLabel: "13 to 14 February 2024" },
  "python-machine-learning-internship": { endDate: "2024-05-13", dateLabel: "22 March to 13 May 2024" },
  "wie-triathlon": { endDate: "2024-04-03", dateLabel: "1 to 3 April 2024" },
  "edusphere": { date: "2024-04-14", endDate: "2024-04-20", dateLabel: "14 to 20 April 2024" },
  "eli5": { date: "2024-04-14", endDate: "2024-04-20", dateLabel: "14 to 20 April 2024" },
  "innovate-ed": { date: "2024-04-14", endDate: "2024-04-20", dateLabel: "14 to 20 April 2024" },
  "trailblazer": { date: "2024-04-20" },
  "wie-climate-innovation-pitch": { endDate: "2024-06-22", dateLabel: "19 to 22 June 2024" },
  "infoshare": { endDate: "2024-07-15", dateLabel: "25 June to 15 July 2024" },
  "codex-scientific-computing-python": { endDate: "2024-07-05", dateLabel: "1 to 5 July 2024" },
  "ar-vr-bootcamp": { endDate: "2024-08-09", dateLabel: "5 to 9 August 2024" },
  "web-development-using-angular": { endDate: "2024-10-09", dateLabel: "8 to 9 October 2024" },
  "augmented-reality-using-unity": { endDate: "2024-10-09", dateLabel: "8 to 9 October 2024" },
};

export const MY_EVENTS: readonly MyEvent[] = [...events2023, ...legacyEvents, ...COMMUNITY_EVENTS].map((event) => ({
  ...event,
  ...corrections[event.id],
  ...(EVENT_MEDIA[event.id] ? { image: EVENT_MEDIA[event.id][0], gallery: EVENT_MEDIA[event.id].slice(1) } : {}),
  story: event.story ?? EVENT_STORIES_2023[event.id] ?? EVENT_STORIES_2024[event.id] ?? EVENT_STORIES_2024_LATE[event.id],
})).sort((a, b) =>
  (b.date ?? `${b.year}-01-01`).localeCompare(a.date ?? `${a.year}-01-01`),
);
