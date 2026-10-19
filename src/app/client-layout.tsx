"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type Lenis from "lenis";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { trackEvent } from "@/lib/analytics";

/*
 * The assistant is the only thing in the shared shell that needs the animation
 * library, so it loads as its own chunk after the page is interactive rather
 * than riding in the first bundle of every route.
 */
const MascotAssistant = dynamic(() => import("@/components/ui/MascotAssistant"), {
  ssr: false,
});

function DeferredMascotAssistant() {
  const [loadAssistant, setLoadAssistant] = useState(false);

  if (loadAssistant) return <MascotAssistant openOnMount />;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[5000] sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => { trackEvent("assistant_open"); setLoadAssistant(true); }}
        aria-label="Ask RoSi, Robin's Super Intelligence"
        aria-haspopup="dialog"
        aria-expanded="false"
        className="pointer-events-auto grid size-14 place-items-center rounded-[42%] bg-gradient-to-br from-cyan-500 to-slate-950 shadow-lg shadow-cyan-950/25 outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-16"
      >
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white shadow-sm" />
          <span className="size-2.5 rounded-full bg-white shadow-sm" />
        </span>
      </button>
    </div>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    const isDark = storedTheme ? storedTheme === "dark" : true;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, []);

    useEffect(() => {
      let lenis: Lenis | null = null;
      let animationFrameId = 0;
      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      // ?nolenis=1 hands scrolling back to the browser, because smooth scroll swallows
      // programmatic and keyboard scrolling, which blocks automated checks.
      const smoothScrollDisabled =
        new URLSearchParams(window.location.search).get("nolenis") === "1";
      const mobileOrTouch = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

      if (reducedMotionQuery.matches || smoothScrollDisabled || mobileOrTouch) {
        return undefined;
      }

      let cancelled = false;

      const initTimer = window.setTimeout(async () => {
      // Smooth scroll is a nicety that starts 1.5s in, so its code can too.
      const { default: LenisScroll } = await import("lenis");
      if (cancelled) return;

      lenis = new LenisScroll({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis?.raf(time);
        animationFrameId = window.requestAnimationFrame(raf);
      }

      animationFrameId = window.requestAnimationFrame(raf);
    }, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(initTimer);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      lenis?.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <div className="fixed right-4 top-[4.5rem] z-[5001] md:top-4">
          <ThemeToggle />
        </div>
        <Navbar />
        {children}
        <Footer />
        <DeferredMascotAssistant />
      </div>
    </ErrorBoundary>
  );
}
