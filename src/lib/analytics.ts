"use client";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type PendingAnalyticsEvent = {
  eventName: string;
  params?: AnalyticsParams;
};

type Gtag = (...args: unknown[]) => void;

const gaId = process.env.NEXT_PUBLIC_GA_ID?.replace(/\\[rn]/g, "").trim();
const hasValidGaId = Boolean(gaId && /^G-[A-Z0-9]+$/i.test(gaId));

declare global {
  interface Window {
    gtag?: Gtag;
    __pendingAnalyticsEvents?: PendingAnalyticsEvent[];
    dataLayer?: unknown[];
    __analyticsPath?: string;
    __analyticsConfigured?: boolean;
  }
}

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return;
  }

  if (hasValidGaId) {
    window.__pendingAnalyticsEvents ??= [];
    if (window.__pendingAnalyticsEvents.length >= 100) window.__pendingAnalyticsEvents.shift();
    window.__pendingAnalyticsEvents.push({ eventName, params });
  }
}
