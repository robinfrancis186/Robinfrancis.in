import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import Hero from '@/components/sections/Hero'

// Lazy load heavy sections
const About = lazy(() => import('@/components/sections/About'))
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
    return (
        <main>
            <Hero />
            <DeferredSection placeholderClassName="min-h-[48vh]" rootMargin="300px 0px">
                <About />
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
