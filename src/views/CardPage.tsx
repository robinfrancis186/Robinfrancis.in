import { GlassmorphismProfileCard } from '@/components/ui/profile-card-1';
import { Github, Instagram, Linkedin, BookOpenText } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { homeBreadcrumb } from '@/lib/breadcrumbs';

const CardPage = () => {
    return (
        <main className="relative isolate flex min-h-screen items-start justify-center overflow-hidden bg-slate-50 px-5 pb-14 pt-14 text-foreground dark:bg-black md:items-center md:py-24">
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/[0.08] to-transparent dark:from-primary/[0.16]" />
            <Breadcrumbs
                items={[homeBreadcrumb, { name: 'Card', path: '/card/' }]}
                className="absolute left-5 top-5 z-10 md:left-8 md:top-8"
            />
            <GlassmorphismProfileCard
                avatarUrl="/images/card/robin-francis-primary.jpg"
                name="Robin Francis"
                title="AI Innovator & Community Leader"
                bio="Available for meaningful AI, product, accessibility, and community collaborations."
                imageSlides={[
                    { src: '/images/card/robin-francis-primary.jpg', alt: 'Robin Francis portrait', fit: 'cover', position: '50% 18%' },
                    { src: '/images/card/robin-francis-3d.png', alt: 'Robin Francis 3D figure', fit: 'contain', position: '50% 50%' },
                ]}
                socialLinks={[
                    { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/robinfrancis186' },
                    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/robin-francis-b43565175' },
                    { id: 'instagram', icon: Instagram, label: 'instagram', href: 'https://www.instagram.com/robinfrancis186' },
                    { id: 'medium', icon: BookOpenText, label: 'Medium', href: 'https://medium.com/@robinfrancis186' },
                ]}
                actionButton={{ text: 'Contact Me', href: '/#contact' }}
            />
        </main>
    );
};

export default CardPage;
