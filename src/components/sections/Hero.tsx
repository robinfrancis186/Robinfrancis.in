import Image from "next/image";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";

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

            {/* Social Media Icons - Fixed Left Side (Desktop) */}
            <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-6">
                <a 
                    href="mailto:robinfrancis186@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label="Email Robin Francis"
                >
                    <div className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                        <Mail className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Email Me
                    </span>
                </a>
                
                <a 
                    href="https://www.linkedin.com/in/robin-francis-b43565175" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label="LinkedIn Profile"
                >
                    <div className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                        <Linkedin className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        LinkedIn
                    </span>
                </a>
                
                <a 
                    href="https://github.com/robinfrancis186" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label="GitHub Profile"
                >
                    <div className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                        <Github className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        GitHub
                    </span>
                </a>
                
                <a 
                    href="https://www.instagram.com/robinfrancis186" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label="Instagram Profile"
                >
                    <div className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                        <Instagram className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Instagram
                    </span>
                </a>
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 z-10 relative flex flex-col md:flex-row items-center justify-center h-full gap-8 lg:gap-12">
                
                {/* LEFT SIDE: Intro & CTA */}
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
                    <p className="text-base md:text-lg font-medium text-foreground/80 max-w-[280px] md:max-w-xs leading-relaxed mb-6">
                        I design and build <strong className="text-primary font-bold">AI-powered solutions</strong> that make technology <strong className="text-primary font-bold">accessible</strong>, scalable, and people-centric.
                    </p>
                    <a href="#contact" className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors text-foreground mb-6">
                        LET'S WORK TOGETHER
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    
                    {/* Social Media Icons - Mobile/Tablet */}
                    <div className="flex lg:hidden gap-4 mt-2">
                        <a 
                            href="mailto:robinfrancis186@gmail.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                            aria-label="Email Robin Francis"
                        >
                            <div className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                                <Mail className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
                            </div>
                        </a>
                        
                        <a 
                            href="https://www.linkedin.com/in/robin-francis-b43565175" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                            aria-label="LinkedIn Profile"
                        >
                            <div className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                                <Linkedin className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
                            </div>
                        </a>
                        
                        <a 
                            href="https://github.com/robinfrancis186" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                            aria-label="GitHub Profile"
                        >
                            <div className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                                <Github className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
                            </div>
                        </a>
                        
                        <a 
                            href="https://www.instagram.com/robinfrancis186" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                            aria-label="Instagram Profile"
                        >
                            <div className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                                <Instagram className="w-4 h-4 text-foreground/70 group-hover:text-primary transition-colors" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* CENTER PORTRAIT */}
                <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2 z-20 relative pointer-events-none mt-4 md:mt-0">
                    <Image
                        src="/images/about/robin-light.webp" 
                        alt="Robin Francis, AI Innovator and Software Engineer, professional headshot in formal black shirt" 
                        width={420}
                        height={550}
                        priority
                        sizes="(min-width: 768px) 420px, (min-width: 640px) 320px, 280px"
                        className="w-[280px] sm:w-[320px] md:w-[420px] h-auto object-contain drop-shadow-2xl dark:hidden"
                    />
                    <Image
                        src="/images/about/robin-dark.webp" 
                        alt="Robin Francis, professional portrait with dark background theme" 
                        width={420}
                        height={550}
                        sizes="(min-width: 768px) 420px, (min-width: 640px) 320px, 280px"
                        className="w-[280px] sm:w-[320px] md:w-[420px] h-auto object-contain drop-shadow-2xl hidden dark:block"
                    />
                </div>

                {/* RIGHT SIDE: Services / Skills */}
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right order-3 gap-3 md:gap-4">
                    <div className="text-sm md:text-base lg:text-lg font-medium text-foreground/70 hover:text-foreground transition-colors cursor-default">AI Engineering</div>
                    <div className="text-sm md:text-base lg:text-lg font-bold text-foreground transition-colors cursor-default">Software Engineering</div>
                    <div className="text-sm md:text-base lg:text-lg font-medium text-foreground/70 hover:text-foreground transition-colors cursor-default">Community Building</div>
                    <div className="text-sm md:text-base lg:text-lg font-medium text-foreground/70 hover:text-foreground transition-colors cursor-default">Product Strategy</div>
                </div>
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
