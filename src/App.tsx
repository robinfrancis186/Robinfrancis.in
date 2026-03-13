import { useEffect, useState, Suspense, lazy } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import Lenis from 'lenis'

// Lazy load heavy page components
const Home = lazy(() => import('./pages/Home'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let lenis: Lenis | null = null;
        let animationFrameId: number;

        // Defer Lenis initialization to free up main thread during initial load (Improves FCP & TBT)
        const initTimer = setTimeout(() => {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            function raf(time: number) {
                if (lenis) {
                    lenis.raf(time);
                }
                animationFrameId = requestAnimationFrame(raf);
            }

            animationFrameId = requestAnimationFrame(raf);
        }, 1500);

        return () => {
            clearTimeout(initTimer);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (lenis) {
                lenis.destroy();
            }
        };
    }, []);

    return (
        <Router>
            {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <div className="fixed top-4 right-4 z-[5001]">
                    <ThemeToggle />
                </div>
                <Navbar />

                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:id" element={<BlogPostPage />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                    </Routes>
                </Suspense>

                <Footer />
            </div>
        </Router>
    )
}

export default App

