export const INLINE_MARKUP_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function getSafeLinkHref(href: unknown) {
    const value = typeof href === "string" ? href.trim() : "";

    if (!value) {
        return null;
    }

    if (value.startsWith("/") && !value.startsWith("//")) {
        return value;
    }

    try {
        const url = new URL(value);
        return ["https:", "mailto:", "tel:"].includes(url.protocol) ? value : null;
    } catch {
        return null;
    }
}

export function stripInlineMarkup(text: string) {
    return text.replace(INLINE_MARKUP_PATTERN, (_match, linkLabel, _href, boldText, italicText) => linkLabel ?? boldText ?? italicText ?? "");
}
