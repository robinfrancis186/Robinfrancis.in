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
        id: "static-10",
        slug: "ncc-thal-sainik-camp-national-bronze-medal-journey",
        title: "From an RDC Dream to a TSC Bronze: The NCC Journey That Built Me",
        seoTitle: "My NCC Journey to a TSC National Bronze Medal",
        category: "Leadership",
        tags: ["NCC", "Leadership", "Discipline", "Thal Sainik Camp", "Kerala"],
        image: "/images/blog/ncc-thal-sainik-camp/ncc-kerala-contingent-trophies.webp",
        imageAlt: "The Kerala NCC contingent with their trophies and medals after the Thal Sainik Camp national competition",
        excerpt:
            "I joined NCC as a ninth-standard student at Don Bosco High School, Irinjalakuda. What followed was a journey through more than ten camps, two demanding firing events and a national bronze medal at the Thal Sainik Camp in Delhi.",
        metaDescription:
            "How more than ten NCC camps, a .22 rifle and two firing events led a ninth-standard cadet from Irinjalakuda to a national bronze medal at the Thal Sainik Camp in Delhi.",
        date: "2026-08-03",
        updatedAt: "2026-08-03",
        internalLinks: [
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Source-backed recognition across Robin's leadership and community work.",
            },
            {
                label: "Projects",
                href: "/projects/",
                description: "See the products and platforms built on the discipline this journey taught.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Verified bio, achievements, headshot, and links for event organizers and media.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "Photos from camps, community programs, and student mentorship moments.",
            },
        ],
        gallery: [
            {
                src: "/images/blog/ncc-thal-sainik-camp/ncc-firing-practice.webp",
                alt: "Robin Francis in the kneeling firing position with a .22 rifle during NCC training",
            },
            {
                src: "/images/blog/ncc-thal-sainik-camp/ncc-firing-target-sheet.webp",
                alt: "A .22 rifle target sheet showing the grouping of fired rounds around the centre",
            },
            {
                src: "/images/blog/ncc-thal-sainik-camp/ncc-directorate-camp-delhi.webp",
                alt: "The Thal Sainik Camp grounds in Delhi with NCC Directorate pavilions from across India",
            },
            {
                src: "/images/blog/ncc-thal-sainik-camp/ncc-cadet-armoured-vehicle.webp",
                alt: "Robin Francis standing in front of an armoured personnel carrier at the national camp",
            },
            {
                src: "/images/blog/ncc-thal-sainik-camp/ncc-cadets-with-officers.webp",
                alt: "Medal-winning NCC cadets with their officers and instructors after the competition",
            },
        ],
        content:
            `Most people see the bronze medal.

I remember everything that came before it.

I remember the camps, the selections, the physical training, the long days, the pressure to perform, the people who stood beside me, and the sound of the command before raising my rifle.

I remember being a ninth-standard student who had entered NCC without knowing how deeply it would influence the person I would become.

The medal was certainly special. But the journey towards it gave me something even more valuable: discipline, courage, confidence, friendships, and the strength to stand up for what I believe is right.

It Began at Don Bosco

My NCC journey began at Don Bosco High School, Irinjalakuda, where I joined the Army Wing under the Junior Division, commonly known as JD.

In NCC, the Junior Division is the school-level division for boys, while the corresponding category for girls is the Junior Wing. The Senior Division and Senior Wing generally consist of college-level cadets.

At that time, I was only in ninth standard.

I did not have a detailed plan for where NCC would take me. I was attracted to the uniform, the discipline, the training and the opportunity to do something beyond the regular school routine.

Gradually, NCC became much more than an extracurricular activity.

It became a way of life.

It taught me to respect time, follow instructions, work as part of a team and take responsibility for my own performance. It showed me that discipline was not about being controlled by someone else. It was about learning to control yourself, especially when circumstances became difficult.

RDC Was the Dream. TSC Became the Journey.

The interesting part of this story is that I was initially preparing for the Republic Day Camp, or RDC.

RDC is one of NCC's most prestigious national camps. It is conducted in Delhi and represents the culmination of a year of NCC training, bringing together specially selected cadets from across India for competitions, cultural activities, national integration programmes and ceremonial events.

That was the direction in which I thought I was moving.

But life had a different plan.

Instead of RDC, an opportunity opened for me through the Thal Sainik Camp, or TSC.

At first, it felt like an unexpected turn. Today, I see it as one of those moments when life takes you away from the path you planned and places you exactly where you are supposed to be.

TSC is an All India Army Wing camp intended to expose cadets to important elements of Army training while encouraging healthy competition among NCC Directorates. Its events include weapon firing, map reading, judging distance, field signals, health and hygiene, and other activities that challenge both physical and mental ability. The national camp is conducted in Delhi and brings together cadets representing NCC Directorates from across the country.

I was preparing for one dream.

But I was being led towards another achievement.

And I am grateful that everything came together at the right time.

Camp After Camp, Selection After Selection

Reaching the national camp was not a direct journey.

It involved more than ten different camps, many of them lasting around ten days. Each camp was a training period, but it was also part of the selection process.

We began as a large group of cadets.

Then the number started coming down.

Every camp demanded something more from us. It was not enough to perform well once. We had to prove ourselves repeatedly.

There were drills, physical activities, firing practices, inspections and disciplined routines. We were constantly observed, not only for our technical ability, but also for our behaviour, consistency, teamwork and willingness to learn.

Some days tested the body.

Some tested the mind.

Others tested whether we could continue giving our best even when we were tired, uncertain about the next selection, or under pressure to perform.

At every stage, someone would be eliminated from the process. That reality remained with us throughout the journey. A single poor performance could change everything.

From the large number that began the selection process, I eventually became one of the final three JD cadets selected through our firing stream for the competition.

That moment itself felt like an achievement.

But selection was not the destination.

It only meant that the real responsibility was beginning.

The .22 Rifle and the Discipline of Stillness

One of the most memorable parts of my NCC journey was getting the opportunity to train with different rifles.

The rifle that became central to my national competition journey was the .22 rifle.

Holding a rifle teaches you a different kind of discipline.

From the outside, shooting may appear to be mainly about aim. But when you experience it, you understand that accuracy depends on many small things working together.

Your breathing matters.
Your posture matters.
Your grip matters.
Your concentration matters.
Even your state of mind matters.

A slight movement or a moment of distraction can change where the round lands.

The 2017 NCC rules for Junior Division shooting specified the use of .22 rifles at a distance of 25 metres. There were two practices for JD cadets: Grouping and Snap Shooting, with three cadets firing in each practice.

Grouping

What we often called group firing was officially known as Grouping.

The aim was to fire five rounds and place them as closely together as possible. It was not simply about hitting somewhere near the centre. The closeness of the shots to one another showed the firer's consistency and control.

The official practice was conducted in a lying position with support. The scoring depended on the size of the group formed by the five shots. The tighter the group, the higher the score.

Grouping taught me patience.

It taught me not to rush.

It showed me that one good shot was not enough. What mattered was the ability to repeat that performance with consistency.

Snap Shooting

The second practice was Snap Shooting.

This was completely different.

In snap shooting, the target was exposed only for a short period. The 2017 rules provided five target exposures of seven seconds each. The rifle had to remain below the aiming position until the signal was given, after which the cadet had to raise it, identify the target, aim and fire within the limited exposure.

Snap shooting tested our reaction, confidence and ability to remain composed under time pressure.

There was no space for panic.

There was no time to overthink.

We had to trust our training.

In many ways, these two rounds represented two different lessons in life.

Grouping taught me consistency.

Snap shooting taught me decisiveness.

One required patience and control. The other demanded courage and immediate action.

Both lessons have remained useful far beyond the firing range.

Representing Kerala on the National Stage

After camp after camp, selection after selection and countless hours of practice, we finally reached the national competition in Delhi.

Standing there as a ninth-standard student and representing Kerala, my school and everyone who had supported me was a feeling that is difficult to put into words.

Until then, the competition had been something we were preparing for.

In Delhi, it became real.

Cadets had arrived from different parts of India. Everyone carried the pride of their Directorate. Every team had passed through its own selection process. Every cadet standing there had worked hard to earn that opportunity.

The pressure was certainly there.

But so was the pride.

Our Kerala firing team performed strongly across both Grouping and Snap Shooting. All the effort we had put into the selection camps, physical preparation and repeated firing practice finally came together.

And we secured the national-level bronze medal.

For us, the medal carried an additional emotion. It brought Kerala a national recognition in the competition after a long gap.

That made the moment even more meaningful.

I was grateful to God for the opportunity, for the timing and for giving me the strength to complete the journey.

I had started by preparing for RDC.

I returned from TSC as a national-level bronze medallist.

Sometimes, the opportunity we receive may not be the one we originally imagined. But it can still become exactly the opportunity we needed.

The Medal Belonged to More Than the Shooters

Although we competed in different categories, the Kerala contingent functioned as one team.

We supported every category representing our state.

There were cadets from:

- SD, the Senior Division
- SW, the Senior Wing
- JD, the Junior Division
- JW, the Junior Wing

The care and affection I received from the senior cadets remain among the most beautiful parts of this memory.

As a JD cadet, I was one of the younger members of the contingent. The seniors guided us, encouraged us and helped us adjust to the demands of the camp. They did not treat us simply as junior participants. They made us feel like an important part of the team.

My fellow JD cadets were going through the same pressure, hopes and uncertainty as I was. We trained together, waited for results together, supported each other and finally celebrated together.

When someone from Kerala competed, the rest of us stood behind them.

When someone succeeded, it felt like a success for the entire contingent.

That unity made the medal much bigger than an individual achievement.

It belonged to our instructors, officers, seniors, teammates, school and everyone who had invested their time and belief in us.

Learning From Officers and Their Experiences

Another valuable part of the journey was the opportunity to meet and interact with many officers.

Their lessons were not limited to drills or firing techniques.

They spoke from experience.

They shared what they had learned through their service, both on the field and away from it. Listening to them helped me understand that discipline was not only about maintaining a uniform or following a command.

It was about character.

It was about doing the right thing even when no one was watching.

It was about remaining responsible when situations became difficult.

It was about placing the team and the duty above individual comfort.

At that age, I may not have fully understood the depth of every lesson. But many of those words stayed with me. As I grew older and began leading teams, organizing programmes and taking responsibility for larger initiatives, I started recognizing how deeply those early experiences had influenced me.

What NCC Changed in Me

NCC did not change me through one event.

It changed me gradually.

Every camp added something.
Every selection taught me to handle uncertainty.
Every physical activity strengthened my ability to continue when things became uncomfortable.
Every firing practice improved my focus.
Every officer and senior taught me something about responsibility.
Every teammate showed me the value of standing together.

The experience gave me the discipline to begin something and remain committed to it.

It gave me the courage to take up challenges even when the outcome was uncertain.

It taught me to stand up for what is right, even when doing so is not easy.

It gave me the confidence to represent a team and accept responsibility for more than just my own performance.

Long before I began leading communities, coordinating large events or working with teams from different backgrounds, NCC was teaching me the foundations of leadership.

Show up on time.
Prepare properly.
Respect everyone.
Stay calm under pressure.
Support the team.
Complete the responsibility entrusted to you.

And never allow difficult circumstances to decide the limits of what you can achieve.

Becoming an Example for Those Who Followed

The bronze medal was an achievement for me, but I am equally happy that the journey became an example for cadets who came after me.

When someone from your school or unit reaches a national platform, it makes the opportunity feel possible for others.

It tells the next cadet: someone from here has done it, so maybe I can do it too.

Being able to represent Don Bosco and Kerala, and later inspire younger cadets to aim higher, is something I continue to value.

A medal celebrates one performance.

An example can influence many journeys.

Gratitude

I remain deeply thankful to Don Bosco High School, Irinjalakuda, for giving me the opportunity to join NCC and for supporting me throughout the journey.

The school did much more than allow me to participate. It created the environment in which a ninth-standard student could dream, train, travel, compete and represent Kerala at the national level.

I am grateful to every NCC officer, instructor and teacher who trained me, corrected me and continued to believe in my potential.

I am thankful to the Senior Division and Senior Wing cadets who cared for us like younger brothers and sisters, to the Junior Wing cadets who stood alongside us, and to my fellow Junior Division cadets who shared every stage of the journey.

I am thankful to everyone who supported the Kerala contingent across the different categories.

And above all, I am grateful to God.

I believe everything happened at the right time.

I may have been preparing for RDC, but TSC became the journey meant for me.

The Medal Was Bronze. The Memory Is Priceless.

Years have passed since that national competition.

The uniform is no longer part of my everyday life. The camps have ended. The firing range has become a memory. The medal now represents a chapter from my school days.

But the values have never left me.

The discipline remains.
The courage remains.
The ability to work with a team remains.
The confidence to take responsibility remains.
And the strength to defend what is right remains.

When I look back, I do not only see a ninth-standard boy holding a .22 rifle or standing with a national bronze medal.

I see the beginning of the person I was slowly becoming.

The bronze medal was a beautiful outcome.

But the person NCC helped me become will always be the greater achievement.

Jai Hind!`,
    },
    {
        id: "static-9",
        slug: "ieee-region-10-international-virtual-career-fair-2025",
        title: "Connecting Talent Across Borders: Co-Leading IEEE Region 10's First International Virtual Career Fair",
        seoTitle: "Co-Leading IEEE Region 10 Virtual Career Fair 2025",
        category: "Leadership",
        tags: ["IEEE", "Leadership", "Career Development", "Young Professionals", "Community Building", "Global Collaboration"],
        image: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-banner.webp",
        imageAlt: "IEEE Career Fair identity powered by IEEE Young Professionals and IEEE Region 10",
        excerpt:
            "How an international IEEE volunteer team transformed an ambitious idea into a virtual career platform connecting emerging talent with recruiters across borders.",
        metaDescription:
            "A reflection on co-leading IEEE Region 10's 2025 international Virtual Career Fair, which generated 245 registrations, 2,578 booth visits, and 310 applications.",
        date: "2026-07-31",
        updatedAt: "2026-07-31",
        proofTitles: [
            "IEEE Spectrum coverage of the global Virtual Career Fairs",
            "IEEE Career Fair official platform",
        ],
        internalLinks: [
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Source-backed recognition connected to Robin's IEEE leadership and volunteer work.",
            },
            {
                label: "Projects",
                href: "/projects/",
                description: "See the product and platform work that runs alongside Robin's community leadership.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Verified bio, achievements, headshot, and links for event organizers and media.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "Photos from IEEE programs, community teams, and student mentorship moments.",
            },
        ],
        gallery: [
            {
                src: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-recruiters.webp",
                alt: "The 31 recruiters from India, Malaysia, Sri Lanka, and UAE who joined the IEEE Region 10 Virtual Career Fair",
            },
            {
                src: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-virtual-exhibit-hall.webp",
                alt: "The virtual exhibit hall layout showing company booths, auditorium, lounge, and info desk",
            },
            {
                src: "/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-participation-outcomes.webp",
                alt: "Participation and outcomes: 245 registrations, 31 recruiters, 2,578 booth visits, and 310 job applications",
            },
        ],
        content:
            `Some milestones are remembered because they were the first. Others are remembered because of the opportunities they created.

On **15 August 2025**, we successfully hosted IEEE's first international Virtual Career Fair, powered by **IEEE Region 10 Young Professionals** in collaboration with the **IEEE Industry Engagement Committee** and **IEEE Students**.

Designed for students, recent graduates, and young professionals, the event created a space where emerging talent could interact directly with recruiters, understand current industry requirements, explore career opportunities, and identify roles aligned with their skills and aspirations.

It was more than a virtual event. It was an attempt to make opportunity accessible across borders.

A Milestone Measured in Opportunities

The results reflected the engagement and trust built around the initiative:

**245 registrations | 31 recruiters | 2,578 booth visits | 310 applications**

These numbers tell an important story.

A registration represented someone choosing to take the next step in their career. A booth visit represented curiosity, exploration, and a potential professional connection. An application represented the confidence to move from interest to action.

For recruiters, the event provided access to a diverse pool of emerging technical talent. For participants, it created an opportunity to discover companies and career paths that might otherwise have remained beyond their immediate professional networks.

Behind every metric was a person looking for an opportunity, a recruiter searching for the right talent, and a volunteer working to connect the two.

Why the Virtual Format Mattered

Talent exists everywhere, but access to opportunity is not always equally distributed.

Travel costs, geographic distance, limited professional networks, and a lack of exposure to recruiters can prevent capable students and young professionals from accessing the opportunities they deserve. A virtual career fair helps reduce many of these barriers by bringing recruiters and candidates into the same digital environment.

The broader IEEE Virtual Career Fair model uses interactive company booths, direct recruiter conversations, video interactions, and downloadable career resources to make recruitment more accessible and engaging. IEEE Spectrum later highlighted how this model could reduce geographic barriers while strengthening the connection between technical talent and industry. [Read IEEE Spectrum's coverage of the global Virtual Career Fair initiative.](https://spectrum.ieee.org/ieee-global-virtual-career-fairs)

For a participant, entering a virtual booth could become the beginning of a professional relationship. For a recruiter, a conversation could reveal talent that might never have appeared through a conventional hiring channel.

That possibility gave the initiative its real purpose.

My Role as Co-Lead

I had the privilege of serving as **Co-Lead** for the event, contributing primarily through strategy, coordination, and engagement.

Strategy helped us maintain a clear direction. Coordination helped align the different people, responsibilities, and timelines involved. Engagement helped ensure that the event remained more than a technical platform - it had to become a meaningful experience for both participants and recruiters.

Co-leading an international initiative also reminded me that leadership is often found in the work people do not immediately see.

It is present in the follow-ups, discussions, revisions, handovers, difficult decisions, and countless small actions required to move an idea forward. It is about ensuring that people remain connected to the purpose of the initiative, even when the process becomes demanding.

My role was only one part of a much larger collective effort. The event became possible because people from different backgrounds came together with a shared belief: career opportunities should not be restricted by geography.

The Trust Behind the Responsibility

A special note of gratitude goes to **Shone Jose** for trusting me with this responsibility.

Being given an important role is meaningful, but being genuinely trusted to carry it forward means even more. His confidence gave me the motivation to continue contributing through every stage of the journey.

Trust creates ownership. It encourages people to take initiative, accept responsibility, solve problems, and give their best to a shared mission.

This experience reinforced something I continue to believe strongly: the best leaders do not simply assign responsibilities. They give people the confidence to grow into them.

OneIEEE in Action

The Virtual Career Fair was a strong example of what becomes possible through the spirit of **OneIEEE**.

IEEE Region 10 Young Professionals, the IEEE Industry Engagement Committee, IEEE Students, recruiters, volunteers, and other contributors brought different strengths to the initiative. IEEE's official Career Fair platform describes this wider collaboration as an expression of OneIEEE, where multiple organizational units work together to strengthen industry connections and empower emerging talent. [Explore the official IEEE Virtual Career Fair platform.](https://careerfair.ieee.org/)

No single person or organizational unit could have produced this outcome alone.

The success belonged to the people who communicated, coordinated, invited recruiters, supported participants, managed responsibilities, solved unexpected challenges, and remained committed until the event became a reality.

I am particularly grateful to:

**Chamika Sudusinghe, Subodha Charles, Saaveethya Sivakumar, Aishwarya Bandla, Seif El Hajjem, Chamod Dilruk, Katelyn Serpe, and Joel John Kandathil.**

Their commitment, collaboration, and teamwork helped turn an ambitious vision into a measurable achievement.

Recruiters Who Believed in the Initiative

A career fair only creates value when organizations are willing to participate and engage meaningfully with talent.

The 31 recruiters who joined the event gave participants the opportunity to understand companies, explore available roles, ask questions, and submit applications. Their presence transformed the platform from an event concept into a genuine opportunity space.

I am deeply grateful to every participating company and recruiter who believed in the initiative. By giving their time, attention, and opportunities, they helped make this milestone possible.

Their involvement also demonstrated the importance of building stronger connections between professional communities and industry. When industry representatives actively engage with students and young professionals, participants gain more than information about job openings. They gain insight into expectations, skills, workplace cultures, and possible career pathways.

Impact Beyond a Single Day

A career fair may take place on one particular date, but its impact can continue long after the platform closes.

The **310 applications** submitted during the event showed that participants were not merely observing - they were actively pursuing opportunities.

The **2,578 booth visits** reflected a willingness to explore different organizations and career possibilities.

The involvement of **31 recruiters** showed that companies were willing to invest their time in discovering and supporting emerging technical talent.

Even when a conversation does not immediately lead to a job offer, it can help a participant understand an industry, improve an application, build confidence, discover a new role, or establish a valuable professional connection.

That is why the real impact of a career initiative cannot be measured only through immediate placements. It must also be measured through the confidence, exposure, networks, and future possibilities it creates.

Part of a Growing Global Movement

The Region 10 event was part of a larger movement within IEEE to strengthen workforce development and connect technical professionals with meaningful career opportunities.

The [official IEEE Virtual Career Fair portal](https://careerfair.ieee.org/) now presents regional fairs as part of a wider international series. IEEE Spectrum has also documented how the initiative expanded across IEEE regions, using virtual platforms to connect companies, universities, students, and professionals.

The model later continued through other regional editions. The [IEEE Career Fair USA overview](https://careerfair.ieee.org/wp-content/uploads/2025/09/IEEE-Career-Fair-USA.pdf) offers another perspective on how the initiative was adapted to connect employers with talent across IEEE Regions 1-6.

Seeing the concept grow beyond a single event made our Region 10 milestone even more meaningful. It showed that a well-executed idea could contribute to a much wider ecosystem of career development and industry engagement.

What the Experience Taught Me

Co-leading this initiative gave me several lessons that continue to influence how I approach community programs and international collaborations.

The first is that scale is built through clarity. A large team can only move together when everyone understands the purpose, responsibilities, and expected outcome.

The second is that coordination is ultimately about people. Tools, schedules, documents, and platforms are important, but genuine progress depends on communication, trust, and mutual respect.

The third is that leadership does not mean being at the centre of everything. It means creating the conditions in which different people can contribute their strengths and move towards a common goal.

Most importantly, the experience reminded me that successful initiatives should not only appear impressive. They should create genuine value for the people they are intended to serve.

A Collective Achievement

I first shared a shorter reflection about this milestone through my [original LinkedIn post](https://www.linkedin.com/posts/robinfrancis186_ieee-youngprofessionals-careerfair-activity-7367819125634555904-plH1). Looking back, the numbers still make me proud, but the people behind them make the experience truly memorable.

My heartfelt gratitude goes to every company, recruiter, mentor, colleague, volunteer, participant, and IEEE organizational unit that contributed to the event.

Thank you to **IEEE Region 10 Young Professionals**, the **IEEE Industry Engagement Committee**, **IEEE Students**, and everyone who worked behind the scenes.

And once again, special thanks to **Shone Jose** for the trust, encouragement, and responsibility.

**245 registrations. 31 recruiters. 2,578 booth visits. 310 applications. One international team united by a shared purpose.**

We did not simply host a virtual career fair.

We helped opportunity travel beyond borders.`,
    },
    {
        id: "static-8",
        slug: "codex-nightline-ai-hackathon-moving-kochi-metro",
        title: "History in Motion: Organizing the World's First AI Hackathon on a Moving Metro",
        seoTitle: "Codex Nightline: AI Hackathon on a Moving Metro",
        category: "Community",
        tags: ["AI Hackathon", "Codex Nightline", "OpenAI Codex", "Kochi Metro", "Community"],
        image: "/images/blog/codex-nightline/codex-nightline-builders-inside-metro.webp",
        imageAlt: "Builders coding inside a moving Kochi Metro train during Codex Nightline 2026",
        excerpt:
            "One hundred builders boarded an after-hours Kochi Metro train for Codex Nightline, a two-hour AI build sprint where the route itself became the deadline.",
        metaDescription:
            "My experience organizing and mentoring at Codex Nightline, the world's first AI build sprint inside a moving Kochi Metro train.",
        date: "2026-07-31",
        updatedAt: "2026-07-31",
        proofTitles: [
            "The Hindu BusinessLine coverage of Codex Nightline",
            "Codex Nightline official event site",
        ],
        gallery: [
            {
                src: "/images/blog/codex-nightline/codex-nightline-builders-kochi-metro-platform.webp",
                alt: "Codex Nightline builders gathered on the Kochi Metro platform beside the after-hours train",
            },
            {
                src: "/images/blog/codex-nightline/robin-francis-codex-nightline-metro-doorway.webp",
                alt: "Robin Francis standing in the doorway of a Kochi Metro train during Codex Nightline",
            },
            {
                src: "/images/blog/codex-nightline/codex-nightline-community-hackathon-group.webp",
                alt: "Codex Community Hackathon participants, mentors, and organizers at the Kochi venue",
            },
            {
                src: "/images/blog/codex-nightline/robin-francis-codex-nightline-organizers.webp",
                alt: "Robin Francis with a fellow organizer beside the Codex Community Hackathon Kochi banner",
            },
            {
                src: "/images/blog/codex-nightline/codex-nightline-thank-you-poster.webp",
                alt: "Codex Nightline after-event poster thanking participants for making history in motion",
            },
        ],
        internalLinks: [
            {
                label: "Projects",
                href: "/projects/",
                description: "See the AI products and prototypes behind Robin's build-sprint mentoring.",
            },
            {
                label: "Achievements",
                href: "/achievements/",
                description: "Source-backed recognition connected to Robin's AI and community work.",
            },
            {
                label: "Press kit",
                href: "/press-kit/",
                description: "Verified bio, headshot, and links for event organizers and media.",
            },
            {
                label: "Gallery",
                href: "/gallery/",
                description: "Photos from Codex community meetups, hackathons, and mentoring sessions.",
            },
        ],
        content:
            `Was organizing a hackathon on a moving metro ever on my bucket list?

Honestly, no. But now that it has happened, I think my bucket list needs an upgrade.

On 18 July 2026, I had the incredible opportunity to contribute as an organizer and mentor at [Codex Nightline](https://www.codexnightline.in/) - an event presented as the world's first AI build sprint inside a moving metro system.

One hundred selected builders boarded an exclusive after-hours Kochi Metro train and transformed it into a moving space for experimentation, problem-solving, and innovation. Even before the event began, the unusual concept attracted attention, including a feature by [The Hindu BusinessLine](https://www.thehindubusinessline.com/info-tech/kochi-to-host-codex-nightline-ai-build-sprint-in-moving-metro-system-on-july-18/article71192353.ece).

100 Builders. 100 Projects. One Moving Metro.

At 11:00 PM, the builders began their journey from Vyttila. As the metro travelled towards Aluva, Thrippunithura, and back, the route itself became the timer.

For two continuous hours, participants worked onboard using AI and Codex to turn their ideas into functional solutions. The build tracks covered urban mobility, civic and community tools, everyday productivity, and solutions for local businesses and creators.

It was a solo build sprint, meaning every participant was responsible for taking an idea from concept to implementation within the limited time available. The complete event format and tracks can also be explored through the [Codex Nightline listing on Hackathons.space](https://www.hackathons.space/hackathons/codex-nightline).

When the Journey Becomes the Deadline

A conventional hackathon gives participants time to settle into a venue, arrange their workspace, and gradually find their rhythm.

Codex Nightline was different.

The train kept moving. Stations passed by. The clock never stopped.

That movement created an entirely different kind of energy. Every carriage became a temporary innovation lab, filled with builders testing ideas, solving problems, and racing to create something meaningful before the metro completed its journey.

The venue was not merely a backdrop to the hackathon. It became part of the challenge itself.

My Experience as an Organizer and Mentor

What made the night especially meaningful for me was the opportunity to contribute as both an organizer and mentor.

I interacted with participants, listened to their ideas, helped them think through challenges, and watched their projects evolve as the train moved through the city. Seeing people remain focused, creative, and determined in such an unconventional environment was incredibly inspiring.

Experiences like this remind me why I enjoy building technology communities. Innovation becomes more powerful when people are given the right environment, encouragement, and opportunity to transform ideas into something real.

A Community Effort

An event of this scale and originality could only happen through collaboration.

A huge thank you to **Vaishakh Suresh** for imagining something this bold and successfully bringing it to life. I am also grateful to **OpenAI**, **Kochi Metro Rail Limited**, Codex Community Kochi, and everyone who supported the initiative.

Congratulations to the entire organizing, mentoring, and volunteering teams, as well as every builder who came forward to participate in this first-of-its-kind experience. The event was organized through the OpenAI Codex Ambassador programme, with Kochi Metro supporting the after-hours metro experience.

A [visual recap of Codex Nightline on Instagram](https://www.instagram.com/p/DbXuSx4jyRC/) captures how the Kochi Metro was transformed into a live coding environment for the night. I also shared a shorter reflection, along with photographs from the experience, in [my LinkedIn post about Codex Nightline](https://www.linkedin.com/posts/robinfrancis186_aihackathon-openai-kochimetro-activity-7485295743944294400-iGu9).

Beyond the Final Station

The metro eventually returned to Vyttila, but the journey of the ideas created during the night does not have to end there.

I am excited to see how the builders continue refining their projects, applying what they learned, and turning their prototypes into solutions that can create a larger impact.

Codex Nightline showed that innovation does not always need a conventional venue. Sometimes, all it takes is a bold idea, a committed community, and the courage to build while everything around you is moving.

**We didn't just build on the move.**

**We made history in motion.**`,
    },
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
];

export function findStaticBlogPost(slug?: string) {
    return STATIC_BLOG_POSTS.find((post) => post.slug === slug || post.id === slug) ?? null;
}
