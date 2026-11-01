/**
 * Preserve the description of what is actually pictured, without adding SEO keywords.
 */
export function ensureRobinFrancisAlt(
  description: string | null | undefined,
  context = "portfolio",
) {
  const normalized = description?.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return `Robin Francis ${context} image`;
  }

  return normalized;
}

export function seoImage(url: string, description: string, context?: string) {
  return {
    url,
    alt: ensureRobinFrancisAlt(description, context),
  };
}
