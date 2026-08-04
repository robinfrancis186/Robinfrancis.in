"use client";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type PendingAnalyticsEvent = {
  eventName: string;
  params?: AnalyticsParams;
};

type Gtag = (
  command: "event",
  eventName: string,
  params?: AnalyticsParams,
) => void;

const gaId = process.env.NEXT_PUBLIC_GA_ID?.replace(/\\[rn]/g, "").trim();
const hasValidGaId = Boolean(gaId && /^G-[A-Z0-9]+$/i.test(gaId));

declare global {
  interface Window {
    gtag?: Gtag;
    __pendingAnalyticsEvents?: PendingAnalyticsEvent[];
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
    window.__pendingAnalyticsEvents.push({ eventName, params });
  }
}
