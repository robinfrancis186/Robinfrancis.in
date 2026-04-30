import {
    ArrowUpRight,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Sparkles,
} from 'lucide-react';
import PageSeo from '@/components/seo/PageSeo';
import {
    IdentityCardBody,
    RevealCardContainer,
    type SocialItem,
} from '@/components/ui/animated-profile-card';
import { GlassmorphismProfileCard } from '@/components/ui/profile-card-1';

const profile = {
    avatarUrl: '/images/about/robin-light.webp',
    avatarText: 'RF',
    fullName: 'Robin Francis',
    place: 'Kerala, India',
    title: 'AI Innovator & Community Leader',
    about:
        'AI developer and community builder creating people-centric technology across generative AI, accessibility, software engineering, and large-scale student innovation programs.',
};

const socials: SocialItem[] = [
    {
        id: 'github',
        url: 'https://github.com/robinfrancis186',
        label: 'GitHub',
        icon: <Github className="h-5 w-5" />,
    },
    {
        id: 'linkedin',
        url: 'https://www.linkedin.com/in/robin-francis-b43565175',
        label: 'LinkedIn',
        icon: <Linkedin className="h-5 w-5" />,
    },
    {
        id: 'instagram',
        url: 'https://www.instagram.com/robinfrancis186',
        label: 'Instagram',
        icon: <Instagram className="h-5 w-5" />,
    },
    {
        id: 'email',
        url: 'mailto:robinfrancis186@gmail.com',
        label: 'Email',
        icon: <Mail className="h-5 w-5" />,
    },
];

const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Robin Francis Profile Card',
    url: 'https://www.robinfrancis.in/card/',
    mainEntity: {
        '@type': 'Person',
        name: 'Robin Francis',
        url: 'https://www.robinfrancis.in/',
        image: 'https://www.robinfrancis.in/images/about/robin-light.webp',
        jobTitle: 'AI Innovator and Community Leader',
        address: {
            '@type': 'PostalAddress',
            addressRegion: 'Kerala',
            addressCountry: 'IN',
        },
        sameAs: [
            'https://github.com/robinfrancis186',
            'https://www.linkedin.com/in/robin-francis-b43565175',
            'https://www.instagram.com/robinfrancis186',
        ],
        knowsAbout: [
            'Generative AI',
            'Software Engineering',
            'Accessibility',
            'Community Leadership',
            'IEEE Student Programs',
        ],
    },
};

const highlights = ['GenAI', 'Accessibility', 'Community', 'Product'];

const CardPage = () => {
    return (
        <>
            <PageSeo
                title="Robin Francis Card | AI Innovator & Community Leader"
                description="A focused digital profile card for Robin Francis, AI innovator, software builder, and community leader from Kerala, India."
                canonical="https://www.robinfrancis.in/card/"
                image="https://www.robinfrancis.in/images/about/robin-light.webp"
                jsonLd={profileJsonLd}
            />

            <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_28rem),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.36))] px-5 pb-20 pt-28 text-foreground dark:bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.22),transparent_28rem),linear-gradient(180deg,hsl(var(--background)),hsl(222_47%_6%))] sm:px-8 lg:px-12">
                <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,390px)] xl:grid-cols-[minmax(0,1fr)_minmax(340px,400px)]">
                    <section className="min-w-0">
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                            <Sparkles className="h-4 w-4" />
                            Digital profile card
                        </div>

                        <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                            Robin Francis
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                            AI developer, community builder, and organizer creating useful technology for real people and high-energy innovation communities.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {highlights.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/#contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-primary/35"
                            >
                                Contact Robin
                                <Mail className="h-4 w-4" />
                            </a>
                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3 text-sm font-bold text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white"
                            >
                                View Projects
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </section>

                    <aside className="mx-auto grid w-full max-w-[26rem] gap-6 lg:mx-0 lg:justify-self-end">
                        <RevealCardContainer
                            accent="#0A84FF"
                            textOnAccent="#ffffff"
                            mutedOnAccent="rgba(255,255,255,0.78)"
                            className="max-w-none"
                            base={
                                <IdentityCardBody
                                    {...profile}
                                    socials={socials}
                                    scheme="plain"
                                    displayAvatar={false}
                                    className="bg-white/75 dark:bg-slate-950/75"
                                    bioClass="text-slate-600 dark:text-slate-300"
                                    descClass="text-slate-500 dark:text-slate-400"
                                />
                            }
                            overlay={
                                <IdentityCardBody
                                    {...profile}
                                    socials={socials}
                                    scheme="accented"
                                    displayAvatar
                                    cardCss={{ backgroundColor: 'var(--accent-color)' }}
                                />
                            }
                        />

                        <GlassmorphismProfileCard
                            avatarUrl="/images/about/robin-dark.webp"
                            name="Robin Francis"
                            title="AI Innovator & Community Leader"
                            bio="Available for meaningful AI, product, accessibility, and community collaborations."
                            socialLinks={[
                                { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/robinfrancis186' },
                                { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/robin-francis-b43565175' },
                                { id: 'instagram', icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/robinfrancis186' },
                            ]}
                            actionButton={{ text: 'Get in touch', href: '/#contact' }}
                        />
                    </aside>
                </div>

                <div className="pointer-events-none absolute bottom-10 left-6 hidden items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 md:flex">
                    <MapPin className="h-4 w-4" />
                    Kerala, India
                </div>
            </main>
        </>
    );
};

export default CardPage;
