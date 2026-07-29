export type StaticBlogPost = {
    id: string;
    slug: string;
    title: string;
    seoTitle?: string;
    category: string;
    tags: string[];
    image: string;
    imageAlt?: string;
    gallery?: {
        src: string;
        alt: string;
    }[];
    excerpt: string;
    metaDescription?: string;
    content: string;
    date: string;
    updatedAt?: string;
    proofTitles?: string[];
    internalLinks?: {
        label: string;
        href: string;
        description: string;
    }[];
};

export const STATIC_BLOG_POSTS: StaticBlogPost[] = [
    {
        id: "static-7",
        slug: "inclucode-2026-inclusive-software-innovation-buildathon",
        title: "INCLUCODE 2026: Building Technology That Includes Everyone",
        seoTitle: "INCLUCODE 2026 Inclusive Software Buildathon",
        category: "Accessibility",
        tags: ["Accessibility", "Inclusive Innovation", "INCLUCODE", "Community", "OpenAI Codex"],
        image: "/images/blog/inclucode-2026/inclucode-2026-builders-group.webp",
        imageAlt:
            "INCLUCODE 2026 builders, mentors, volunteers, and organizers gathered in the Sahrdaya College auditorium",
        excerpt:
            "INCLUCODE 2026 brought together 571 registrations, 170 teams, mentors, academicians, government representatives, and technology communities to develop practical digital solutions for accessibility, inclusion, and independence.",
        metaDescription:
            "How INCLUCODE 2026 united 571 participants and 170 teams to build practical accessibility solutions through mentorship and inclusive innovation.",
        date: "2026-07-29",
        updatedAt: "2026-07-29",
        gallery: [
            {
                src: "/images/blog/inclucode-2026/inclucode-2026-outdoor-community.webp",
                alt: "INCLUCODE 2026 participants, mentors, and organizers gathered outdoors with the event banner",
            },
            {
                src: "/images/blog/inclucode-2026/inclucode-2026-organizing-team.webp",
                alt: "Robin Francis with three members of the INCLUCODE 2026 organizing team on stage",
            },
            {
                src: "/images/blog/inclucode-2026/robin-francis-inclucode-2026-opening-talk.webp",
                alt: "Robin Francis delivering an opening address at the INCLUCODE 2026 buildathon",
            },
            {
                src: "/images/blog/inclucode-2026/robin-francis-inclucode-2026-mentoring.webp",
                alt: "Robin Francis reviewing a participant's work during INCLUCODE 2026",
            },
            {
                src: "/images/blog/inclucode-2026/inclucode-2026-appreciation-awards.webp",
                alt: "INCLUCODE 2026 mentor, speaker, and host appreciation awards displayed with handmade gifts",
            },
            {
                src: "/images/blog/inclucode-2026/inclucode-2026-builder-certificates-and-merchandise.webp",
                alt: "INCLUCODE 2026 certificates, USB drives, pens, keychains, and participant name tags",
            },
        ],
        content:
            `Accessibility is often considered only after a product has already been designed and developed. INCLUCODE 2026 began with a different belief: inclusion must be part of the problem definition, the design process, the technology, and the final solution from the very beginning.

Powered by Codex, INCLUCODE was created as an inclusive software innovation buildathon where students, developers, designers, and innovators could build practical and scalable digital solutions for persons with disabilities and neurodivergent individuals.

What started as an idea gradually became a collaborative journey involving participants, mentors, academicians, volunteers, technology communities, government representatives, and accessibility advocates.

From an Idea to a Growing Community

The response to INCLUCODE exceeded our expectations.

The event received 571 individual registrations from 170 teams representing 39 institutions. Participants came with different technical backgrounds, experiences, and perspectives, but they were united by one purpose: using technology to address real accessibility challenges.

The event was supported by 10 industry mentors and 10 academicians, who contributed their experience throughout the development and evaluation process. The offline finale also welcomed six representatives from government departments, adding an important public-sector perspective to the solutions presented.

INCLUCODE was built around five broad challenge areas:

- Accessibility Software
- Audio Games for Blind Users
- Malayalam TTS/STT and Inclusive Communication Technologies
- Cognitive and Assistive Tools
- Inclusive Education Tools

These categories were intentionally broad. Teams were encouraged not to simply reproduce the example ideas shared with them, but to understand the underlying problem, identify a genuine user need, and develop a solution with practical community value.

Selecting the Finalist Teams

Every submission was evaluated based on the relevance of the problem, the proposed solution, feasibility, inclusiveness, and potential impact.

From the 170 registered teams, 30 teams were initially shortlisted for the final development phase. However, we also wanted to ensure that a promising idea was not permanently excluded because of an early-stage submission.

This led to the introduction of the Wild Card Entry.

Teams that were not part of the initial shortlist were invited to develop and submit a working demonstration of their idea. These submissions were evaluated again, and two additional teams were selected through the Wild Card route.

This brought the final number to 32 teams comprising 120 builders.

The Wild Card Entry reflected an important principle of INCLUCODE: good ideas sometimes need another opportunity to prove their value.

A Structured Mentoring Journey

Selection was only the beginning.

Each finalist team was assigned a mentor and a dedicated volunteer POC. The POC coordinated communication, scheduled meetings, followed up with the team, and ensured that both the mentor and participants remained connected throughout the development period.

Every team received three structured online mentoring sessions.

The first meeting focused on understanding the problem statement, intended beneficiaries, proposed concept, and overall direction of the project. During this stage, mentors helped teams narrow broad ideas into achievable and community-relevant solutions.

The second meeting reviewed development progress. Teams demonstrated completed modules, discussed technical challenges, and received guidance on usability, accessibility, architecture, and implementation.

The third meeting concentrated on final preparation. Mentors reviewed the product, live demo, presentation, pitch, and readiness for the offline evaluation.

This continuous mentoring model helped the teams move beyond assumptions. Many participants refined their end goals, simplified overly complex concepts, and focused on building solutions that could realistically be used by communities.

The mentors who guided the teams included Anil Antony, Anna Ann Mathew, Jibin Jose, Dr. Manishankar S, Mrudul John Mathews, Robin Francis, Dr. Sreeraj R, Ujwel C, Vaishakh Suresh, and Viswanatha Kartha V.

Their contribution was central to the quality of the final solutions.

Supporting Teams Beyond Mentorship

The teams were also provided with access to Codex and OpenAI API credits, helping them experiment, build, debug, document, and improve their products during the development phase.

To make the journey more engaging, we introduced the E-Points System.

Teams could earn E-Points through mentor evaluations, active participation in the official group, responsiveness, and optional bonus activities. These activities were not mandatory, but they encouraged teams to stay engaged throughout the event timeline.

The accumulated E-Points could be redeemed during the offline event for additional prizes and limited-edition goodies.

This created a continuous engagement model rather than limiting the event to a single final-day evaluation.

The Offline Finale

The offline finale was held on 25 July 2026 at Sahrdaya College of Engineering & Technology (Autonomous), Thrissur.

The day brought together the 32 finalist teams, mentors, judges, volunteers, academicians, government representatives, and partner organisations.

The programme began with registration, inauguration, and a welcome session, followed by an IEEE IES Connect Session by Dr. Tripura Pidikiti, SMIEEE. Her involvement was instrumental in making the event possible and in strengthening the connection between the buildathon and the IEEE Industrial Electronics Society community.

Robin Tommy also joined the programme and shared valuable perspectives with the participants, helping them think beyond the immediate technical implementation of their projects.

The event was further strengthened by the presence and encouragement of Prof. Juan Jose Rodriguez-Andina, President of the IEEE Industrial Electronics Society. His support highlighted the importance of creating technology that delivers measurable social value.

Following the expert sessions, the teams interacted with mentors, refined their demonstrations, and prepared for evaluation.

Evaluation That Prioritised Working Solutions

With 32 teams and a limited evaluation window, it was important to maintain a fair and consistent process.

Each team received approximately five minutes with the judges. The evaluation rubric gave the highest importance to the live demonstration and functional performance of the solution.

The effectiveness of the solution and the quality of the concept were evaluated next, followed by usability, accessibility, technical feasibility, sustainability, presentation quality, and the team's ability to respond to questions.

This structure ensured that teams were not rewarded merely for having polished slides. A working solution that addressed a genuine need carried greater value.

After the first valuation, the strongest teams advanced to the final presentation and judging round. The day concluded with the closing ceremony, award distribution, and a collective photo session celebrating everyone who had contributed to the journey.

The Impact of INCLUCODE

The impact of INCLUCODE cannot be measured only through registration numbers or shortlisted teams.

Its real value was in the transformation that happened during the process.

Ideas became prototypes. Broad concepts became focused solutions. Participants who initially approached accessibility as a feature began to understand it as a fundamental design responsibility.

The event created a space where participants could:

- Work on challenges grounded in real community needs
- Receive guidance from industry professionals and academicians
- Develop and demonstrate functional prototypes
- Learn to consider accessibility, usability, and feasibility together
- Build connections with mentors, institutions, communities, and government representatives
- Explore possibilities for deployment and future development

Several projects demonstrated the potential to continue beyond the event, especially where real beneficiaries and community requirements had already been identified.

More than a competition, INCLUCODE became a platform for building solutions that could contribute to education, communication, independent living, digital accessibility, and social participation.

A Collective Effort

An initiative of this scale is never the work of one person or one organisation.

I am deeply grateful to Sahrdaya College of Engineering & Technology (Autonomous) for hosting and supporting the offline event.

My sincere thanks to the IEEE Industrial Electronics Society Hubs & Nodes initiative, the IEEE Assistive Technology & Inclusive Innovation Group, IEEE Sahrdaya Student Branch, IEEE IA/IE/PELS Joint Chapter Kerala, FOSS United, STRIDE, the judges, mentors, academicians, volunteers, POCs, organising team, and every partner who contributed to making the event possible.

A special note of gratitude goes to Dr. Tripura Pidikiti, SMIEEE, for her leadership and support; Robin Tommy for sharing his insights; and Prof. Juan Jose Rodriguez-Andina for his encouragement and involvement.

I would also like to thank Pauline P. Narvas, Chirag Oswal, and Gabriel Chua for their support through OpenAI Codex, which gave our builders the tools and confidence to experiment, create, and improve their solutions.

Most importantly, thank you to every participant who chose to work on a real accessibility challenge and remained committed throughout the mentoring, development, and evaluation process.

A Personal Reflection

As an organiser and mentor, one of the most meaningful parts of INCLUCODE was watching teams rethink their ideas.

Some began with solutions that were technically ambitious but disconnected from practical use. Through discussions with mentors, they started asking better questions:

Who will use this?
What exact barrier are we removing?
Can the intended beneficiary use it independently?
Can this solution be implemented and maintained outside a demonstration environment?

That shift - from building what is technically impressive to building what is genuinely useful - was one of the most important outcomes of the event.

INCLUCODE 2026 reaffirmed that inclusive innovation is not simply about adding accessibility to technology. It is about listening, co-creating, testing assumptions, and designing with dignity and independence at the centre.

571 registrations. 170 teams. 39 institutions. 32 finalist teams. 120 builders. One shared mission.

Code Inclusive. Build Accessible. Empower Independence.`,
    },
    {
        id: "static-6",
        slug: "ieee-sahrdaya-student-branch-movement",
        title: "From a Student Branch to a Movement: My Journey as Chairperson of IEEE Sahrdaya SB",
        seoTitle: "My IEEE Sahrdaya Student Branch Leadership Journey",
        category: "Leadership",
        tags: ["Leadership", "IEEE", "Community", "Student Branch"],
        image: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-classroom-session-1.webp",
        imageAlt: "Robin Francis addressing students during an IEEE Sahrdaya classroom session",
        excerpt:
            "How IEEE Sahrdaya Student Branch grew from a campus organization into a movement of leadership, confidence, service, and community.",
        date: "2026-07-02",
        updatedAt: "2026-07-07",
        proofTitles: [
            "INSPIRA IEEE Sahrdaya SB Magazine 2024",
            "IEEE Region 10 Outstanding Volunteer Award recipients",
        ],
        internalLinks: [
            {
                label: "Projects",
                href: "/projects/",
                description: "See the shipped and concept projects that connect Robin's leadership work to product execution.",
            },
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Source-backed recognitions connected to IEEE leadership and community impact.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Verified bio, achievements, headshot, and links for event organizers and media.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "Photos from IEEE Sahrdaya, TechX Infinia, awards, and student mentorship moments.",
            },
        ],
        gallery: [
            {
                src: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-classroom-session-2.webp",
                alt: "IEEE Sahrdaya students attending a leadership and technology classroom session",
            },
            {
                src: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-techx-audience.webp",
                alt: "Students at TechX Infinia holding up phone lights during a campus event",
            },
            {
                src: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-techx-infinia-group.webp",
                alt: "TechX Infinia group photo at Sahrdaya College auditorium",
            },
            {
                src: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-stage-talk.webp",
                alt: "Robin Francis speaking on stage during an IEEE Sahrdaya program",
            },
            {
                src: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-team-group.webp",
                alt: "IEEE Sahrdaya Student Branch team with faculty advisors",
            },
            {
                src: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-recognition.webp",
                alt: "Robin Francis receiving recognition on stage at Sahrdaya",
            },
            {
                src: "/images/blog/ieee-sahrdaya-chairperson/ieee-sahrdaya-drone-demo.webp",
                alt: "Students exploring drone technology during an IEEE Sahrdaya outreach session",
            },
        ],
        content:
            `Some journeys do not begin with a perfect plan.

Mine began with a responsibility, a team, a lot of uncertainty, and one strong belief - that IEEE Sahrdaya Student Branch could become more than just an active student branch. It could become a space where students found confidence, friendships, leadership, purpose, and a reason to dream bigger.

When I look back at my time as the Chairperson of IEEE Sahrdaya SB, I do not simply remember meetings, reports, posters, or events. I remember people.

I remember the volunteers who stayed back after class to plan an event. I remember the late-night calls before major programs. I remember moments when things almost went wrong, and someone from the team would step forward and say, "We'll manage it." I remember the nervous faces before anchoring for the first time, the excitement after a successful event, the tired smiles after long days, and the group photos that became memories we will carry for life.

IEEE Sahrdaya SB was never just an organization for me. It became a family, a responsibility, and one of the most defining chapters of my life.

The Responsibility of Continuing a Legacy

Taking up the role of Chairperson was not easy. IEEE Sahrdaya SB already had a strong name, a strong culture, and a strong legacy. The challenge was not only to continue what was already built, but to take it forward with more meaning, more reach, and more impact.

My vision was simple: every student who entered IEEE Sahrdaya SB should leave with something valuable.

For some, it would be technical knowledge.
For some, it would be confidence.
For some, it would be friendships.
For some, it would be leadership.
For some, it would be the first stage where they realized what they were capable of.

That became the foundation of our work.

We did not want IEEE to be limited to a few events or a few familiar faces. We wanted it to become a platform where every member felt included, every volunteer felt valued, and every team had the freedom to build something meaningful.

Building Leaders, Not Just Events

During my tenure, one of the biggest lessons I learned was that a successful Student Branch is not measured only by the number of events it conducts. It is measured by the number of leaders it creates.

Events come and go. Posters fade. Reports get archived. But the people who grow through those experiences continue to carry the impact forward.

I saw students who once hesitated to speak in meetings later lead teams with confidence. I saw volunteers who joined only to help with small tasks eventually become coordinators, secretaries, and chairpersons. I saw juniors take ownership, seniors become mentors, and different IEEE societies come together as one strong ecosystem.

That transformation was the real achievement.

IEEE gave us a stage, but it was the volunteers who gave that stage life.

Growth That Was Built Step by Step

The journey was not built overnight. It was built through consistent effort, one program at a time, one volunteer at a time, one opportunity at a time.

During this period, IEEE Sahrdaya SB witnessed remarkable growth in membership, activities, collaborations, and visibility. Our Student Branch grew from 110 members to 534 members. IEEE Computer Society Sahrdaya SB Chapter grew from 163 members to 300 members. We conducted 136+ programs, engaged hundreds of students, organized technical and professional development activities, and created platforms that helped students explore technology, leadership, innovation, and service.

But behind every number, there was a story.

Behind every membership count was a student who decided to become part of a global professional community.
Behind every event was a team that worked silently behind the scenes.
Behind every recognition was a group of volunteers who gave their time, creativity, and energy without expecting anything in return.

That is what made the growth meaningful.

TechX Infinia, ALTAIR 2.0, and the Spirit of Thinking Big

Some events become milestones because of their scale. Some become special because of the people behind them. Some become unforgettable because they change the way a team sees itself.

For us, initiatives like TechX Infinia and ALTAIR 2.0 were more than events. They were proof that student volunteers, when trusted and empowered, can create experiences that match professional standards.

TechX Infinia brought together energy, innovation, teamwork, and ambition. It showed what our Student Branch could achieve when every society, every volunteer, and every leader worked together with one vision.

ALTAIR 2.0 became another proud milestone, earning recognition through the Darrel Chong Student Activity Award - Bronze. The branch was also recognized with the Exemplary Student Branch Award, making the year even more special for everyone who contributed to this journey. These recognitions were also highlighted in Inspira - The IEEE Sahrdaya SB Magazine 2024, which beautifully documented the spirit, achievements, and people behind IEEE Sahrdaya SB.

But awards were never the final goal.

The goal was always impact.

The awards only reminded us that the work we were doing inside our campus had meaning far beyond it.

The Strength of Societies and Volunteers

One of the most powerful aspects of IEEE Sahrdaya SB was its diverse society ecosystem.

IEEE Computer Society, Women in Engineering, Engineering in Medicine and Biology Society, Signal Processing Society, Education Society, Power & Energy Society, Robotics & Automation Society, Industrial Electronics Society, Industrial Applications Society, Photonics Society, SIGHT, and many more units brought different strengths to the Student Branch.

Each society had its own identity. Each team had its own energy. But together, we became one IEEE Sahrdaya family.

As Chairperson, my role was not to control every activity. It was to create an environment where each team could grow, experiment, and lead.

That is something I will always be proud of.

Because the best kind of leadership is not about being the center of everything. It is about building a system where many people can rise together.

The Challenges No One Sees

Every successful year has a side that most people do not see.

There were moments of pressure. There were plans that failed. There were permissions that took longer than expected. There were budget concerns, schedule clashes, academic pressure, volunteer fatigue, and last-minute changes.

There were days when we were unsure whether an event would happen the way we imagined. There were moments when we had to rethink, rework, and restart.

But every challenge taught us something.

We learned how to communicate better.
We learned how to manage people.
We learned how to handle uncertainty.
We learned how to take responsibility.
We learned how to keep going even when things were difficult.

Looking back, I realize that the difficult moments shaped us more than the easy ones.

A Journey That Changed Me

IEEE Sahrdaya SB did not just grow during my tenure. I grew with it.

It taught me how to lead with patience. It taught me how to listen before deciding. It taught me how to trust a team. It taught me that leadership is not about doing everything yourself, but about helping others believe that they can do it too.

It also taught me that recognition is meaningful, but responsibility is greater.

Receiving the IEEE Region 10 Outstanding Volunteer Award was one of the proudest moments of my journey. But even that recognition belonged to the ecosystem that shaped me - my team, mentors, faculty advisors, volunteers, seniors, juniors, and everyone who believed in me.

I was only one person in a much larger story.

And that story was IEEE Sahrdaya SB.

Gratitude to the People Who Made It Possible

No chairperson can build a Student Branch alone.

I owe this journey to my incredible Executive Committee, society leaders, volunteers, members, mentors, and faculty advisors.

To our Branch Counsellor and faculty advisors, thank you for guiding us and trusting student leadership.

To the Executive Committee, thank you for standing with me through every high and low.

To every society chairperson, secretary, and volunteer, thank you for carrying the branch forward with commitment.

To the media, documentation, registration, technical, logistics, design, and content teams, thank you for being the silent strength behind every visible success.

To my seniors, thank you for building the path before us.

To my juniors, thank you for giving me the hope that IEEE Sahrdaya SB will continue to grow beyond anything we imagined.

And to every IEEE Sahrdaya member, thank you for making this journey unforgettable.

More Than a Tenure

My time as Chairperson eventually came to an end, but the memories, lessons, and people from that journey continue to stay with me.

IEEE Sahrdaya SB was more than a leadership position. It was where I learned how to dream with a team. It was where I understood the power of community. It was where I saw ordinary students do extraordinary things when given the right platform.

It gave me confidence.
It gave me purpose.
It gave me people I will always be grateful for.
It gave me a version of myself that I had not fully discovered before.

And that is why this chapter will always remain close to my heart.

The Legacy Continues

A Student Branch is never defined by one year, one event, or one chairperson.

It is defined by the culture it creates.

IEEE Sahrdaya SB taught us to build, to serve, to lead, and to grow together. It taught us that leadership is not about standing above others, but standing with them. It taught us that impact is not always loud; sometimes it is found in the quiet confidence of a student who decides to take the next step.

As I look back, I feel proud of what we built. But more than that, I feel grateful that I got to build it with the right people.

My time as Chairperson may have been one chapter, but IEEE Sahrdaya SB will always remain a part of my story.

And perhaps that is the most beautiful thing about this journey.

We did not just conduct events.
We built people.
We built memories.
We built a culture.
We built a movement.`,
    },
    {
        id: "static-1",
        slug: "soulsync-emotional-wellness",
        title: "SoulSync: Building AI for Emotional & Cognitive Wellness",
        category: "Wellness",
        tags: ["Wellness"],
        image: "/images/blog/1720937570476.webp",
        excerpt: "A deep dive into creating AI-enabled tools for elders and caregivers.",
        date: "2026-01-12",
        updatedAt: "2026-07-07",
        proofTitles: [
            "The Week coverage of Team Bits & Bytes at the IBM watsonx GenAI Challenge",
            "IBM watsonx Challenge video coverage",
        ],
        internalLinks: [
            {
                label: "Projects",
                href: "/projects/",
                description: "See SoulSync beside Robin's other AI, accessibility, and product builds.",
            },
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Review the public proof for the IBM watsonx GenAI Challenge recognition.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Use Robin's verified bio, achievements, contact details, and proof links for media or events.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "See visual evidence from inclusive innovation, mentoring, and AI community work.",
            },
        ],
        content:
            "SoulSync explores multimodal AI that monitors tone, pacing, and contextual cues to support elders and caregivers. We built lightweight models that run fully on-device to preserve privacy, and tuned them for low-light and low-bandwidth environments where typical cloud assistants fail.\n\nWe added adaptive prompts for different cognitive states, offered optional journaling summaries that can be shared with clinicians, and designed escalation paths that notify family when risk signals like sentiment drift, agitation, or prolonged silence appear. The system emphasizes consent, transparency, and clinician-in-the-loop review before deployment, so that automation augments human care rather than replacing it.\n\nA key learning: usability beats model novelty. Care teams preferred predictable, explainable actions, like asking a grounding question every few minutes, over complex opaque behaviors. This shaped our evaluation rubric for safety, comfort, and trust.",
    },
    {
        id: "static-2",
        slug: "ieee-r10-volunteer-award",
        title: "IEEE R10 Outstanding Volunteer Award: My Journey of Impact",
        category: "Leadership",
        tags: ["Leadership"],
        image: "/images/blog/blog2/1731994207232.webp",
        excerpt: "Reflections on leadership, community-building, and global recognition.",
        date: "2025-12-18",
        updatedAt: "2026-07-07",
        proofTitles: [
            "IEEE Region 10 Outstanding Volunteer Award recipients",
            "INSPIRA IEEE Sahrdaya SB Magazine 2024",
        ],
        internalLinks: [
            {
                label: "Projects",
                href: "/projects/",
                description: "Explore the product and platform work that sits beside the IEEE leadership journey.",
            },
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Verify the IEEE Region 10 recognition and related public proof links.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Use the official short bio, long bio, achievements, and contact links.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "Browse visual evidence from awards, IEEE events, and community programs.",
            },
        ],
        content:
            "This write-up covers the leadership principles that scaled our student branches to more than 100 events per year. We formalized handover playbooks, paired every lead with a shadow, and ran quarterly retros so new teams inherited context instead of chaos.\n\nWe also built mentorship tracks with clear checkpoints: speaker sourcing, sponsorship decks, logistics checklists, and post-event surveys. That reduced failure points and improved member retention, industry partnerships, and funded innovation programs that kept running even after founders graduated.\n\nThe biggest unlock was data visibility. Simple dashboards for attendance, NPS, and volunteer load helped us rotate responsibilities before burnout and double down on formats that worked. Workshops and office hours outperformed large one-off summits.",
    },
    {
        id: "static-3",
        slug: "future-of-accessible-technology",
        title: "The Future of Accessible Technology",
        category: "Tech",
        tags: ["Tech"],
        image: "/images/blog/accessible-tech.webp",
        excerpt: "How AI, multimodal interfaces, and affordable computing can empower millions.",
        date: "2025-11-26",
        updatedAt: "2026-07-07",
        proofTitles: [
            "K-DISC Social Enterprises and Inclusion listing",
            "STRIDE Kerala live website",
            "IEEE IES Faculty Development Programme article",
        ],
        internalLinks: [
            {
                label: "Projects",
                href: "/projects/",
                description: "Explore STRIDE Kerala, SoulSync, and other accessibility-centered product work.",
            },
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Review recognitions connected to inclusive innovation, AI, and humanitarian technology.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Use Robin's official bio and proof links for accessibility talks or media references.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "See STRIDE and inclusive innovation moments from the wider work.",
            },
        ],
        content:
            "Accessible tech requires multimodal inputs like voice, gesture, eye-tracking, and low-latency edge compute. We prototyped adaptive layouts that increase target sizes and contrast based on motor ability and vision needs, and we leaned on on-device speech models that tolerate dialectal variety without round-trips to the cloud.\n\nWe tested haptic cues as a redundant channel for critical alerts, added offline fallbacks for intermittent connectivity, and built a settings wizard that asks about comfort preferences up front instead of burying them in menus.\n\nThe takeaway: accessibility is not a bolt-on. It is a product foundation that improves UX for everyone, with faster surfaces for power users, clearer affordances for new users, and resilient behavior when networks are unreliable.",
    },
    {
        id: "static-4",
        slug: "scalable-systems-with-communities",
        title: "Building Scalable Systems with Student Communities",
        category: "Community",
        tags: ["Community"],
        image: "/images/blog/scalable-systems.webp",
        excerpt: "Lessons from leading 100+ programs and growing organizations.",
        date: "2025-10-14",
        updatedAt: "2026-07-07",
        proofTitles: ["INSPIRA IEEE Sahrdaya SB Magazine 2024"],
        internalLinks: [
            {
                label: "Projects",
                href: "/projects/",
                description: "Connect the community systems thinking to Robin's project and product work.",
            },
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Connect the leadership systems to source-backed awards and recognitions.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Find verified achievements, role descriptions, and contact details for collaborations.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "View event, mentorship, and student-community moments from the ecosystem.",
            },
        ],
        content:
            "We scaled student communities by standardizing playbooks for event operations, creating modular starter kits for hackathons, and setting up OKR-based tracking for chapter health. Kits included sponsor email templates, venue checklists, slide decks, and risk logs so new chapters could launch in days, not months.\n\nData dashboards surfaced burnout signals like volunteer hours and last-minute cancellations, then helped us rotate leads before bottlenecks formed. We also paired each technical program with a delivery partner, often an NGO, so prototypes had a path to real users after demo day.\n\nThe result was more consistent events, higher volunteer retention, and projects that survived beyond judging. The system favored repeatable processes over heroics, which made leadership sustainable.",
    },
    {
        id: "static-5",
        slug: "people-centric-ai",
        title: "Designing People-Centric AI Solutions",
        category: "Design",
        tags: ["Design"],
        image: "/images/blog/people-centric-ai.webp",
        excerpt: "Balancing tech innovation with empathy and social awareness.",
        date: "2025-09-08",
        updatedAt: "2026-07-07",
        proofTitles: [
            "The Week coverage of Team Bits & Bytes at the IBM watsonx GenAI Challenge",
            "K-DISC Social Enterprises and Inclusion listing",
            "STRIDE Kerala live website",
            "IEEE IES Faculty Development Programme article",
        ],
        internalLinks: [
            {
                label: "Projects",
                href: "/projects/",
                description: "Review people-centric AI projects including SoulSync, FoodLoop, and STRIDE.",
            },
            {
                label: "Achievements",
                href: "/achievements/",
                description: "See source-backed recognition for Robin's AI, accessibility, and community work.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Use official bio and proof links when referencing Robin's people-centric AI work.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "Browse the community and inclusive innovation contexts behind the writing.",
            },
        ],
        content:
            "People-centric AI starts with interviewing across ability, age, and bandwidth profiles. We tailored UX for intermittent connectivity, added offline fallbacks for critical actions, and kept error states explicit: here is what failed, and here is what we will try next.\n\nWe used progressive disclosure for model decisions: concise plain-language reasons first, deeper evidence on demand, and opt-out controls for data retention. Every release ran through fairness checks, explainability reviews, and trust surveys.\n\nThe main lesson is transparency without overwhelm. Users responded best when we gave just enough reasoning to build trust, plus a clear escape hatch to disable automation if it felt wrong.",
    },
];

export function findStaticBlogPost(slug?: string) {
    return STATIC_BLOG_POSTS.find((post) => post.slug === slug || post.id === slug) ?? null;
}
