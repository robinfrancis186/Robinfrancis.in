const ROBIN_FRANCIS_NAME = /\brobin\s+francis\b/i;

/**
 * Keeps rendered image descriptions useful to people and search engines while
 * adding one natural Robin Francis attribution when the source copy lacks it.
 */
export function ensureRobinFrancisAlt(
  description: string | null | undefined,
  context = "portfolio",
) {
  const normalized = description?.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return `Robin Francis ${context} image`;
  }

  if (ROBIN_FRANCIS_NAME.test(normalized)) {
    return normalized;
  }

  return `${normalized} — Robin Francis ${context}`;
}

export function seoImage(url: string, description: string, context?: string) {
  return {
    url,
    alt: ensureRobinFrancisAlt(description, context),
  };
}
