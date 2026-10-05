"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { SiteSearch } from "@/components/search/SiteSearch";


export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: ReactElement;
    }[];
    className?: string;
}) => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const [visible, setVisible] = useState(true);

    /*
     * Show near the top and whenever the reader scrolls up; step aside on the
     * way down. A plain passive listener and a CSS transition do this without
     * putting the animation library in every page's first bundle.
     */
    useEffect(() => {
        let last = window.scrollY;
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                const y = window.scrollY;
                const max = document.documentElement.scrollHeight - window.innerHeight;
                if (max <= 0 || y / max < 0.05) {
                    setVisible(true);
                } else if (y !== last) {
                    setVisible(y < last);
                }
                last = y;
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
                <div
                    className={cn(
                        "transition-[transform,opacity] duration-200",
                        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-[100px] opacity-0",
                        "flex max-w-fit fixed top-4 inset-x-0 mx-auto glass-panel rounded-full z-[5000] pr-2 pl-6 py-1.5 items-center justify-center space-x-5",
                        className
                    )}
                >
                    {navItems.map((navItem: any, idx: number) => {
                        const isHashLink = navItem.link.startsWith('/#');
                        const hashTarget = navItem.link.replace('/#', '#');

                        return isHomePage && isHashLink ? (
                            <a
                                key={`link=${idx}`}
                                href={hashTarget}
                                aria-label={navItem.name}
                                className={cn(
                                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 cursor-pointer"
                                )}
                            >
                                <span className="block sm:hidden">{navItem.icon}</span>
                                <span className="hidden sm:block text-sm">{navItem.name}</span>
                            </a>
                        ) : (
                            <Link
                                key={`link=${idx}`}
                                href={navItem.link}
                                // The navbar remounts on every scroll-direction change, and each
                                // remount re-fires prefetch for the same routes. These are small
                                // static pages, so skip prefetch rather than refetch them on loop.
                                prefetch={false}
                                aria-label={navItem.name}
                                className={cn(
                                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 cursor-pointer"
                                )}
                            >
                                <span className="block sm:hidden">{navItem.icon}</span>
                                <span className="hidden sm:block text-sm">{navItem.name}</span>
                            </Link>
                        )
                    })}

                    <SiteSearch />

                    {isHomePage ? (
                        <a
                            href="#contact"
                            className="relative inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-full bg-white text-slate-900 border border-slate-300 shadow-sm hover:bg-slate-50 hover:shadow-md transition dark:bg-slate-900 dark:text-white dark:border-slate-600 dark:hover:bg-slate-800"
                        >
                            <span>Contact</span>
                            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                        </a>
                    ) : (
                        <Link
                            href="/#contact"
                            prefetch={false}
                            className="relative inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-full bg-white text-slate-900 border border-slate-300 shadow-sm hover:bg-slate-50 hover:shadow-md transition dark:bg-slate-900 dark:text-white dark:border-slate-600 dark:hover:bg-slate-800"
                        >
                            <span>Contact</span>
                            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                        </Link>
                    )}
                </div>
        </>
    );
};
