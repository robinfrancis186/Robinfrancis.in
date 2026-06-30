"use client";

import { useEffect, type ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "lenis";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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

    const initTimer = window.setTimeout(() => {
      lenis = new Lenis({
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
      window.clearTimeout(initTimer);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      lenis?.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
          <div className="fixed right-4 top-4 z-[5001]">
            <ThemeToggle />
          </div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
