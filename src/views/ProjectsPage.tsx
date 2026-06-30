import { useState } from 'react';

import { ArrowUpRight, ArrowRight, ExternalLink, Github, X } from 'lucide-react';
import { motion } from 'framer-motion';
import PageSeo from '@/components/seo/PageSeo';

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState<null | {
        title: string;
        category: string;
        summary: string;
        image: string;
        imageAlt: string;
        repo?: string;
        live?: string;
        images?: { src: string; alt: string; }[];
    }>(null);

    const argusProject = {
        title: 'Argus',
        category: 'AI QA • Browser Agent',
        summary: 'Argus is a local-first autonomous QA agent that scouts a website, understands the product, deploys synthetic user personas, and returns evidence-backed bug reports with screenshots, logs, and run summaries.',
        image: '/images/projects/argus.png',
        imageAlt: 'Argus autonomous QA browser agent launch screen',
        repo: 'https://github.com/robinfrancis186/argus.git',
    };

    const bulkyFiProject = {
        title: 'BulkyFi',
        category: 'Certificates • Local-First Tool',
        summary: 'BulkyFi is a local-first bulk certificate generator for creating professional certificates from templates and recipient spreadsheets. It runs in the browser, stores projects locally, and exports high-quality PDF or PNG certificates without requiring a backend.',
        image: '/images/projects/bulkyfi-landing-v2.png',
        imageAlt: 'BulkyFi landing page for instant bulk certificate generation',
        repo: 'https://github.com/robinfrancis186/bulkyfi',
        live: 'https://bulkyfi.vercel.app/',
        images: [
            {
                src: '/images/projects/bulkyfi-dashboard-v2.png',
                alt: 'BulkyFi certificate batch dashboard with template design and recipient preview',
            },
        ],
    };

    const strideProject = {
        title: 'STRIDE Website',
        category: 'Accessibility • Social Impact',
        summary: 'Developed the official STRIDE website from scratch, creating a modern and accessible platform for an inclusive innovation initiative focused on assistive technology and social impact. The website showcases STRIDE’s mission, ecosystem, product catalog, community stories, news updates, and engagement opportunities, helping users understand and participate in Kerala’s inclusive innovation movement.',
        image: '/images/projects/stride-website.png',
        imageAlt: 'Official STRIDE Kerala website hero page',
        live: 'https://stride.kerala.gov.in/',
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Projects | Robin Francis",
        "description": "Selected AI, product, and web engineering projects by Robin Francis.",
        "url": "https://www.robinfrancis.in/projects/"
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <PageSeo
                title="Projects | Robin Francis"
                description="Explore AI, accessibility, product, and engineering projects built by Robin Francis."
                canonical="https://www.robinfrancis.in/projects/"
                ogDescription="Selected AI, accessibility, product, and web engineering projects by Robin Francis."
                twitterDescription="Selected AI, accessibility, product, and web engineering projects by Robin Francis."
                jsonLd={jsonLd}
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
                        <p className="text-[11px] sm:text-xs tracking-widest text-neutral-500 uppercase font-geist">how i spend my time</p>
                        <h3 className="mt-2 text-2xl sm:text-3xl tracking-tight font-geist font-medium">A few projects I'm proud of.</h3>
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
                                <button type="button" onClick={() => setSelectedProject(argusProject)} className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
                                    <img src={argusProject.image} alt={argusProject.imageAlt} className="h-56 w-full transition-transform duration-500 group-hover:scale-105 object-cover object-top" />
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

                                <button type="button" onClick={() => setSelectedProject(bulkyFiProject)} className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                                    <img src={bulkyFiProject.image} alt={bulkyFiProject.imageAlt} className="h-72 w-full transition-transform duration-500 group-hover:scale-105 object-cover object-top" />
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

                                <a href="#portfolio" className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
                                    <img src="/images/projects/creative_hub.webp" alt="Floating glass interface cards on an iridescent gradient, representing a creative portfolio hub" className="h-48 w-full transition-transform duration-500 group-hover:scale-105 object-cover" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">Portfolio • Website</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">Creative Hub</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">Creative Hub</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">Comprehensive portfolio platform with interactive showcases, client portals, and seamless onboarding flows.</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                                                In Development
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col gap-4 sm:gap-5">
                                <a href="#portfolio" className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
                                    <img src="/images/projects/boltshift.webp" alt="Futuristic product launch webpage mockup with neon motion trails and glowing UI frame" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">Platform • Website</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">Boltshift Launch</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">Boltshift Launch</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">High-conversion landing page for product launch with interactive 3D elements, dynamic pricing, and real-time analytics.</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                                                Live Project
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#portfolio" className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
                                    <img src="/images/projects/fit_tracker.webp" alt="Stacked mobile fitness app screens with activity charts, heart metrics, and progress rings" className="h-56 w-full transition-transform duration-500 group-hover:scale-105 object-cover" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">Mobile • App</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">FitTracker</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">FitTracker</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">Intelligent fitness app with personalized workout plans, real-time activity tracking, and community challenges.</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                                Beta Release
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#portfolio" className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
                                    <img src="/images/projects/dataflow.webp" alt="Isometric analytics dashboard with multi-panel charts, live data streams, and connected network nodes" className="h-56 w-full transition-transform duration-500 group-hover:scale-105 object-cover" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">Data • Visualization</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">DataFlow</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">DataFlow</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">Real-time data visualization platform with live streaming, complex charting, and interactive filtering.</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                                                Live Project
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* Column 3 */}
                            <div className="flex flex-col gap-4 sm:gap-5">
                                <button type="button" onClick={() => setSelectedProject(strideProject)} className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400">
                                    <img src={strideProject.image} alt={strideProject.imageAlt} className="h-72 w-full transition-transform duration-500 group-hover:scale-105 object-cover object-top" />
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

                                <a href="#portfolio" className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
                                    <img src="/images/projects/quotient_rebrand.webp" alt="Brand identity and campaign visuals" className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">Identity • Campaign</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">Quotient Rebrand</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">Quotient Rebrand</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">Complete brand identity redesign with new typography, color palette, and digital brand guidelines.</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                                                Live Project
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a href="#portfolio" className="group relative overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-white dark:bg-slate-900 rounded-3xl shadow-sm">
                                    <img src="/images/projects/taskflow_pro.webp" alt="Neon task management dashboard with columns for to-do, in-progress, and completed work" className="h-56 w-full transition-transform duration-500 group-hover:scale-105 object-cover" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-xs text-white/80 font-geist">Web • Application</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <h4 className="text-base sm:text-lg tracking-tight font-medium text-white font-geist">TaskFlow Pro</h4>
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-900">
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex bg-black/40 pt-6 pr-6 pb-6 pl-6 backdrop-blur-md items-center justify-center">
                                        <div className="transform group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center translate-y-8">
                                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-3">TaskFlow Pro</h3>
                                            <p className="text-sm text-white/90 leading-relaxed mb-4">Real-time task management platform with live cursors, shared workspaces, and conflict-free synchronization.</p>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 text-white text-xs px-3 py-1.5 backdrop-blur-sm">
                                                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                                                Coming Soon
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                    </>
                </div>

                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onClick={() => setSelectedProject(null)}>
                        <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white text-neutral-950 shadow-2xl ring-1 ring-neutral-200 dark:bg-slate-950 dark:text-white dark:ring-neutral-800" onClick={(event) => event.stopPropagation()}>
                            <button type="button" aria-label="Close project summary" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black dark:bg-white/10 dark:hover:bg-white/20">
                                <X className="h-5 w-5" />
                            </button>
                            <img src={selectedProject.image} alt={selectedProject.imageAlt} className="h-64 w-full object-cover object-top sm:h-80" />
                            <div className="p-6 sm:p-8">
                                <p className="text-xs uppercase tracking-[0.24em] text-lime-600 dark:text-lime-400 font-geist">{selectedProject.category}</p>
                                <h2 id="project-detail-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{selectedProject.title}</h2>
                                <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700 dark:text-neutral-300">{selectedProject.summary}</p>
                                {selectedProject.images && selectedProject.images.length > 0 && (
                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        {selectedProject.images.map((image) => (
                                            <img key={image.src} src={image.src} alt={image.alt} className="h-56 w-full rounded-xl object-cover object-top ring-1 ring-neutral-200 dark:ring-neutral-800" />
                                        ))}
                                    </div>
                                )}
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {selectedProject.live && (
                                        <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                                            <ExternalLink className="h-4 w-4" />
                                            Live App
                                        </a>
                                    )}
                                    {selectedProject.repo && (
                                        <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">
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
