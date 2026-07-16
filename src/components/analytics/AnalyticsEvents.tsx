"use client";

import { useEffect, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

type TrackPageEventProps = {
  eventName: string;
  eventParams?: AnalyticsParams;
};

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: AnalyticsParams;
  children: ReactNode;
};

export function TrackPageEvent({ eventName, eventParams }: TrackPageEventProps) {
  useEffect(() => {
    trackEvent(eventName, eventParams);
  }, [eventName, eventParams]);

  return null;
}

export function TrackedLink({
  eventName,
  eventParams,
  href,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, {
      link_url: typeof href === "string" ? href : undefined,
      ...eventParams,
    });
    onClick?.(event);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
