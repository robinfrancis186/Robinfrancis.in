import type { MyEvent } from "./myEvents";

function eventImage(id: string, index: number, alt: string, kind: NonNullable<MyEvent["image"]>["kind"] = "photo"): NonNullable<MyEvent["image"]> {
  return { src: `/images/events/community/${id}-${index}.webp`, alt, kind };
}

const sourceLabel = "Robin Francis's LinkedIn event update";

export const COMMUNITY_EVENTS: MyEvent[] = [
  {
    id: "indiafoss-2026",
    title: "IndiaFOSS 2026",
    date: "2026-09-26", endDate: "2026-09-27", dateLabel: "26 to 27 September 2026", year: 2026,
    unit: "FOSS United", group: "Community events", role: "Volunteer",
    image: eventImage("indiafoss-2026", 2, "Volunteers and community members gathered on stage at IndiaFOSS 2026"),
    gallery: [
      eventImage("indiafoss-2026", 1, "Robin Francis volunteering at IndiaFOSS 2026 in Bengaluru"),
      eventImage("indiafoss-2026", 3, "IndiaFOSS 2026 signage at the NIMHANS Convention Centre"),
    ],
    story: {
      summary: "My first IndiaFOSS, experienced from the volunteer team and the wider free and open-source community.",
      paragraphs: [
        "I joined IndiaFOSS 2026 as a volunteer while still finding my way into free and open-source software. Across two days in Bengaluru, I had the chance to meet maintainers, contributors and builders, and see the work that goes into bringing this community together.",
        "The programme combined talks, lightning talks, workshops, panels, devrooms and booths. What stayed with me was the willingness to share knowledge and keep improving things together. I was grateful to Siddharth Shivkumar and FOSS United for the opportunity to be part of it.",
      ],
      venue: "NIMHANS Convention Centre, Bengaluru",
      highlights: ["Volunteer team experience", "Talks, workshops, devrooms and community booths", "Free software and digital commons"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_indiafoss2026-indiafoss-fossunited-ugcPost-7510381265792094210-lHgd/",
    },
  },
  {
    id: "astra-commons-kochi-2026",
    title: "Astra Commons: Kochi",
    date: "2026-09-10", dateLabel: "10 September 2026, 6:30 PM", year: 2026,
    unit: "Codex Community Events", group: "Community events", role: "Co-host",
    image: {
      src: "/images/events/community/astra-commons-kochi-2026-cover.webp",
      alt: "Astra Commons cover artwork showing a galaxy spiral and GPT-6 Astra",
      kind: "poster",
    },
    story: {
      summary: "A casual Kochi builder meetup celebrating GPT-6 Astra through coffee, conversation and community connections.",
      paragraphs: [
        "Hosted at Summer Town Cafe in Kakkanad, Astra Commons invited developers, students, founders and builders to share what they were working on and explore the GPT-6 Astra launch. The format was intentionally informal, with coffee and conversation instead of scheduled talks or demos.",
        "I joined Vaishakh Suresh and Rhiannon Payne as a host. The event listing also described Codex and API credits for registered attendees.",
      ],
      venue: "Summer Town Cafe, Kakkanad, Kochi",
      highlights: ["Community conversations with local builders", "GPT-6 Astra launch", "Codex and API credits for registered attendees"],
      sourceLabel: "Official Luma event listing",
      sourceUrl: "https://luma.com/at5xkowe",
    },
  },
  {
    id: "devin-clay-kochi-2026",
    title: "Devin & Clay",
    date: "2026-08-15", dateLabel: "15 August 2026, 2:00 PM to 8:00 PM", year: 2026,
    unit: "Devin Community Kochi and Cognition", group: "Community events", role: "Co-host",
    image: {
      src: "/images/events/community/devin-clay-kochi-2026-cover.webp",
      alt: "Devin & Clay event poster pairing pottery with AI-assisted software building",
      kind: "poster",
    },
    story: {
      summary: "A relaxed Kochi gathering where pottery and building software with Devin shared the same afternoon.",
      paragraphs: [
        "At The MudBrew Cafe, the day paired hands-on pottery with an introduction to Devin and a co-building session. Instead of a conventional hackathon, it left room for conversations, making, food and experimentation among local builders.",
        "I joined Vaishakh Suresh, Cognition, Viswanatha Kartha V, Advaith Narayanan and other collaborators in bringing the gathering together. My event reflection captures the contrast between shaping clay by hand and working through ideas with an AI software engineer.",
      ],
      venue: "The MudBrew Cafe, Kochi",
      highlights: ["Pottery cafe experience", "Introduction and hands-on co-building with Devin", "Conversations and networking with local builders"],
      sourceLabel: "Robin Francis's Devin & Clay event reflection",
      sourceUrl: "/blog/devin-clay-pottery-met-code-kochi/",
    },
  },
  {
    id: "inclucode-2026",
    title: "INCLUCODE 2026: Accessibility Buildathon",
    date: "2026-06-25", endDate: "2026-07-25", dateLabel: "25 June to 25 July 2026 · finale at 9:00 AM", year: 2026,
    unit: "IEEE ATII and Codex Community", group: "Community events", role: "Co-host",
    image: eventImage("inclucode-2026", 1, "INCLUCODE 2026 participants and organisers gathered at Sahrdaya"),
    gallery: [
      eventImage("inclucode-2026", 2, "INCLUCODE builders and volunteers outside Sahrdaya's main building"),
      eventImage("inclucode-2026", 3, "The INCLUCODE 2026 team on stage after the accessibility buildathon"),
      eventImage("inclucode-2026", 4, "INCLUCODE 2026 poster outlining accessibility tracks and the buildathon timeline", "poster"),
      {
        src: "/images/events/community/inclucode-powered-by-codex-kodakara-2026-cover.webp",
        alt: "IncluCode Powered by Codex poster describing accessibility tracks and inclusive technology goals",
        kind: "poster",
      },
    ],
    story: {
      summary: "A Codex-powered accessibility buildathon focused on inclusive communication and independence, ending with an in-person prototype showcase at Sahrdaya.",
      paragraphs: [
        "I co-hosted INCLUCODE with Vaishakh Suresh, bringing an accessibility-focused buildathon to Sahrdaya. IEEE ATII, Codex, STRIDE, IEEE IES Hubs & Nodes, FOSS United and IEEE Sahrdaya collaborated on a programme that moved from ideas into mentored product development and an in-person finale.",
        "Teams explored accessibility software, audio games for blind users, Malayalam speech technologies, cognitive tools and inclusive education. The journey recorded 571 registrations and 170 teams, with 32 finalist teams and 120 builders presenting solutions. Industry and academic mentors supported development, while judges and stakeholders reviewed the demonstrations at the finale on 25 July.",
        "The finale was also listed on Luma as “IncluCode - Powered by Codex: Kodakara,” scheduled for 25 July at 9:00 AM at Sahrdaya. Selected teams presented their prototypes to judges and stakeholders during the offline showcase.",
      ],
      venue: "Sahrdaya College of Engineering and Technology, Kodakara",
      highlights: ["571 registrations and 170 teams", "32 finalist teams and 120 builders", "Offline finale at Sahrdaya on 25 July at 9:00 AM"],
      sourceLabel: "Official Luma event listing",
      sourceUrl: "https://luma.com/vpfj3jeu",
    },
  },
  {
    id: "codex-nightline-kochi-metro",
    title: "Codex Nightline: Kochi Metro AI Hackathon",
    date: "2026-07-18", endDate: "2026-07-19", dateLabel: "18 to 19 July 2026", year: 2026,
    unit: "Codex Community Kochi and Kochi Metro", group: "Community events", role: "Organiser and mentor",
    image: eventImage("codex-nightline-kochi-metro", 4, "Codex Nightline builders gathered beside a Kochi Metro train"),
    gallery: [
      eventImage("codex-nightline-kochi-metro", 1, "Robin Francis and a fellow organiser at the Codex Community Kochi event"),
      eventImage("codex-nightline-kochi-metro", 2, "Robin Francis inside the Kochi Metro during Codex Nightline"),
      eventImage("codex-nightline-kochi-metro", 3, "A view of the Codex Nightline gathering through the metro train window"),
    ],
    story: {
      summary: "One hundred builders took their AI projects onto an after-hours Kochi Metro train for a two-hour build sprint.",
      paragraphs: [
        "I contributed as an organiser and mentor to Codex Nightline, working alongside Vaishakh Suresh, the Codex community and Kochi Metro Rail Limited. The event brought 100 builders and 100 projects into a setting where the train journey itself became the time available to build with OpenAI Codex.",
        "After check-in and the opening at Vyttila, participants built onboard during the late-night metro round trip. The programme continued after deboarding with project submissions, a showcase, judging and winner announcements. Supporting builders in that unusual environment made collaboration and practical problem-solving central to the experience.",
      ],
      venue: "Kochi Metro, starting at Vyttila, Kochi",
      highlights: ["100 builders and 100 projects", "Two-hour onboard AI build sprint", "Project showcase and judging after the ride"],
      sourceLabel: "Robin Francis's event post and the Codex Nightline programme",
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_aihackathon-openai-kochimetro-ugcPost-7485295742664749056-GZkW/",
    },
  },
  {
    id: "assistive-technology-inclusive-innovation-rset",
    title: "Assistive Technology and Inclusive Innovation at RSET",
    year: 2026, dateLabel: "2026",
    unit: "IEEE IES Hubs & Nodes and IEEE Sensors Council Kerala", group: "Community events", role: "Speaker",
    image: eventImage("assistive-technology-inclusive-innovation-rset", 2, "Robin Francis presenting an assistive technology session at Rajagiri"),
    gallery: [
      eventImage("assistive-technology-inclusive-innovation-rset", 1, "Robin Francis speaking about inclusive innovation at RSET"),
      eventImage("assistive-technology-inclusive-innovation-rset", 3, "Participants and speakers at the IEEE Hubs & Nodes event at Rajagiri"),
    ],
    story: {
      summary: "A session on designing assistive technology around real needs, alongside the launch of an AIoT labs initiative.",
      paragraphs: [
        "At the IEEE IES Hubs & Nodes Initiative event at Rajagiri, I led a session on Assistive Technology and Inclusive Innovation. The discussion focused on why inclusion matters and how students can think about, design and curate projects that address practical needs.",
        "The gathering also marked the launch of the AIoT Labs Initiative by the IEEE Sensors Council Kerala Chapter, led by Shone Jose. It connected the discussion of inclusive project design with a wider effort to bring hands-on AIoT education to engineering campuses across Kerala.",
      ],
      venue: "Rajagiri School of Engineering & Technology, Kochi",
      speakers: ["Robin Francis"],
      highlights: ["Assistive technology and inclusive project design", "AIoT Labs Initiative launch", "IEEE society and council collaboration"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_ieee-assistivetechnology-inclusiveinnovation-ugcPost-7451542836304429056-9_Z2/",
    },
  },
  {
    id: "shesolve-2026",
    title: "STRIDE SheSolve 2026",
    year: 2026, dateLabel: "March 2026",
    unit: "STRIDE", group: "Community events", role: "Programme contributor",
    image: eventImage("stride-2026-inclusive-hackathons", 3, "Robin Francis addressing students during STRIDE SheSolve at LBSITW Poojappura"),
    story: {
      summary: "A women's inclusive innovation hackathon at LBSITW Poojappura, held as part of International Women's Day activities.",
      paragraphs: [
        "SheSolve brought women together at LBSITW Poojappura to design around everyday needs. Held as part of International Women's Day activities, the hackathon placed empathy at the centre of innovation, with an emphasis on dignity, independence and confidence.",
        "I contributed to the wider STRIDE effort connecting awareness with inclusive technology. SheSolve was a separate event from Thinkable and AssistX. The shared recap reports 708 participants and 228 submissions across all three hackathons, not SheSolve alone; the wider awareness sessions reached more than 1,500 students.",
      ],
      venue: "LBS Institute of Technology for Women, Poojappura",
      highlights: ["International Women's Day activities", "Women designing for everyday needs", "Empathy, dignity and independence"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_stride-shesolve-thinkable-ugcPost-7450132426359726080-tVwA/",
    },
  },
  {
    id: "thinkable-2026",
    title: "STRIDE Thinkable 2026",
    year: 2026, dateLabel: "March 2026",
    unit: "STRIDE", group: "Community events", role: "Programme contributor",
    image: { src: "/images/events/community/thinkable-2026-audience.webp", alt: "Robin Francis speaking to the Thinkable audience at Sahrdaya", kind: "photo" },
    gallery: [
      { src: "/images/events/community/thinkable-2026-portrait.webp", alt: "Robin Francis speaking during STRIDE Thinkable at Sahrdaya", kind: "photo" },
      { src: "/images/events/community/thinkable-2026-poster.webp", alt: "STRIDE Thinkable teaser poster: Where Ideas Enable Lives, Coming Soon, with K-DISC and Sahrdaya branding", kind: "poster" },
    ],
    story: {
      summary: "An inclusive innovation hackathon at Sahrdaya focused on making learning and everyday living more accessible.",
      paragraphs: [
        "Thinkable was held at Sahrdaya College of Engineering and Technology as a distinct STRIDE hackathon. Its focus was on understanding problems deeply, designing thoughtfully and developing ideas that make learning and living more accessible for neurodivergent individuals and people with disabilities.",
        "I contributed to the wider STRIDE programme, which connected student awareness with practical inclusive innovation. Thinkable was separate from SheSolve at LBSITW and AssistX at Vidya. The shared recap gives combined figures of 708 participants and 228 submissions across the three events, without a Thinkable-specific breakdown.",
      ],
      venue: "Sahrdaya College of Engineering and Technology, Kodakara",
      highlights: ["Accessible learning and living", "Understanding needs before designing solutions", "Disability inclusion and neurodiversity"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_stride-shesolve-thinkable-ugcPost-7450132426359726080-tVwA/",
    },
  },
  {
    id: "assistx-2026",
    title: "STRIDE AssistX 2026",
    year: 2026, dateLabel: "March 2026",
    unit: "STRIDE", group: "Community events", role: "Programme contributor",
    image: { src: "/images/events/community/assistx-2026-audience.webp", alt: "Robin Francis addressing the AssistX orientation audience at Vidya Academy of Science and Technology", kind: "photo" },
    gallery: [
      eventImage("stride-2026-inclusive-hackathons", 1, "Robin Francis speaking to students at the AssistX orientation session at Vidya Academy"),
      { src: "/images/events/community/assistx-2026-poster.webp", alt: "AssistX Engineering Independence poster announcing Robin Francis's orientation session on 23 March, 11:00 AM to 12:30 PM, at Vidya Academy's auditorium", kind: "poster" },
    ],
    story: {
      summary: "An inclusive technology hackathon at Vidya Academy of Science and Technology, turning ideas into practical assistive solutions.",
      paragraphs: [
        "AssistX brought STRIDE's inclusive innovation approach to Vidya Academy of Science and Technology. The hackathon challenged participants to turn ideas into real-world solutions for neurodivergent individuals and people with disabilities, with attention to impact, scale and sustainability. I also led its orientation session, advertised for 23 March from 11:00 AM to 12:30 PM in the college auditorium under the theme Engineering Independence.",
        "I contributed to the wider programme linking awareness and student innovation. AssistX was its own event, distinct from SheSolve and Thinkable. Together the three hackathons recorded 708 participants and 228 submissions; those totals are programme-wide and should not be read as AssistX attendance or submissions alone.",
      ],
      venue: "Vidya Academy of Science and Technology, Thrissur",
      highlights: ["Practical assistive technology solutions", "Inclusive design and social impact", "Scalable and sustainable ideas"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_stride-shesolve-thinkable-ugcPost-7450132426359726080-tVwA/",
    },
  },
  {
    id: "srishti-2025",
    title: "Srishti 2025: Kerala State-Level Hackathon",
    date: "2025-09-21", year: 2025,
    unit: "Atal Innovation Mission and Samagra Shiksha Kerala", group: "Community events", role: "Organiser and judge",
    image: eventImage("srishti-2025", 2, "School students, mentors and organisers at the Srishti 2025 finale in Kochi"),
    gallery: [
      eventImage("srishti-2025", 1, "Srishti 2025 banner showing the 21 September state hackathon finale", "poster"),
      eventImage("srishti-2025", 3, "Students demonstrating an electronics prototype to mentors at Srishti 2025"),
    ],
    story: {
      summary: "Kerala's young innovators used AI and hands-on prototyping to present solutions at a school-student makeathon finale.",
      paragraphs: [
        "I served as an organiser and judge at Srishti 2025, which concluded on 21 September at Amrita's Kochi campus. The preparation began on 5 June with the Atal Innovation Mission team and brought together Samagra Shiksha Kerala, Kerala RMoCs, IIIT Kottayam, IEEE Kerala Section, Learning Links Foundation, Amrita IIC, AMMACHI Labs and student mentors.",
        "Samagra Shiksha Kerala's outreach reached 1,164 schools across all 14 districts. At the finale, students demonstrated prototypes and pitched their ideas, including using AI in Malayalam as well as English. Seeing students from Malayalam-medium backgrounds explain their solutions confidently was a particularly memorable part of judging the event.",
      ],
      venue: "Amrita Vishwa Vidyapeetham, Kochi Campus",
      highlights: ["School-student makeathon and prototype showcase", "Outreach to 1,164 schools across 14 districts", "AI use in Malayalam and English"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_srishti2025-keralahackathon-innovation-ugcPost-7376546786548572160-JqIZ/",
    },
  },
  {
    id: "ieee-international-virtual-career-fair-2025",
    title: "IEEE International Virtual Career Fair 2025",
    date: "2025-08-15", year: 2025,
    unit: "IEEE Region 10 Young Professionals", group: "Community events", role: "Co-Lead",
    image: eventImage("ieee-international-virtual-career-fair-2025", 2, "The virtual exhibition hall of the IEEE International Career Fair 2025", "document"),
    gallery: [
      eventImage("ieee-international-virtual-career-fair-2025", 1, "Robin Francis's certificate recognising service as Co-Lead of the IEEE Career Fair 2025", "document"),
      eventImage("ieee-international-virtual-career-fair-2025", 3, "Company booths available in the IEEE International Career Fair virtual platform", "document"),
    ],
    story: {
      summary: "An international virtual career fair connected candidates with recruiters through company booths and job applications.",
      paragraphs: [
        "I served as Co-Lead of the virtual career fair powered by IEEE Region 10 Young Professionals, working on strategy, coordination and engagement. IEEE Industry Engagement and IEEE Students collaborated on the initiative, which took place on 15 August.",
        "The fair recorded 245 registrations, 31 recruiters, 2,578 booth visits and 310 applications. Working with the global team involved bringing recruiters and participants into the same virtual space and turning the event's planning into opportunities people could explore directly.",
      ],
      venue: "Online",
      highlights: ["245 registrations and 31 recruiters", "2,578 booth visits", "310 applications"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_ieee-youngprofessionals-careerfair-ugcPost-7367819124179161088-tkUD/",
    },
  },
  {
    id: "stride-2025",
    title: "STRIDE 2025: Assistive Technology Designathon",
    year: 2025, dateLabel: "March to August 2025",
    unit: "K-DISC and IEEE Kerala Section", group: "Community events", role: "Lead Coordinator",
    image: eventImage("stride-2025", 2, "The STRIDE 2025 team at the Inclusive Innovation Summit"),
    gallery: [
      eventImage("stride-2025", 1, "Certificate recognising Robin Francis as Lead Coordinator of STRIDE 2025 from March to August", "document"),
      eventImage("stride-2025", 3, "STRIDE participants discussing assistive technology prototypes"),
      eventImage("stride-2025", 4, "Original STRIDE 2025 promotional timeline showing the planned programme phases", "poster"),
    ],
    story: {
      summary: "A six-month assistive technology initiative connected student teams, mentors, volunteers and public partners around inclusive design.",
      paragraphs: [
        "As Lead Coordinator of STRIDE 2025, I led outreach connecting with more than 2,600 participants and coordinated a 57-member volunteer team across technical, web, management, design and outreach roles. The programme worked with K-DISC, KSUM, APJ Abdul Kalam Technological University, Kudumbashree and IEEE Kerala Section.",
        "The designathon encouraged teams to develop practical assistive solutions that could support independence and everyday life. My work included shaping the programme, supporting teams and coordinating partners as ideas developed into prototypes. The experience brought together outreach, technical work and volunteer coordination around a shared goal of inclusive design.",
      ],
      venue: "Kerala, with campus activities and the Inclusive Innovation Summit",
      highlights: ["Lead Coordinator, March to August 2025", "Outreach to 2,600+ participants", "57-member volunteer team"],
      sourceLabel: "Robin Francis's STRIDE 2025 posts and experience certificate",
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_a-journey-to-remember-stride-2025-as-ugcPost-7362159511790383104-XFHs/",
    },
  },
  {
    id: "stride-zonal-connect-sahrdaya-2025",
    title: "STRIDE Zonal Connect at Sahrdaya",
    date: "2025-06-16", year: 2025,
    unit: "STRIDE and IEEE Sahrdaya", group: "Community events", role: "Inclusive design speaker",
    image: eventImage("stride-zonal-connect-sahrdaya-2025", 1, "STRIDE Zonal Connect participants gathered at Sahrdaya in June 2025"),
    gallery: [
      eventImage("stride-zonal-connect-sahrdaya-2025", 2, "Robin Francis delivering an expert talk at the STRIDE Zonal Connect"),
      eventImage("stride-zonal-connect-sahrdaya-2025", 3, "Student teams and speakers on stage at Sahrdaya's STRIDE Zonal Connect"),
    ],
    story: {
      summary: "Around 25 teams explored assistive technology and inclusive design during a STRIDE gathering at Sahrdaya.",
      paragraphs: [
        "I contributed a session on inclusive design at the STRIDE Zonal Connect at Sahrdaya. Around 25 teams came together with ideas ranging from assistive devices to sensory-friendly learning tools, presenting their thinking and preparing for the final rounds.",
        "The team from NIPMR Irinjalakuda shared insights into neurodivergence, helping ground the conversation in the needs of the people the projects aimed to serve. The day combined project discussions with perspectives on empathy, accessibility and designing technology that more people can use.",
      ],
      venue: "Sahrdaya College of Engineering and Technology, Kodakara",
      speakers: ["Robin Francis"],
      highlights: ["Around 25 teams", "Inclusive design session", "Neurodivergence insights from NIPMR Irinjalakuda"],
      sourceLabel,
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_stride2025-assistivetechnology-inclusion-ugcPost-7342400251326013440-Klkv/",
    },
  },
  {
    id: "ieee-yess-2024",
    title: "IEEE YESS 2024",
    date: "2024-08-24", year: 2024,
    unit: "IEEE Kerala Section and IEEE LINK", group: "Community events", role: "Volunteer",
    image: eventImage("ieee-yess-2024", 2, "IEEE YESS 2024 volunteers and participants gathered at MITS"),
    gallery: [
      eventImage("ieee-yess-2024", 1, "Robin Francis's IEEE YESS 2024 badge showing IEEE Sahrdaya", "document"),
      eventImage("ieee-yess-2024", 3, "The entrance to IEEE YESS 2024 at Muthoot Institute of Technology and Science"),
    ],
    story: {
      summary: "A large engineering-student summit combined technology exhibitions, talks, mentoring and an assistive technology makeathon.",
      paragraphs: [
        "I joined the volunteer community at IEEE YESS 2024, the Yearly Engineering Students Summit hosted at MITS with IEEE Kerala Section and IEEE LINK. The event brought students, professionals and society teams together for a day of technical activities and conversations.",
        "The programme included technology expos, face-to-face mentoring, an assistive technology makeathon and INARA, a generative-AI and VR fashion show. Teams from different student branches and IEEE societies supported the activities, with volunteers working together across the programme.",
      ],
      venue: "Muthoot Institute of Technology and Science, Kochi",
      highlights: ["Technology exhibitions and talks", "Face-to-face mentoring", "Assistive technology makeathon and INARA"],
      sourceLabel: "Robin Francis's YESS posts and the IEEE vTools event report",
      sourceUrl: "https://www.linkedin.com/posts/robinfrancis186_thrilled-to-be-part-of-the-massive-ieee-yess-ugcPost-7233521852407537664-wPcn/",
    },
  },
];
