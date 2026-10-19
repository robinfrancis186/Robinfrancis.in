import type { MyEvent } from "./myEvents";

const unit = "IEEE Education Society Kerala Chapter";
const role = "Student Activities Chair (EdSoc Kerala)";

export const EDSOC_EVENTS_2026: readonly MyEvent[] = [
  {
    id: "eduzest-2026", title: "EDUZEST: Learn, Play, Lead",
    date: "2026-04-11", endDate: "2026-04-19", year: 2026, dateLabel: "11 to 19 April 2026",
    unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/eduzest-poster.webp", alt: "EDUZEST Learn, Play, Lead poster introducing daily challenges, mini-games and a live leaderboard", kind: "poster" },
    gallery: [
      { src: "/images/events/edsoc-2026/eduzest-platform.webp", alt: "The EDUZEST online challenge platform at the close of IEEE Education Week 2026", kind: "document" },
    ],
    story: {
      summary: "An IEEE Education Week quiz and mini-game challenge that kept learners returning to a new set of problems each day.",
      paragraphs: [
        "Our EdSoc Kerala team ran EDUZEST online from 11 to 19 April as part of IEEE Education Week 2026. Daily quizzes, logical reasoning tasks and mini-games offered a different way to practise problem-solving alongside learners from other institutions.",
        "A live leaderboard let participants follow their progress throughout the nine-day programme. The event report records 111 registrations and 102 attendees, with 63 IEEE members and 48 non-members among those registered. Top performers received IEEE EdSoc goodies and recognition on the chapter's platforms.",
      ],
      venue: "Online",
      highlights: ["Nine days of daily learning challenges", "111 registrations and 102 attendees reported", "Live leaderboard and recognition for top performers"],
      sourceLabel: "IEEE Education Society Kerala Chapter EDUZEST 2026 event report",
    },
  },
  {
    id: "edsoc-f2f-2026", title: "F2F '26: EdSoc Student Leadership Meet",
    date: "2026-04-11", year: 2026, unit, group: "Society chapter",
    role: "Student Activities Chair; Idea Pool facilitator and judge",
    image: { src: "/images/events/edsoc-2026/f2f-team.webp", alt: "EdSoc Kerala's 2026 Student Leadership Team and chapter volunteers at the IEEE Kerala Section Office in Kochi", kind: "photo" },
    gallery: [
      { src: "/images/events/edsoc-2026/f2f-poster.webp", alt: "F2F '26 poster announcing the EdSoc face-to-face meeting on 11 April at the IEEE Kerala Section Office", kind: "poster" },
    ],
    story: {
      summary: "Fifty IEEE volunteers met in Kochi to welcome the 2026 Student Leadership Team and work through ideas for the year ahead.",
      paragraphs: [
        "The IEEE Education Society Kerala Chapter brought its newly selected Student Leadership Team together at the IEEE Kerala Section Office. I facilitated the Idea Pool session, where team members presented proposed programmes and discussed how they could serve students and communities.",
        "The proposals covered entrepreneurship, digital literacy, technical learning, women in STEM and educational innovation. I joined Dr. Leesha Paul, Anil M, Diya Jose and Akshay R S on the evaluation panel, offering feedback to help the team refine the ideas. These were proposals for future work, rather than a list of programmes already completed.",
        "Members of SLT '25 closed the meeting by sharing their volunteering experiences and lessons in teamwork and event delivery. The gathering gave the incoming team a chance to meet its collaborators and start planning together.",
      ],
      venue: "IEEE Kerala Section Office, Kochi",
      speakers: ["Robin Francis", "Dr. Leesha Paul", "Anil M", "Diya Jose", "Akshay R S"],
      highlights: ["50 IEEE participants reported", "Idea Pool presentations and panel feedback", "Experience sharing by the 2025 Student Leadership Team"],
      sourceLabel: "IEEE Education Society Kerala Chapter F2F '26 event report",
    },
  },
  {
    id: "stride-forward-disability-social-justice-2026", title: "STRIDE Forward: Disability Inclusion and Social Justice",
    date: "2026-03-28", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/stride-disability-poster.webp", alt: "STRIDE Forward poster featuring Dr. Abbas Ali T.K. and the topic Interventions in the Disability Sector and Social Justice", kind: "poster" },
    gallery: [
      { src: "/images/events/edsoc-2026/stride-disability-session.webp", alt: "Dr. Abbas Ali T.K. speaking during the online STRIDE Forward disability inclusion session", kind: "photo" },
    ],
    story: {
      summary: "An online talk with NIPMR Executive Director Dr. Abbas Ali T.K. on disability inclusion, accessibility and equal opportunities.",
      paragraphs: [
        "The STRIDE Forward series opened this discussion around Interventions in the Disability Sector and Social Justice. Dr. Abbas Ali T.K. connected disability-focused initiatives with community participation, explaining why inclusive innovation needs collaboration as well as technical ideas.",
        "Our EdSoc team coordinated the online programme with STRIDE, with Fida anchoring the discussion and Adila supporting hosting and virtual photography. The report records 99 participants across student, academic, professional and public audiences. Questions and practical examples helped attendees consider how accessibility and social responsibility can shape their own initiatives.",
      ],
      venue: "Online",
      speakers: ["Dr. Abbas Ali T.K."],
      highlights: ["99 participants reported", "Disability-sector interventions and social justice", "Discussion of accessibility and community participation"],
      sourceLabel: "IEEE Education Society Kerala Chapter STRIDE Forward report, 28 March 2026",
    },
  },
  {
    id: "stride-forward-meaningful-impact-2026", title: "STRIDE Forward: Building Meaningful Impact",
    date: "2026-04-18", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/stride-impact-poster.webp", alt: "STRIDE Forward poster featuring Dr. Bijuna Kunju K on aligning motivation with objectives in social projects", kind: "poster" },
    gallery: [
      { src: "/images/events/edsoc-2026/stride-impact-session.webp", alt: "Dr. Bijuna Kunju K and participants in the STRIDE Forward online discussion about social projects", kind: "photo" },
    ],
    story: {
      summary: "Dr. Bijuna Kunju K led an online talk on inclusive design and turning personal motivation into social projects grounded in users' needs.",
      paragraphs: [
        "Building Meaningful Impact: Aligning Motivation with Objectives in Social Projects brought 59 participants into the STRIDE Forward discussion. Dr. Bijuna Kunju K invited students to explain what makes a project socially useful, then explored how observation and conversations with communities can reveal problems worth addressing.",
        "The session distinguished clients from end users and stressed the value of involving users throughout development. Examples included a three-wheeler designed with feedback from people with disabilities. Prototyping, user testing and repeated improvements gave the discussion a practical focus for students planning assistive technology or other community projects.",
        "Our EdSoc team supported the programme with STRIDE. Jamsheera Basheer welcomed participants and introduced the speaker, while questions and chat responses kept the discussion interactive.",
      ],
      venue: "Online",
      speakers: ["Dr. Bijuna Kunju K"],
      highlights: ["59 participants reported", "Understanding clients and end users", "User testing and iterative design for social projects"],
      sourceLabel: "IEEE Education Society Kerala Chapter STRIDE Forward event report, 18 April 2026",
    },
  },
  {
    id: "stride-forward-pain-science-2026", title: "STRIDE Forward: Pain Science Meets Innovation",
    date: "2026-05-22", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/stride-pain-poster.webp", alt: "STRIDE Forward poster featuring Dr. Nanda Gopan R on technology-enabled solutions for chronic pain management", kind: "poster" },
    gallery: [
      { src: "/images/events/edsoc-2026/stride-pain-session.webp", alt: "Dr. Nanda Gopan R presenting Pain Science Meets Innovation during the STRIDE Forward webinar", kind: "photo" },
    ],
    story: {
      summary: "An online talk connecting chronic pain rehabilitation with accessible, clinically validated healthcare technology.",
      paragraphs: [
        "Dr. Nanda Gopan R, Director of Physiotherapy and Rehabilitation at SP Medifort Hospital, introduced the challenges of supporting people who need ongoing rehabilitation. The discussion considered how distance, travel and physical limitations can interrupt access to care.",
        "The session explored tele-rehabilitation, remote monitoring and digital health applications. Dr. Nanda emphasised collaboration with healthcare professionals and clinical validation, rather than assuming that an exercise app is suitable for every patient. Students discussed opportunities to build reliable tools around real rehabilitation needs.",
        "Our EdSoc team organised the STRIDE Forward session with a welcome by Remitha U and anchoring by Aishwarya A. The report records 79 registered participants and 79 attendees, including 48 IEEE members and 31 non-members.",
      ],
      venue: "Online",
      speakers: ["Dr. Nanda Gopan R"],
      highlights: ["79 attendees reported", "Tele-rehabilitation and remote patient monitoring", "Clinical validation and healthcare-engineering collaboration"],
      sourceLabel: "IEEE Education Society Kerala Chapter Pain Science Meets Innovation event report, 22 May 2026",
    },
  },
  {
    id: "sparkup-2-2026", title: "SparkUp 2.0: Startup Ideation Challenge",
    date: "2026-06-25", endDate: "2026-06-30", year: 2026, dateLabel: "25 and 30 June 2026",
    unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/sparkup-analysis.webp", alt: "A SparkUp 2.0 participant presenting an analysis of a business's decline during the first online round", kind: "photo" },
    gallery: [
      { src: "/images/events/edsoc-2026/sparkup-pitch.webp", alt: "A finalist presenting a startup concept to a SparkUp 2.0 judging panel online", kind: "photo" },
    ],
    story: {
      summary: "A two-round entrepreneurship competition that moved from diagnosing a struggling business to pitching an improvised startup idea.",
      paragraphs: [
        "Our EdSoc Kerala team designed SparkUp 2.0 around two different challenges. In the first round on 25 June, participants analysed a company-specific problem and presented a revival strategy. Evaluation considered the depth of their analysis, feasibility and clarity, with ten participants progressing to the final.",
        "On 30 June, finalists received two randomly assigned topics and had ten minutes to combine them into a startup concept, followed by a five-minute pitch. Remitha U and Abin formed one judging panel, with Akshay M R and Irene Anto on the other. Participants received feedback on both their ideas and their presentation approach.",
        "The event report records 140 participants, including 63 IEEE members and 77 non-members. The format made business analysis, quick decision-making and communication part of the same learning experience.",
      ],
      venue: "Online",
      speakers: ["Remitha U", "Abin", "Akshay M R", "Irene Anto"],
      highlights: ["140 participants reported", "Ten finalists selected after business-analysis presentations", "Ten minutes to prepare and five minutes to pitch in the final"],
      sourceLabel: "IEEE Education Society Kerala Chapter SparkUp 2.0 event report",
    },
  },
  {
    id: "witech-adas-gce-kannur-2026", title: "WiTech 2026 at GCE Kannur: Introduction to ADAS",
    date: "2026-07-04", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/witech-kannur-session.webp", alt: "Vyasan J explaining Advanced Driver Assistance Systems to students at Government Engineering College Kannur", kind: "photo" },
    gallery: [
      { src: "/images/events/edsoc-2026/witech-kannur-group.webp", alt: "WiTech 2026 participants and organisers gathered outside Government Engineering College Kannur", kind: "photo" },
      { src: "/images/events/edsoc-2026/witech-kannur-poster.webp", alt: "WiTech 2026 poster announcing Vyasan J's Introduction to ADAS session at GCE Kannur on 4 July", kind: "poster" },
    ],
    story: {
      summary: "A technical talk with Vyasan J on how sensing, AI and embedded systems come together in modern vehicle assistance systems.",
      paragraphs: [
        "The Kannur edition of WiTech brought our EdSoc team together with IEEE Student Branch GCE Kannur, its Women in Engineering affinity group and TransEduverse. Vyasan J, Founder and CEO of TransEduverse and EdSoc Kerala Membership Development Chair, led the Introduction to Advanced Driver Assistance Systems session.",
        "Students explored vehicle safety systems, sensor data and AI-based perception through industry examples. The discussion connected electronics, embedded systems and computer vision with intelligent mobility, followed by questions about skills and career opportunities in the field.",
        "The report records 25 participants, including nine IEEE members and sixteen non-members. This campus programme was separate from the Agentic AI workshop held at LBSITW on the same date.",
      ],
      venue: "Government Engineering College, Kannur",
      speakers: ["Vyasan J"],
      highlights: ["25 participants reported", "Vehicle sensing, AI perception and embedded systems", "Industry discussion and student questions"],
      sourceLabel: "IEEE Education Society Kerala Chapter WiTech GCE Kannur 2026 event report",
    },
  },
  {
    id: "witech-agentic-ai-lbsitw-2026", title: "WiTech 2026 at LBSITW: Agentic AI",
    date: "2026-07-04", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/witech-lbsitw-session.webp", alt: "Chitra V. S. Nair leading the WiTech Agentic AI workshop with students at LBSITW", kind: "photo" },
    gallery: [
      { src: "/images/events/edsoc-2026/witech-lbsitw-presentation.webp", alt: "The Agentic AI presentation and facilitator during WiTech 2026 at LBSITW", kind: "photo" },
      { src: "/images/events/edsoc-2026/witech-lbsitw-discussion.webp", alt: "Students taking part in a discussion during the WiTech Agentic AI workshop at LBSITW", kind: "photo" },
    ],
    story: {
      summary: "A workshop with Chitra V. S. Nair exploring AI agents, cloud services and workflows that extend beyond chatbot interactions.",
      paragraphs: [
        "Agentic AI: From Code to Autonomous Agents was organised by our EdSoc Kerala team with IEEE WIE and IEEE Student Branch LBSITW. Chitra V. S. Nair introduced how agents can combine reasoning and planning with APIs, external tools, memory and cloud services to complete multi-step tasks.",
        "Demonstrations and discussion covered AWS-based AI services, generative AI, prompt engineering and development frameworks. Students asked about agent architecture, use cases and career pathways, with encouragement to keep building and experimenting beyond the workshop.",
        "The report distinguishes 58 registrations from 40 attendees. The attendee breakdown was 19 IEEE members and 21 non-members.",
      ],
      venue: "LBS Institute of Technology for Women, Thiruvananthapuram",
      speakers: ["Chitra V. S. Nair"],
      highlights: ["58 registrations and 40 attendees reported", "AI agents, tools, memory and cloud services", "Generative AI and prompt-engineering demonstrations"],
      sourceLabel: "IEEE Education Society Kerala Chapter WiTech Agentic AI 2026 event report",
    },
  },
  {
    id: "witech-ai-agents-sahrdaya-2026", title: "WiTech 2026 at Sahrdaya: AI Agents and Innovation",
    date: "2026-07-11", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/witech-sahrdaya-workshop.webp", alt: "Students attending the WiTech AI agents workshop at Sahrdaya College of Engineering and Technology", kind: "photo" },
    gallery: [
      { src: "/images/events/edsoc-2026/witech-sahrdaya-poster.webp", alt: "WiTech 2026 poster featuring Ajoe Joseph's workshop on building event-driven AI agents using Google ADK", kind: "poster" },
      { src: "/images/events/edsoc-2026/witech-sahrdaya-ideathon.webp", alt: "WiTech Ideathon 2026 poster announcing Innovation that Cares at Sahrdaya on 11 July", kind: "poster" },
    ],
    story: {
      summary: "A hands-on Google ADK workshop followed by an ideathon on technology-based solutions to challenges faced by women.",
      paragraphs: [
        "Our EdSoc Kerala team collaborated with IEEE Sahrdaya Student Branch for a day of technical learning and team problem-solving. Ajoe Joseph, Google Developer Expert in Cloud AI, led Building Event-Driven AI Agents using Google Agent Development Kit, with demonstrations and guided activities introducing AI agents and automation.",
        "The afternoon's Innovation that Cares ideathon asked teams to apply their learning to challenges faced by women. After a briefing and problem-statement release by Prarthana, teams developed ideas, presented them and answered questions from the judges before the winners were announced.",
        "The programme report records 45 participants, including 37 IEEE members and eight non-members. Anil Antony welcomed the participants, with Aldrin Sojan and Irene Anto contributing to the session's closing and coordination.",
      ],
      venue: "Sahrdaya College of Engineering and Technology, Kodakara",
      speakers: ["Ajoe Joseph"],
      highlights: ["45 participants reported", "Hands-on AI agent development with Google ADK", "Innovation that Cares team ideathon"],
      sourceLabel: "IEEE Education Society Kerala Chapter WiTech Sahrdaya 2026 event report",
    },
  },
  {
    id: "pitchcraft-2026", title: "PitchCraft: Beyond the Pitch",
    date: "2026-07-18", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/pitchcraft-session.webp", alt: "Fahma Fathima speaking about startup development at PitchCraft in Kerala Startup Mission's Integrated Startup Complex", kind: "photo" },
    gallery: [
      { src: "/images/events/edsoc-2026/pitchcraft-poster.webp", alt: "PitchCraft poster featuring Fahma Fathima's Beyond the Pitch session and the VentureQuest product marketing competition", kind: "poster" },
    ],
    story: {
      summary: "An entrepreneurship session and product-marketing competition at Kerala Startup Mission, connecting startup concepts with pitching practice.",
      paragraphs: [
        "Our EdSoc Kerala team organised PitchCraft with IEEE Model Engineering College Student Branch and Kerala Startup Mission at the Integrated Startup Complex in Kalamassery. Fahma Fathima, Women Entrepreneurship Fellow at KSUM, led Beyond the Pitch: Building a Startup.",
        "Her session explored identifying problems, validating ideas, understanding customers and developing a business model. The VentureQuest traditional product marketing competition then gave participants a chance to practise positioning a product and communicating its value to an audience.",
        "The report records 32 participants, including eight IEEE members and 24 non-members. The combination of the expert session, competition and interaction with KSUM offered students a closer view of the startup ecosystem.",
      ],
      venue: "Integrated Startup Complex, Kerala Startup Mission, Kalamassery, Kochi",
      speakers: ["Fahma Fathima"],
      highlights: ["32 participants reported", "Startup development and idea validation with KSUM", "VentureQuest product marketing competition"],
      sourceLabel: "IEEE Education Society Kerala Chapter PitchCraft 2026 event report",
    },
  },
  {
    id: "inclutalk-2026", title: "IncluTalk: Voices Shaping Inclusive Tomorrow",
    date: "2026-07-24", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/inclutalk-poster.webp", alt: "IncluTalk poster featuring Reshmi Ravindranathan's Inclusive by Design session on 24 July 2026", kind: "poster" },
    gallery: [
      { src: "/images/events/edsoc-2026/inclutalk-session.webp", alt: "Reshmi Ravindranathan presenting Inclusive by Design during the IncluTalk online session", kind: "photo" },
    ],
    story: {
      summary: "An online talk on Universal Design and accessibility, asking how products and services can include people of different abilities from the outset.",
      paragraphs: [
        "Our EdSoc Kerala team hosted Reshmi Ravindranathan, Chief Digital Officer at Punarjeeva Technology Solutions, for Inclusive by Design: Moving from Accommodation to Universal Design. She used practical examples and case studies to show how accessibility can shape design decisions from the beginning.",
        "The discussion connected inclusive products and services with engineering practice, followed by questions about applying Universal Design. Remitha U introduced the speaker and closed the session with a vote of thanks. The report records 130 participants, including 42 IEEE members and 88 non-members.",
      ],
      venue: "Online",
      speakers: ["Reshmi Ravindranathan"],
      highlights: ["130 participants reported", "Universal Design principles and real-world examples", "Interactive questions on accessibility and inclusive innovation"],
      sourceLabel: "IEEE Education Society Kerala Chapter IncluTalk 2026 event report",
    },
  },
  {
    id: "preparing-campus-placements-2026", title: "Preparing for Campus Placements",
    date: "2026-08-15", year: 2026, unit, group: "Society chapter", role,
    image: { src: "/images/events/edsoc-2026/placements-poster.webp", alt: "Preparing for Campus Placements poster featuring Santhosh Kurup and the 15 August 2026 online session", kind: "poster" },
    gallery: [
      { src: "/images/events/edsoc-2026/placements-session.webp", alt: "Santhosh Kurup presenting the stages of campus recruitment during the online placement-preparation session", kind: "photo" },
    ],
    story: {
      summary: "A career-readiness session on CVs, communication, interviews and group discussions with Santhosh Kurup.",
      paragraphs: [
        "Our EdSoc Kerala team brought students together online for practical guidance on campus recruitment. Santhosh Kurup, Chief Consultant at AIM Business Solutions and Professor of Practice, discussed how to present academic work, skills and experience in a clear professional CV.",
        "The session continued with presentation skills, preparation for technical and HR interviews, and strategies for group discussions. Examples connected these areas to employers' expectations, with time for participant interaction before the closing appreciation.",
        "The report records 234 participants, including sixteen IEEE members and 218 non-members. The programme addressed several stages of placement preparation in one session rather than treating CV writing or interviews in isolation.",
      ],
      venue: "Online",
      speakers: ["Santhosh Kurup"],
      highlights: ["234 participants reported", "CV preparation and communication skills", "Technical and HR interview preparation and group discussions"],
      sourceLabel: "IEEE Education Society Kerala Chapter Preparing for Campus Placements 2026 event report",
    },
  },
];
