import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero'

// Lazy load heavy sections
const About = lazy(() => import('@/components/sections/About'))
const Skills = lazy(() => import('@/components/sections/Skills'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Blog = lazy(() => import('@/components/sections/Blog'))
const FAQ = lazy(() => import('@/components/sections/FAQ'))
const Contact = lazy(() => import('@/components/sections/Contact'))

interface DeferredSectionProps {
    children: ReactNode;
    placeholderClassName?: string;
    rootMargin?: string;
}

const DeferredSection = ({
    children,
    placeholderClassName = "min-h-[40vh]",
    rootMargin = "500px 0px",
}: DeferredSectionProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = containerRef.current;
        if (!node || isVisible) return;

        if (typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [isVisible, rootMargin]);

    return (
        <div ref={containerRef}>
            {isVisible ? (
                <Suspense fallback={<div className={placeholderClassName} />}>
                    {children}
                </Suspense>
            ) : (
                <div className={placeholderClassName} aria-hidden="true" />
            )}
        </div>
    );
};

const Home = () => {
    const pageTitle = 'Robin Francis | AI Innovator & Community Leader';
    const pageDescription =
        'Portfolio of Robin Francis — AI innovator, community leader, and 3× hackathon winner building accessible, people-centric technology and scalable digital solutions.';

    return (
        <main>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <link rel="canonical" href="https://www.robinfrancis.in/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://www.robinfrancis.in/" />
                <meta property="og:image" content="https://www.robinfrancis.in/images/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content="https://www.robinfrancis.in/images/og-image.png" />
            </Helmet>
            <Hero />
            <DeferredSection placeholderClassName="min-h-[48vh]" rootMargin="300px 0px">
                <About />
            </DeferredSection>
            <DeferredSection placeholderClassName="min-h-[32vh]">
                <Skills />
            </DeferredSection>
            <DeferredSection placeholderClassName="min-h-[44vh]">
                <Projects />
            </DeferredSection>
            <DeferredSection placeholderClassName="min-h-[44vh]">
                <Blog />
            </DeferredSection>
            <DeferredSection placeholderClassName="min-h-[28vh]">
                <FAQ />
            </DeferredSection>
            <DeferredSection placeholderClassName="min-h-[40vh]">
                <Contact />
            </DeferredSection>
        </main>
    );
};

export default Home;
