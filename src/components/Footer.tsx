import { useEffect, useRef, useState } from "react";
import { WavePath } from "@/components/ui/wave-path";
import LottieIcon from '@/components/ui/LottieIcon';

const Footer = () => {
    const footerRef = useRef<HTMLElement | null>(null);
    const [shouldLoadIcons, setShouldLoadIcons] = useState(false);

    useEffect(() => {
        const node = footerRef.current;
        if (!node || shouldLoadIcons) return;

        if (typeof IntersectionObserver === 'undefined') {
            setShouldLoadIcons(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldLoadIcons(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '250px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [shouldLoadIcons]);

    const iconFallback = <span className="inline-block" style={{ width: 20, height: 20 }} aria-hidden="true" />;

    return (
        <footer ref={footerRef} className="bg-background border-t py-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center opacity-50">
                <WavePath />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-muted-foreground">
                            &copy; 2026 Robin Francis. All rights reserved.
                        </p>
                    </div>

                    <nav className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground md:mb-0">
                        <a href="/achievements/" className="hover:text-primary transition-colors">Achievements</a>
                        <a href="/press-kit/" className="hover:text-primary transition-colors">Press Kit</a>
                    </nav>

                    <div className="flex items-center space-x-6">
                        <a href="mailto:robinfrancis186@gmail.com" className="transition-transform hover:scale-110 duration-300" aria-label="Email Robin Francis">
                            {shouldLoadIcons ? <LottieIcon animationName="mail" size={20} /> : iconFallback}
                        </a>
                        <a href="https://www.linkedin.com/in/robin-francis-b43565175" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110 duration-300" aria-label="LinkedIn Profile">
                            {shouldLoadIcons ? <LottieIcon animationName="linkedin" size={20} /> : iconFallback}
                        </a>
                        <a href="https://github.com/robinfrancis186" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110 duration-300" aria-label="GitHub Profile">
                            {shouldLoadIcons ? <LottieIcon animationName="github" size={20} /> : iconFallback}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
