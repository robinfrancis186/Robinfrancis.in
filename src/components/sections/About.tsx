import { TracingBeam } from "@/components/ui/tracing-beam";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/moving-border";
import InteractivePortrait from "@/components/ui/InteractivePortrait";
import { useDomTheme } from "@/hooks/use-dom-theme";

const About = () => {
    const isDarkTheme = useDomTheme();

    const education = [
        {
            year: "2021 – 2025",
            degree: "B.Tech in Computer Science & Engineering",
            institution: "Sahrdaya College of Engineering & Technology",
            description: "First Class | CGPA: 7.17. Focused on AI systems, software engineering, and product development."
        },
        {
            year: "2019 – 2021",
            degree: "Higher Secondary – Computer Science",
            institution: "National Higher Secondary School",
            description: "Secured 96%"
        },
        {
            year: "2019",
            degree: "Secondary School Certificate",
            institution: "Don Bosco High School",
            description: "Secured 100%"
        }
    ];

    const achievements = [
        {
            value: "IEEE R10",
            title: "Outstanding Volunteer Award",
            description: "First student from the Asia-Pacific Region to receive the 2024 honor.",
            image: "/images/blog/ieee-award.webp",
        },
        {
            value: "1st Runner-Up",
            title: "IBM watsonx GenAI Challenge",
            description: "Recognized for building an intelligent GenAI-powered solution.",
            image: "/images/blog/1720937570476.webp",
        },
        {
            value: "3x",
            title: "Hackathon Winner",
            description: "Wins across GenAI, food sustainability, and game development competitions.",
            image: "/images/project-techx.webp",
        },
        {
            value: "450+",
            title: "Participants Led",
            description: "Founded and led a flagship IEEE Computer Society impact event.",
            image: "/images/blog/1720937571684.webp",
        },
        {
            value: "$2.65K+",
            title: "Community Funding",
            description: "Raised for social initiatives, student programs, and community events.",
            image: "/images/blog/people-centric-ai.webp",
        },
        {
            value: "Bronze",
            title: "National Rifle Shooting",
            description: "Medalist in .22 rifle shooting at a national competition in Delhi.",
            image: "/images/blog/scalable-systems.webp",
        }
    ];
    const achievementLoop = [...achievements, ...achievements];

    return (
        <section id="about" className="py-20 bg-background relative overflow-hidden">
            <TracingBeam className="px-6">
                <div className="max-w-3xl mx-auto antialiased pt-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                <InteractivePortrait
                                    baseImage="/images/about/robin-light.webp"
                                    darkImage="/images/about/robin-dark.webp"
                                    alt="Robin Francis — AI developer and community leader, professional portrait"
                                    className="w-full max-w-sm lg:max-w-md mx-auto aspect-[3/4] object-cover"
                                />
                            </div>
                            <div className="w-full md:w-2/3">
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    I am a passionate AI developer, program strategist, and community builder with a strong track record in leading high-impact technical initiatives. My work spans accessible technology, GenAI solutions, student empowerment, and large-scale program execution. I believe in building technology that solves real human problems while uplifting communities through collaboration, mentorship, and creativity.
                                </p>
                                <a href="/images/robin-francis-resume.pdf" download="Robin_Francis_Resume.pdf">
                                    <MovingBorderButton
                                        as="div"
                                        borderRadius="1.75rem"
                                        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                                    >
                                        Download CV
                                    </MovingBorderButton>
                                </a>
                            </div>
                        </div>

                    </motion.div>

                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold">Education</h3>
                        </div>
                        <div className="space-y-8 relative">
                            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-8"
                                >
                                    <div className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/30" />
                                    <span className="text-sm text-primary font-semibold tracking-wide uppercase">{edu.year}</span>
                                    <h4 className="text-xl font-bold mt-1">{edu.degree}</h4>
                                    <p className="text-muted-foreground font-medium">{edu.institution}</p>
                                    <p className="text-muted-foreground mt-2 leading-relaxed">{edu.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </TracingBeam>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mt-8 border-y border-border/70 py-10 text-foreground shadow-sm transition-colors duration-300 dark:border-white/10 dark:text-white md:py-12"
                style={{ backgroundColor: isDarkTheme ? "#070707" : "hsl(var(--card))" }}
            >
                <div className="mb-6 flex items-center gap-4 px-4 md:px-8 lg:px-10">
                    <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-primary">
                        Achievements
                    </span>
                    <span className="h-px flex-1 bg-primary/20" />
                </div>
                <div className="overflow-hidden pl-4 md:pl-8 lg:pl-10">
                    <div className="mj-achieve-track flex w-max gap-8 md:gap-10">
                        {achievementLoop.map((achievement, index) => (
                            <article
                                key={`${achievement.title}-${index}`}
                                aria-hidden={index >= achievements.length}
                                className="group relative flex h-[240px] w-[280px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-border/70 bg-black p-6 shadow-sm transition-all duration-500 hover:border-primary/40 dark:border-white/10 dark:bg-[#111111]/40 md:h-[270px] md:w-[320px] md:p-8"
                            >
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    style={{ background: "radial-gradient(400px circle at 50% 30%, hsl(var(--primary) / 0.08), transparent)" }}
                                />
                                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                                    <img
                                        src={achievement.image}
                                        alt={achievement.title}
                                        className="h-full w-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-40 dark:opacity-20 dark:group-hover:opacity-30"
                                        loading="lazy"
                                    />
                                </div>
                                <span className="relative text-[clamp(1.4rem,3vw,2rem)] font-bold leading-none text-white transition-colors duration-500 group-hover:text-primary">
                                    {achievement.value}
                                </span>
                                <div className="relative mt-2">
                                    <span className="block text-xs font-semibold text-white md:text-sm">
                                        {achievement.title}
                                    </span>
                                    <span className="mt-1 block text-[10px] leading-relaxed text-white/55 md:text-xs">
                                        {achievement.description}
                                    </span>
                                </div>
                                <div className="absolute right-6 top-6 h-10 w-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:right-8 md:top-8">
                                    <div className="absolute right-0 top-0 h-full w-px bg-primary/30" />
                                    <div className="absolute right-0 top-0 h-px w-full bg-primary/30" />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
