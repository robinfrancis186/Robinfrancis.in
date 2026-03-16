import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-20 bg-background"
        >
            {/* Base background to respect light/dark theme */}
            <div className="absolute inset-0 z-0 bg-background" />

            {/* The Huge Background Text */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden h-full">
                <h1 className="text-[17vw] xl:text-[18vw] font-black text-slate-100 dark:text-slate-900/40 leading-[0.80] tracking-tighter text-center whitespace-nowrap opacity-90 mix-blend-multiply dark:mix-blend-normal mt-12 md:mt-0">
                    ROBIN<br />FRANCIS
                </h1>
            </div>

            {/* The Dotted / Glow Matrix behind the person */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none mt-12 md:mt-0">
                <div className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] opacity-20 dark:opacity-10" style={{
                    backgroundImage: 'radial-gradient(var(--primary) 2px, transparent 2px)',
                    backgroundSize: '24px 24px',
                    maskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)'
                }} />
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 z-10 relative flex flex-col md:flex-row items-center justify-center h-full gap-8 lg:gap-12">
                
                {/* LEFT SIDE: Intro & CTA */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1"
                >
                    <p className="text-base md:text-lg font-medium text-foreground/80 max-w-[280px] md:max-w-xs leading-relaxed mb-6">
                        Hey there! I'm an <strong className="text-primary font-bold">AI Innovator</strong> & <strong className="text-primary font-bold">Community Leader</strong> working to build scalable digital solutions.
                    </p>
                    <a href="#contact" className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors text-foreground">
                        // HIRE ME 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>

                {/* CENTER PORTRAIT */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/3 flex justify-center order-1 md:order-2 z-20 relative pointer-events-none mt-4 md:mt-0"
                >
                    <img 
                        src="/images/about/robin-light.webp" 
                        alt="Robin Francis Portrait" 
                        className="w-[280px] sm:w-[320px] md:w-[420px] h-auto object-contain drop-shadow-2xl dark:hidden"
                        fetchPriority="high"
                    />
                    <img 
                        src="/images/about/robin-dark.webp" 
                        alt="Robin Francis Portrait" 
                        className="w-[280px] sm:w-[320px] md:w-[420px] h-auto object-contain drop-shadow-2xl hidden dark:block"
                        fetchPriority="high"
                    />
                </motion.div>

                {/* RIGHT SIDE: Services / Skills */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right order-3 gap-3 md:gap-4"
                >
                    <div className="text-sm md:text-base lg:text-lg font-medium text-foreground/40 hover:text-foreground transition-colors cursor-default">AI Engineering</div>
                    <div className="text-sm md:text-base lg:text-lg font-bold text-foreground transition-colors cursor-default">Software Engineering</div>
                    <div className="text-sm md:text-base lg:text-lg font-medium text-foreground/40 hover:text-foreground transition-colors cursor-default">Community Building</div>
                    <div className="text-sm md:text-base lg:text-lg font-medium text-foreground/40 hover:text-foreground transition-colors cursor-default">Product Strategy</div>
                </motion.div>
            </div>

            {/* BOTTOM MARQUEE / LOGOS */}
            <div className="absolute bottom-0 left-0 w-full border-t border-border/10 bg-background/50 backdrop-blur-md py-4 overflow-hidden flex items-center z-20">
                <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused] group cursor-default">
                    {/* First strip */}
                    <div className="flex items-center justify-around min-w-full gap-8 sm:gap-16 px-4 sm:px-8 text-foreground/60 font-semibold tracking-wider text-xs md:text-sm uppercase">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> GenAI Solutions</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> 3x Hackathon Winner</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> Scalable Architectures</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> Accessible Tech</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> IBM Watsonx</span>
                    </div>
                    {/* Duplicate strip for seamless loop */}
                    <div className="flex items-center justify-around min-w-full gap-8 sm:gap-16 px-4 sm:px-8 text-foreground/60 font-semibold tracking-wider text-xs md:text-sm uppercase" aria-hidden="true">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> GenAI Solutions</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> 3x Hackathon Winner</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> Scalable Architectures</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> Accessible Tech</span>
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300"><span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span> IBM Watsonx</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
