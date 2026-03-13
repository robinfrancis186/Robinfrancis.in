import { Suspense, lazy, useState, useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

// Lazy load heavy sections
const Skills = lazy(() => import('@/components/sections/Skills'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Blog = lazy(() => import('@/components/sections/Blog'))
const Contact = lazy(() => import('@/components/sections/Contact'))

const Home = () => {
    // Defer rendering below-the-fold content to free up main thread for LCP/FCP
    const [renderBelowFold, setRenderBelowFold] = useState(false);

    useEffect(() => {
        // Mount below-the-fold sections after the critical initial paint
        const timer = setTimeout(() => {
            setRenderBelowFold(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main>
            <Hero />
            <About />
            {renderBelowFold ? (
                <Suspense fallback={<div className="min-h-[50vh]" />}>
                    <Skills />
                    <Projects />
                    <Blog />
                    <Contact />
                </Suspense>
            ) : (
                <div className="min-h-screen" />
            )}
        </main>
    );
};

export default Home;
