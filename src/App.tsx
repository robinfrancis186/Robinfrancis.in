import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import GalleryPage from './pages/GalleryPage'
import Footer from './components/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import Lenis from 'lenis'

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])



    return (
        <Router>
            {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <div className="fixed top-4 right-4 z-[5001]">
                    <ThemeToggle />
                </div>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    )
}

export default App

