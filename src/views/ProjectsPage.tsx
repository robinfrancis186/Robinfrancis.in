import { useState } from 'react';

import Image from 'next/image';
import { ArrowUpRight, ArrowRight, ExternalLink, Github, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { homeBreadcrumb } from '@/lib/breadcrumbs';
import { trackEvent } from '@/lib/analytics';
import { ensureRobinFrancisAlt } from '@/lib/imageSeo';

type ProjectDetail = {
    title: string;
    category: string;
    summary: string;
    image: string;
    imageAlt: string;
    repo?: string;
    live?: string;
    images?: { src: string; alt: string; }[];
};

function ProjectImage({ src, alt, className, priority = false }: { src: string; alt: string; className: string; priority?: boolean }) {
    return (
        <Image
            src={src}
            alt={ensureRobinFrancisAlt(alt, 'project')}
            width={900}
            height={560}
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={className}
        />
    );
}

type FeaturedProject = {
    title: string;
    category: string;
    summary: string;
    image: string;
    imageAlt: string;
    accent?: string;
};

const ACCENT_DOT: Record<string, string> = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    violet: "bg-violet-400",
    sky: "bg-sky-400",
};

/**
 * One project tile. The page previously repeated this markup per card, which
 * is why adding an entry meant copying 25 lines and why a half-edited copy
 * could render as an empty bordered box.
 */
const ProjectCard = ({
    project,
    onOpen,
    imageClassName = "h-56",
    priority = false,
}: {
    project: FeaturedProject;
    onOpen: () => void;
    imageClassName?: string;
    priority?: boolean;
}) => (
    <button
        type="button"
        onClick={onOpen}
        className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
        <ProjectImage
            src={project.image}
            alt={project.imageAlt}
            priority={priority}
            className={`${imageClassName} w-full transition-transform duration-500 group-hover:scale-105 object-cover object-top`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-xs text-white/80 font-geist">{project.category}</p>
            <div className="mt-1 flex items-center justify-between">
                <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">
                    {project.title}
                </h4>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                    <ArrowRight className="h-4 w-4" />
                </span>
            </div>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 p-6 backdrop-blur-md items-center justify-center">
            <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">
                    {project.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed mb-4 line-clamp-5">
                    {project.summary}
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                    <span className={`h-2 w-2 rounded-full ${ACCENT_DOT[project.accent ?? ""] ?? "bg-primary"}`} />
                    View Summary
                </div>
            </div>
        </div>
    </button>
);

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState<null | ProjectDetail>(null);

    const openProject = (project: ProjectDetail) => {
        trackEvent('project_summary_open', {
            project_name: project.title,
            project_category: project.category,
        });
        setSelectedProject(project);
    };

    const trackProjectOutbound = (project: ProjectDetail, destination: 'live' | 'github') => {
        const linkUrl = destination === 'live' ? project.live : project.repo;

        trackEvent('project_outbound_click', {
            project_name: project.title,
            destination_type: destination === 'live' ? 'live_demo' : 'repository',
            link_text: destination === 'live' ? 'Live App' : 'GitHub Repository',
            link_location: 'projects_modal',
            link_url: linkUrl,
        });
    };

    const argusProject = {
        title: 'Argus',
        category: 'AI QA • Browser Agent',
        summary: 'Argus is a local-first autonomous QA agent that scouts a website, understands the product, deploys synthetic user personas, and returns evidence-backed bug reports with screenshots, logs, and run summaries.',
        image: '/images/projects/argus.webp',
        imageAlt: 'Argus autonomous QA browser agent launch screen',
        repo: 'https://github.com/robinfrancis186/argus.git',
    };

    const bulkyFiProject = {
        title: 'BulkyFi',
        category: 'Certificates • Local-First Tool',
        summary: 'BulkyFi is a local-first bulk certificate generator for creating professional certificates from templates and recipient spreadsheets. It runs in the browser, stores projects locally, and exports high-quality PDF or PNG certificates without requiring a backend.',
        image: '/images/projects/bulkyfi-landing-v2.webp',
        imageAlt: 'BulkyFi landing page for instant bulk certificate generation',
        repo: 'https://github.com/robinfrancis186/bulkyfi',
        live: 'https://bulkyfi.vercel.app/',
        images: [
            {
                src: '/images/projects/bulkyfi-dashboard-v2.webp',
                alt: 'BulkyFi certificate batch dashboard with template design and recipient preview',
            },
        ],
    };

    /*
     * Real, source-backed work that previously only appeared on the homepage
     * grid. Each one has an accent so the cards keep the page's colour rhythm.
     */
    const soulSyncProject = {
        title: 'SoulSync',
        category: 'AI Companion • Cognitive Wellness',
        summary: 'An AI companion for emotional and cognitive wellness, built for the silver economy. It combines emotion tracking, memory recall, and privacy-conscious caregiver support, with models tuned to run on-device so personal context never leaves the phone. Team Bits & Bytes took second prize with it at the IBM watsonx GenAI Challenge.',
        image: '/images/project-soulsync.webp',
        imageAlt: 'SoulSync AI companion dashboard showing emotion tracking and memory recall',
        accent: 'emerald',
        live: 'https://robinfrancis.in/blog/soulsync-emotional-wellness/',
    };

    const foodLoopProject = {
        title: 'FoodLoop',
        category: 'Sustainability • Machine Learning',
        summary: 'A food redistribution platform that uses machine-learning surplus prediction to cut waste and route edible surplus to the people who need it, turning an operations problem into a forecasting one.',
        image: '/images/project-foodloop.webp',
        imageAlt: 'FoodLoop food redistribution platform interface with surplus prediction charts',
        accent: 'amber',
    };

    const techXProject = {
        title: 'TechX Infinia',
        category: 'Flagship Event • Leadership',
        summary: 'An emerging-technology festival founded and led for more than 450 participants, spanning talks, an expo, and school outreach. Built the programme, the partner roster, and the volunteer structure that ran it.',
        image: '/images/gallery/gallery-techx-infinia-audience.webp',
        imageAlt: 'TechX Infinia audience holding up lit phone torches during the flagship event',
        accent: 'violet',
    };

    const careerFairProject = {
        title: 'IEEE R10 Career Fair',
        category: 'Global Community • Programme Design',
        summary: "Co-led IEEE Region 10's first international Virtual Career Fair, connecting 245 registrants with 31 global recruiters across 2,578 booth visits and 310 applications.",
        image: '/images/blog/ieee-career-fair-2025/ieee-career-fair-2025-participation-outcomes.webp',
        imageAlt: 'IEEE Region 10 Virtual Career Fair 2025 outcomes: 245 registrations, 31 recruiters, 2,578 booth visits, 310 applications',
        accent: 'sky',
        live: 'https://robinfrancis.in/blog/ieee-region-10-international-virtual-career-fair-2025/',
    };

    const strideProject = {
        title: 'STRIDE Website',
        category: 'Accessibility • Social Impact',
        summary: 'Developed the official STRIDE website from scratch, creating a modern and accessible platform for an inclusive innovation initiative focused on assistive technology and social impact. The website showcases STRIDE’s mission, ecosystem, product catalog, community stories, news updates, and engagement opportunities, helping users understand and participate in Kerala’s inclusive innovation movement.',
        image: '/images/projects/stride-website.webp',
        imageAlt: 'Official STRIDE Kerala website hero page',
        live: 'https://stride.kerala.gov.in/',
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <Breadcrumbs
                items={[homeBreadcrumb, { name: 'Projects', path: '/projects/' }]}
                className="mb-8"
            />
            <motion.section
                id="portfolio"
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex sm:mb-8 mb-6 items-end justify-between">
                    <div className="">
                        <p className="text-[11px] sm:text-xs tracking-widest text-muted-foreground uppercase font-geist">how i spend my time</p>
                        <h1 className="mt-2 text-2xl sm:text-3xl tracking-tight font-geist font-medium">A few projects I'm proud of.</h1>
                    </div>
                    <a href="/#projects" className="hidden sm:inline-flex items-center gap-2 ring-1 ring-neutral-200 hover:shadow text-sm text-neutral-700 font-geist bg-white rounded-full pt-2 pr-4 pb-2 pl-4 dark:bg-slate-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-slate-800 transition-colors">
                        View Portfolio
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    <>
                        {/* Column 1 */}
                            <div className="flex flex-col gap-4 sm:gap-5">
                                <button type="button" onClick={() => openProject(argusProject)} className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
                                    <ProjectImage src={argusProject.image} alt={argusProject.imageAlt} priority className="h-56 w-full transition-transform duration-500 group-hover:scale-105 object-cover object-top" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">{argusProject.category}</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">{argusProject.title}</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">{argusProject.title}</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">{argusProject.summary}</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-lime-400"></span>
                                                View Summary
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <ProjectCard project={soulSyncProject} onOpen={() => openProject(soulSyncProject)} imageClassName="h-56" />

                                <button type="button" onClick={() => openProject(bulkyFiProject)} className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                                    <ProjectImage src={bulkyFiProject.image} alt={bulkyFiProject.imageAlt} priority className="h-72 w-full transition-transform duration-500 group-hover:scale-105 object-cover object-top" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">{bulkyFiProject.category}</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">{bulkyFiProject.title}</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">{bulkyFiProject.title}</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">{bulkyFiProject.summary}</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                                View Summary
                                            </div>
                                        </div>
                                    </div>
                                </button>

                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col gap-4 sm:gap-5">

                                <ProjectCard project={foodLoopProject} onOpen={() => openProject(foodLoopProject)} imageClassName="h-56" />

                                <ProjectCard project={techXProject} onOpen={() => openProject(techXProject)} imageClassName="h-64" />

                                
                            </div>

                            {/* Column 3 */}
                            <div className="flex flex-col gap-4 sm:gap-5">
                                <button type="button" onClick={() => openProject(strideProject)} className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400">
                                    <ProjectImage src={strideProject.image} alt={strideProject.imageAlt} className="h-72 w-full transition-transform duration-500 group-hover:scale-105 object-cover object-top" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">{strideProject.category}</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">{strideProject.title}</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">{strideProject.title}</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">{strideProject.summary}</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-fuchsia-400"></span>
                                                View Summary
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <ProjectCard project={careerFairProject} onOpen={() => openProject(careerFairProject)} imageClassName="h-56" />

                                
                            </div>
                    </>
                </div>

                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onClick={() => setSelectedProject(null)}>
                        <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white text-neutral-950 shadow-2xl ring-1 ring-neutral-200 dark:bg-slate-950 dark:text-white dark:ring-neutral-800" onClick={(event) => event.stopPropagation()}>
                            <button type="button" aria-label="Close project summary" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black dark:bg-white/10 dark:hover:bg-white/20">
                                <X className="h-5 w-5" />
                            </button>
                            <ProjectImage src={selectedProject.image} alt={selectedProject.imageAlt} className="h-64 w-full object-cover object-top sm:h-80" />
                            <div className="p-6 sm:p-8">
                                <p className="text-xs uppercase tracking-[0.24em] text-lime-600 dark:text-lime-400 font-geist">{selectedProject.category}</p>
                                <h2 id="project-detail-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{selectedProject.title}</h2>
                                <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-300">{selectedProject.summary}</p>
                                {selectedProject.images && selectedProject.images.length > 0 && (
                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        {selectedProject.images.map((image) => (
                                            <ProjectImage key={image.src} src={image.src} alt={image.alt} className="h-56 w-full rounded-xl object-cover object-top ring-1 ring-neutral-200 dark:ring-neutral-800" />
                                        ))}
                                    </div>
                                )}
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {selectedProject.live && (
                                        <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" onClick={() => trackProjectOutbound(selectedProject, 'live')} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                                            <ExternalLink className="h-4 w-4" />
                                            Live App
                                        </a>
                                    )}
                                    {selectedProject.repo && (
                                        <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" onClick={() => trackProjectOutbound(selectedProject, 'github')} className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">
                                            <Github className="h-4 w-4" />
                                            GitHub Repository
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 sm:mt-10 flex justify-center">
                    <a href="/#projects" className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900 ring-1 ring-neutral-200 dark:ring-neutral-700 px-5 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:shadow dark:hover:bg-slate-800 transition-colors font-geist">
                        View All Work
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                </div>
            </motion.section>
        </main>
    );
};

export default ProjectsPage;
