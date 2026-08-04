import Script from "next/script";

type GoogleAnalyticsProps = {
  gaId: string;
};

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const normalizedGaId = gaId.replace(/\\[rn]/g, "").trim();

  if (!/^G-[A-Z0-9]+$/i.test(normalizedGaId)) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(normalizedGaId)}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', ${JSON.stringify(normalizedGaId)});

          var pendingAnalyticsEvents = window.__pendingAnalyticsEvents || [];
          window.__pendingAnalyticsEvents = [];
          pendingAnalyticsEvents.forEach(function(pendingEvent) {
            window.gtag('event', pendingEvent.eventName, pendingEvent.params);
          });
        `}
      </Script>
    </>
  );
}
