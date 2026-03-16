import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LottieIcon from '@/components/ui/LottieIcon';

const Hero = () => {
    // Inject Unicorn Studio once for the hero background, heavily deferred to fix TBT
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let cancelled = false;
        let retryInterval: NodeJS.Timeout;
        let retryTimeout: NodeJS.Timeout;

        const tryInit = () => {
            if (cancelled) return false;
            // @ts-ignore - provided by Unicorn script
            const us = window.UnicornStudio;
            if (us?.init && document.querySelector('[data-us-project]')) {
                try {
                    us.init();
                    return true;
                } catch (e) {
                    console.error("Unicorn Studio init error safely caught:", e);
                    return true;
                }
            }
            return false;
        };

        const executeInjection = () => {
            if (cancelled) return;
            
            // Disable heavy WebGL shader compilation on mobile to prevent 7000ms+ TBT penalties
            if (window.innerWidth < 768) return;

            const existingScript = document.querySelector<HTMLScriptElement>('script[data-unicornstudio]');
            if (existingScript) {
                tryInit();
            } else {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
                script.async = true;
                script.dataset.unicornstudio = 'true';
                script.onload = () => tryInit();
                (document.head || document.body).appendChild(script);
            }

            retryInterval = setInterval(() => {
                if (tryInit()) clearInterval(retryInterval);
            }, 500);
            retryTimeout = setTimeout(() => clearInterval(retryInterval), 5000);
        };

        const initDelay = setTimeout(executeInjection, 2500);

        return () => {
            cancelled = true;
            clearTimeout(initDelay);
            if (retryInterval) clearInterval(retryInterval);
            if (retryTimeout) clearTimeout(retryTimeout);
        };
    }, []);

    const skills = [
        { label: 'AI Development', active: false },
        { label: 'Community Leadership', active: true },
        { label: 'Full-Stack Engineering', active: false },
        { label: 'Product Strategy', active: false },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen bg-background overflow-hidden flex flex-col"
        >
            {/* Subtle Unicorn Studio background — desktop only */}
            <div
                data-us-project="cqcLtDwfoHqqRPttBbQE"
                className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-10 hidden md:block"
            />

            {/* SEO-only h1 */}
            <h1 className="sr-only">Robin Francis | AI Innovator, Community Leader, 3× Hackathon Winner</h1>

            {/* ── MAIN EDITORIAL LAYOUT ── */}
            <div className="relative z-10 flex flex-col flex-1 px-6 md:px-12 lg:px-20 pt-24 pb-8">

                {/* ── TOP STATUS BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-6"
                >
                    <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                        * Robin Francis
                    </span>
                    <span className="flex items-center gap-2 text-xs font-medium text-emerald-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Open to work
                    </span>
                </motion.div>

                {/* ── MASSIVE EDITORIAL NAME ── */}
                <div className="relative flex-1 flex flex-col justify-center">
                    <div className="relative">
                        {/* Giant background name text */}
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden="true"
                            className="text-[13vw] md:text-[12vw] font-black leading-none tracking-tighter text-primary select-none"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            ROBIN
                        </motion.h2>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden="true"
                            className="text-[13vw] md:text-[12vw] font-black leading-none tracking-tighter text-foreground select-none -mt-2 md:-mt-4"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            FRANCIS
                        </motion.h2>

                        {/* Portrait overlaid on name — right-center, clipped within section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 right-[8%] md:right-[15%] w-[36vw] max-w-[320px] pointer-events-none select-none"
                            style={{ transform: 'translateY(8%)' }}
                        >
                            <img
                                src="/images/about/robin-light.webp"
                                alt="Robin Francis"
                                width={400}
                                height={533}
                                className="w-full h-auto object-cover dark:hidden"
                                draggable={false}
                            />
                            <img
                                src="/images/about/robin-dark.webp"
                                alt="Robin Francis"
                                width={400}
                                height={533}
                                className="w-full h-auto object-cover hidden dark:block"
                                draggable={false}
                            />
                        </motion.div>
                    </div>

                    {/* ── BOTTOM CONTENT ROW: bio left | skills right ── */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-8 md:mt-6 gap-8 pb-4">

                        {/* LEFT: bio + CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="max-w-xs space-y-5"
                        >
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                                Hey there! I'm an AI Innovator &amp; Community Leader building accessible,
                                people-centric technology and scalable digital solutions.
                            </p>

                            {/* CTA */}
                            <a
                                href="#projects"
                                className="group inline-flex items-center gap-3 text-sm font-bold tracking-wider text-foreground hover:text-primary transition-colors duration-300"
                            >
                                <span className="text-primary opacity-70">{'// '}</span>
                                VIEW MY WORK
                                <span className="group-hover:translate-x-2 transition-transform duration-300 text-primary">→</span>
                            </a>

                            {/* Social icons row */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex items-center gap-3 pt-2"
                            >
                                <a
                                    href="mailto:robinfrancis186@gmail.com"
                                    className="rounded-full p-2 bg-black/5 hover:bg-primary/10 dark:bg-white/10 dark:hover:bg-primary/20 transition-all hover:scale-110 duration-300"
                                    aria-label="Email Robin Francis"
                                >
                                    <LottieIcon animationName="mail" size={22} className="dark:invert" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/robin-francis-b43565175"
                                    target="_blank" rel="noopener noreferrer"
                                    className="rounded-full p-2 bg-black/5 hover:bg-primary/10 dark:bg-white/10 dark:hover:bg-primary/20 transition-all hover:scale-110 duration-300"
                                    aria-label="LinkedIn Profile"
                                >
                                    <LottieIcon animationName="linkedin" size={22} className="dark:invert" />
                                </a>
                                <a
                                    href="https://www.instagram.com/robinfrancis186/"
                                    target="_blank" rel="noopener noreferrer"
                                    className="rounded-full p-2 bg-black/5 hover:bg-primary/10 dark:bg-white/10 dark:hover:bg-primary/20 transition-all hover:scale-110 duration-300"
                                    aria-label="Instagram Profile"
                                >
                                    <LottieIcon animationName="instagram" size={22} className="dark:invert" />
                                </a>
                                <a
                                    href="https://github.com/robinfrancis186"
                                    target="_blank" rel="noopener noreferrer"
                                    className="rounded-full p-2 bg-black/5 hover:bg-primary/10 dark:bg-white/10 dark:hover:bg-primary/20 transition-all hover:scale-110 duration-300"
                                    aria-label="GitHub Profile"
                                >
                                    <LottieIcon animationName="github" size={22} className="dark:invert" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT: Skills list */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col items-start md:items-end gap-2"
                        >
                            {skills.map((skill, i) => (
                                <motion.span
                                    key={skill.label}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                                    className={`text-sm md:text-base transition-all duration-300 ${
                                        skill.active
                                            ? 'text-foreground font-bold text-base md:text-lg'
                                            : 'text-muted-foreground font-normal hover:text-foreground cursor-default'
                                    }`}
                                >
                                    {skill.label}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ── ACHIEVEMENT BADGES (replaces the brand logos row) ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-border/40"
                >
                    {[
                        { icon: '🏆', text: 'IEEE R10 Award' },
                        { icon: '🤖', text: 'IBM watsonx 1st Runner-Up' },
                        { icon: '⚡', text: '3× Hackathon Winner' },
                        { icon: '🌏', text: '450+ Event Participants' },
                    ].map((badge) => (
                        <div key={badge.text} className="flex items-center gap-2 text-muted-foreground group">
                            <span className="text-base">{badge.icon}</span>
                            <span className="text-xs font-medium tracking-wide group-hover:text-foreground transition-colors duration-200">
                                {badge.text}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
