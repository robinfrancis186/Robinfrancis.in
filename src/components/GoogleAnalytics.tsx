"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type GoogleAnalyticsProps = {
  gaId: string;
};

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const normalizedGaId = gaId.replace(/\\[rn]/g, "").trim();
  const pathname = usePathname();
  const valid = /^G-[A-Z0-9]+$/i.test(normalizedGaId);

  useEffect(() => {
    if (!valid) return;
    if (!window.__analyticsConfigured) {
      window.dataLayer ??= [];
      window.gtag ??= function () { window.dataLayer!.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", normalizedGaId, {
        send_page_view: false,
        ...(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? { debug_mode: true } : {}),
      });
      window.__analyticsConfigured = true;
      const pending = window.__pendingAnalyticsEvents ?? [];
      window.__pendingAnalyticsEvents = [];
      pending.forEach(({ eventName, params }) => trackEvent(eventName, params));
    }
    if (window.__analyticsPath !== pathname) {
      window.__analyticsPath = pathname;
      trackEvent("page_view", {
        page_location: `${window.location.origin}${pathname}`,
        page_title: document.title,
        ...(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? { debug_mode: true } : {}),
      });
    }
  }, [normalizedGaId, pathname, valid]);

  if (!valid) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(normalizedGaId)}`}
        strategy="lazyOnload"
      />
    </>
  );
}
