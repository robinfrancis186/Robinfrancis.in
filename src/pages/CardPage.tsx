import PageSeo from '@/components/seo/PageSeo';
import { GlassmorphismProfileCard } from '@/components/ui/profile-card-1';
import { Github, Instagram, Linkedin, BookOpenText } from 'lucide-react';

const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Robin Francis Profile Card',
    url: 'https://www.robinfrancis.in/card/',
    mainEntity: {
        '@type': 'Person',
        name: 'Robin Francis',
        url: 'https://www.robinfrancis.in/',
        jobTitle: 'AI Innovator and Community Leader',
        sameAs: [
            'https://github.com/robinfrancis186',
            'https://www.linkedin.com/in/robin-francis-b43565175',
            'https://www.instagram.com/robinfrancis186',
            'https://medium.com/@robinfrancis186',
        ],
    },
};

const CardPage = () => {
    return (
        <>
            <PageSeo
                title="Robin Francis Card | AI Innovator & Community Leader"
                description="Robin Francis is an AI innovator and community leader available for meaningful AI, product, accessibility, and community collaborations."
                canonical="https://www.robinfrancis.in/card/"
                jsonLd={profileJsonLd}
            />

            <main className="flex min-h-screen items-center justify-center bg-background px-5 py-24 text-foreground">
                <GlassmorphismProfileCard
                    avatarUrl="/images/about/robin-dark.webp"
                    name="Robin Francis"
                    title="AI Innovator & Community Leader"
                    bio="Available for meaningful AI, product, accessibility, and community collaborations."
                    socialLinks={[
                        { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/robinfrancis186' },
                        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/robin-francis-b43565175' },
                        { id: 'instagram', icon: Instagram, label: 'instagram', href: 'https://www.instagram.com/robinfrancis186' },
                        { id: 'medium', icon: BookOpenText, label: 'Medium', href: 'https://medium.com/@robinfrancis186' },
                    ]}
                    actionButton={{ text: 'Contact Me', href: '/#contact' }}
                />
            </main>
        </>
    );
};

export default CardPage;
