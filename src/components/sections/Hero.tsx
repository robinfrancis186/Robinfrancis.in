import { easeOut, motion } from 'framer-motion';
import LottieIcon from '@/components/ui/LottieIcon';

const Hero = () => {
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
            {/* Subtle dotted background matching the editorial style */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />

            {/* SEO-only h1 */}
            <h1 className="sr-only">Robin Francis | AI Innovator, Community Leader, 3× Hackathon Winner</h1>

            {/* ── MAIN EDITORIAL LAYOUT ── */}
            <div className="relative z-10 flex flex-col flex-1 px-6 md:px-12 lg:px-20 pt-24 pb-8">

                {/* ── TOP STATUS BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-2 md:mb-6"
                >
                    <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                        * Robin Francis
                    </span>
                    <span className="flex items-center gap-2 text-xs font-medium text-emerald-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Open to work
                    </span>
                </motion.div>

                {/* ── MASSIVE EDITORIAL NAME & PORTRAIT ── */}
                <div className="relative flex-1 flex flex-col items-center justify-center mt-2 md:mt-4 mb-12 md:mb-0">
                    
                    {/* Giant background name text - Pushed higher up */}
                    <div className="absolute top-[10%] md:top-[18%] z-0 flex flex-col items-center w-full px-2">
                        <div className="flex items-center justify-center gap-x-3 md:gap-x-5 lg:gap-x-8 leading-[0.85] whitespace-nowrap">
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                aria-hidden="true"
                                className="text-[16vw] md:text-[10vw] font-black tracking-tighter text-primary select-none"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                ROBIN
                            </motion.h2>
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                                aria-hidden="true"
                                className="text-[16vw] md:text-[10vw] font-black tracking-tighter text-foreground select-none"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                FRANCIS
                            </motion.h2>
                        </div>
                    </div>

                    {/* Portrait overlaid on name — perfectly centered horizontally */}
                    <motion.div
                        initial={{ opacity: 0, y: "30%", x: "-50%" }}
                        animate={{ opacity: 1, y: "0%", x: "-50%" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-1/2 w-[75vw] md:w-[45vw] max-w-[480px] pointer-events-none select-none z-10"
                    >
                        <div className="relative w-full h-full">
                            <img
                                src="/images/about/robin-light.webp"
                                alt="Robin Francis"
                                width={480}
                                height={640}
                                className="w-full h-auto object-cover dark:hidden drop-shadow-2xl"
                                draggable={false}
                            />
                            <img
                                src="/images/about/robin-dark.webp"
                                alt="Robin Francis"
                                width={480}
                                height={640}
                                className="w-full h-auto object-cover hidden dark:block drop-shadow-2xl"
                                draggable={false}
                            />
                            {/* Fade out bottom to blend smoothly into the space below */}
                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent" />
                        </div>
                    </motion.div>

                    {/* ── BIO & SKILLS (Absolute Left & Right on Desktop) ── */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start md:absolute md:top-[65%] md:-translate-y-1/2 z-20 pointer-events-none mt-[260px] md:mt-0 gap-8 px-2 md:px-0">

                        {/* LEFT: bio + CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="w-full md:w-[32%] max-w-sm space-y-5 pointer-events-auto text-center md:text-left"
                        >
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                                Hey there! I'm an AI Innovator &amp; Community Leader building accessible,
                                people-centric technology and scalable digital solutions.
                            </p>

                            {/* CTA */}
                            <div className="flex justify-center md:justify-start">
                                <a
                                    href="#projects"
                                    className="group inline-flex items-center gap-3 text-sm font-bold tracking-wider text-foreground hover:text-primary transition-colors duration-300"
                                >
                                    <span className="text-primary opacity-70">{'// '}</span>
                                    VIEW MY WORK
                                    <span className="group-hover:translate-x-2 transition-transform duration-300 text-primary">→</span>
                                </a>
                            </div>

                            {/* Social icons row */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex items-center justify-center md:justify-start gap-3 pt-2"
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
                            className="w-full md:w-[32%] flex flex-col items-center md:items-end gap-2 pointer-events-auto"
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
