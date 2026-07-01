export type StaticBlogPost = {
    id: string;
    slug: string;
    title: string;
    category: string;
    tags: string[];
    image: string;
    excerpt: string;
    content: string;
    date: string;
};

export const STATIC_BLOG_POSTS: StaticBlogPost[] = [
    {
        id: "static-1",
        slug: "soulsync-emotional-wellness",
        title: "SoulSync: Building AI for Emotional & Cognitive Wellness",
        category: "Wellness",
        tags: ["Wellness"],
        image: "/images/blog/1720937570476.webp",
        excerpt: "A deep dive into creating AI-enabled tools for elders and caregivers.",
        date: "2026-01-12",
        content:
            "SoulSync explores multimodal AI that monitors tone, pacing, and contextual cues to support elders and caregivers. We built lightweight models that run fully on-device to preserve privacy, and tuned them for low-light and low-bandwidth environments where typical cloud assistants fail.\n\nWe added adaptive prompts for different cognitive states, offered optional journaling summaries that can be shared with clinicians, and designed escalation paths that notify family when risk signals like sentiment drift, agitation, or prolonged silence appear. The system emphasizes consent, transparency, and clinician-in-the-loop review before deployment, so that automation augments human care rather than replacing it.\n\nA key learning: usability beats model novelty. Care teams preferred predictable, explainable actions, like asking a grounding question every few minutes, over complex opaque behaviors. This shaped our evaluation rubric for safety, comfort, and trust.",
    },
    {
        id: "static-2",
        slug: "ieee-r10-volunteer-award",
        title: "IEEE R10 Outstanding Volunteer Award: My Journey of Impact",
        category: "Leadership",
        tags: ["Leadership"],
        image: "/images/blog/ieee-award.webp",
        excerpt: "Reflections on leadership, community-building, and global recognition.",
        date: "2025-12-18",
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
        content:
            "People-centric AI starts with interviewing across ability, age, and bandwidth profiles. We tailored UX for intermittent connectivity, added offline fallbacks for critical actions, and kept error states explicit: here is what failed, and here is what we will try next.\n\nWe used progressive disclosure for model decisions: concise plain-language reasons first, deeper evidence on demand, and opt-out controls for data retention. Every release ran through fairness checks, explainability reviews, and trust surveys.\n\nThe main lesson is transparency without overwhelm. Users responded best when we gave just enough reasoning to build trust, plus a clear escape hatch to disable automation if it felt wrong.",
    },
];

export function findStaticBlogPost(slug?: string) {
    return STATIC_BLOG_POSTS.find((post) => post.slug === slug || post.id === slug) ?? null;
}
