import type { StaticBlogPost } from "./blogPosts";

const photos = "/images/blog/openai-devday-bengaluru";

export const DEVDAY_BENGALURU_POST: StaticBlogPost = {
    id: "static-openai-devday-bengaluru-2026",
    slug: "my-first-openai-devday-exchange-bengaluru",
    title: "My First OpenAI DevDay: Rain, Reunions and a Longer Build List",
    seoTitle: "My First OpenAI DevDay Exchange in Bengaluru | Robin Francis",
    category: "Community",
    tags: ["OpenAI", "DevDay", "Bengaluru", "Codex", "AI", "Community"],
    image: `${photos}/robin-francis-openai-devday-bengaluru-community.webp`,
    imageAlt: "Robin Francis with fellow builders at the OpenAI DevDay Exchange Bengaluru backdrop on 16 October 2026",
    date: "2026-10-18",
    excerpt: "My first OpenAI DevDay Exchange in Bengaluru brought live AI demos, familiar faces, new perspectives and a surprise Pro 100 plan that is helping me finally build projects from my bucket list.",
    metaDescription: "Robin Francis shares his first OpenAI DevDay Exchange experience in Bengaluru: the sessions, builder community, rainy trip and surprise Pro 100 plan.",
    proofTitles: [
        "OpenAI DevDay Exchange 2026 official event page",
        "Robin Francis's OpenAI DevDay Exchange Bengaluru reflection",
        "Anchit Nishant's DevDay Bengaluru live session recap",
        "Pragya Misra's DevDay Bengaluru closing discussion recap",
    ],
    internalLinks: [
        { label: "What I am building", href: "/projects/", description: "Explore the AI, accessibility and community projects behind my growing build list." },
        { label: "Devin & Clay", href: "/blog/devin-clay-pottery-met-code-kochi/", description: "Another day where the people and surroundings changed how I thought about building." },
        { label: "Codex Nightline", href: "/blog/codex-nightline-ai-hackathon-moving-kochi-metro/", description: "What happened when our builder community took an AI hackathon onto the Kochi Metro." },
    ],
    gallery: [
        {
            src: `${photos}/devday-bengaluru-stage.webp`,
            alt: "The OpenAI DevDay Exchange Bengaluru stage photographed during Robin Francis's first DevDay visit",
            caption: "The stage, and the start of my first DevDay experience.",
            width: 1440, height: 1920,
        },
        {
            src: `${photos}/devday-bengaluru-welcome.webp`,
            alt: "An OpenAI DevDay character displayed by the venue window during Robin Francis's Bengaluru visit",
            caption: "Small details around the venue made it feel like a gathering for builders.",
            width: 1440, height: 1920,
        },
        {
            src: `${photos}/devday-bengaluru-developer-keynote.webp`,
            alt: "A speaker discussing India's developer ecosystem on stage at the OpenAI DevDay Exchange attended by Robin Francis",
            caption: "A session on India's developer ecosystem and the people building within it.",
            width: 1920, height: 1440,
        },
        {
            src: `${photos}/robin-francis-devday-community-selfie.webp`,
            alt: "Robin Francis taking a group selfie with fellow attendees at OpenAI DevDay Exchange Bengaluru",
            caption: "New conversations, familiar faces and plenty of reasons to reconnect.",
            width: 1920, height: 1440,
        },
        {
            src: `${photos}/robin-francis-devday-kerala-builders.webp`,
            alt: "Robin Francis and fellow builders posing together beside the OpenAI DevDay Exchange Bengaluru backdrop",
            caption: "A few of us from the Kerala builder community, together in Bengaluru.",
            width: 1920, height: 1440,
        },
        {
            src: `${photos}/devday-yellow-builder-mascot.webp`,
            alt: "A yellow OpenAI builder mascot held above Robin Francis's DevDay Exchange wristband",
            caption: "The little yellow builder deserved a photograph too.",
            width: 1440, height: 1920,
        },
        {
            src: `${photos}/robin-francis-devday-builder-mascot.webp`,
            alt: "Robin Francis posing with a fellow DevDay attendee and the yellow builder mascot in Bengaluru",
            caption: "One more memory from the conversations between sessions.",
            width: 1920, height: 1440,
        },
        {
            src: `${photos}/devday-mascots-at-the-table.webp`,
            alt: "Yellow and pink OpenAI builder mascots on a table at the DevDay Exchange attended by Robin Francis",
            caption: "A colourful corner of the day.",
            width: 1440, height: 1920,
        },
        {
            src: `${photos}/devday-builder-stickers-mementos.webp`,
            alt: "Builder stickers and event mementos collected by Robin Francis at OpenAI DevDay Exchange Bengaluru",
            caption: "Stickers, mementos and a camera roll full of reminders to keep building.",
            width: 1440, height: 1920,
        },
    ],
    content: `**16 October 2026 | OpenAI DevDay Exchange, Bengaluru**

I was super excited about this one. My first OpenAI DevDay, in Bengaluru, surrounded by people who were just as curious about what we could build next.

I came home with a full camera roll, new connections, a few very happy reunions and a longer list of things I wanted to make. I also came home with a surprise that has already started turning some long-pending ideas into projects.

But first, there was the trip.

Rain, Traffic and a Very Good Reason to Travel

There was rain on both sides of the journey. Travel was hectic, and Bengaluru traffic contributed exactly what you would expect Bengaluru traffic to contribute.

Even with all of that, I am glad I went. The tiredness and the logistics were real, but so was the excitement of finally being there. It was the kind of trip where you come back thinking about the conversations more than the inconvenience.

A huge part of making it possible was **Vaishakh Suresh**, who recommended me for the opportunity. Thank you, Vaishakh, for thinking of me and helping me be part of this experience.

Walking Into My First DevDay

[OpenAI DevDay Exchange](https://events.openai.com/devdayexchange2026) brings developers and technical founders together with OpenAI's product and engineering teams. The Bengaluru gathering took place on 16 October, as part of the 2026 international series, with technical sessions, real projects, Codex workflows and conversations with builders.

That description made sense before I arrived. Being in the room gave it a different meaning.

People were comparing what they were making, asking questions and trying to understand where these tools could fit into real work. There was a lot to absorb, but I liked that the discussions kept coming back to what people could actually do with the technology.

Two Humans, One AI Co-host

One of the day's live sessions brought **Anchit Nishant** and **Swagata Dutta Choudhury** together with **Meera, their AI co-host**. The session combined voice interaction and image generation, moving between the conversation, the session timeline and illustrations on screen. Anchit also shared [his account of the demo](https://www.linkedin.com/feed/update/urn:li:activity:7517166269528248320/).

What interested me was how those pieces could work together. Voice, images and an application's behaviour can become parts of the same experience. For someone interested in accessibility and useful software, that opens up many questions worth exploring: who finds an interface easier to use, what becomes faster, and where does a person still need clearer control?

The broader conversations around **GPT-Live, image generation, coding agents, Codex security, Dots, the Decisions API and the next generation of web applications** gave me plenty to think about. These were also the themes I wrote about in [my first reflection after the event](https://www.linkedin.com/posts/robinfrancis186_openai-devday-ai-ugcPost-7516914387102736384-sMEo/).

Codex and coding agents were particularly relevant to the projects already on my list. The security conversations mattered alongside them. As it becomes easier to build more software, I want to be equally deliberate about understanding it, checking it and making it useful to the people it is meant for.

From an Impressive Demo to Something People Use

The day closed with a developer discussion featuring **Vijaye Raji, Bonnie (Barnali) Chatterjee, Prabhjeet Singh and Pragya Misra**. In [Pragya's recap](https://www.linkedin.com/feed/update/urn:li:activity:7516897868247543808/), she described a room of about 1,000 developers and a discussion about turning impressive demonstrations into products people continue to use.

Her account connected that question to everyday needs, including public services, daily tasks and small businesses. That stayed with me because it is close to the kind of work I want to do: start with a problem someone actually has, understand it properly and build something that helps.

It is easy to leave a technology event wanting to try every feature. I also wanted to leave with better questions about the projects I was already building. What would make someone return to this? What would save them effort? What am I assuming about how they work?

The People Between the Sessions

Some of the best parts of the day happened between the scheduled sessions.

It was lovely meeting **Karan M V, Jerry George Thomas and Vaibhav Srivastav**, reconnecting with people I knew, and spending time with fellow builders from Kerala. A few familiar faces made a new environment feel much more familiar, while new introductions opened up completely different conversations.

What I enjoyed most was hearing how people approached the same problem differently. Someone would start with the user experience. Someone else would think about the workflow, the engineering or a completely different use case. We could be talking about the same technology and still see very different possibilities in it.

Those exchanges are a big reason I enjoy being in these rooms. You can ask a follow-up, share an unfinished idea and discover a perspective you would probably have missed on your own.

And Then Came the Pro 100 Surprise

The surprise **Pro 100 plan** from the OpenAI team was such a satisfying way to end the day. I was already excited to have attended. Getting access that I could take home and put to work made the experience even better.

Thank you, OpenAI. That was a lovely surprise.

I am now using it to build projects that have been on my bucket list for a long time. Some were ideas I kept postponing. Others were things I knew I wanted to work through but had not yet given enough time to. I am finally making progress on those builds and getting them closer to completion.

That is the part I am happiest about: carrying the energy of the day back into the work. There are projects I want to finish because they are needed, and having the opportunity to explore, iterate and keep going is helping me do that.

Coming Home With More to Build

My first DevDay was a good trip to Bengaluru, even with the rain, traffic and hectic travel around it. I liked how it went, the people I met and the way the day kept opening up new conversations.

Thank you again to **Vaishakh Suresh** for the recommendation, to the **OpenAI team** for the opportunity and the Pro 100 surprise, and to everyone who shared their time, ideas and enthusiasm.

I am looking forward to more of this: more people to learn from, more chances to reconnect and more opportunities to turn the ideas we talk about into things we can use.

For now, there is a bucket list of projects to get back to.`,
};
