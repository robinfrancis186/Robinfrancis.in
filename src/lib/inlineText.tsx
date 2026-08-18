import type { ReactNode } from "react";
import { INLINE_MARKUP_PATTERN, getSafeLinkHref } from "@/lib/inlineMarkup";

export { getSafeLinkHref, stripInlineMarkup } from "@/lib/inlineMarkup";

export function renderInlineMarkup(text: string, keyPrefix: string): ReactNode {
    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    INLINE_MARKUP_PATTERN.lastIndex = 0;

    while ((match = INLINE_MARKUP_PATTERN.exec(text)) !== null) {
        const [raw, linkLabel, rawHref, boldText, italicText] = match;

        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }

        if (boldText) {
            nodes.push(
                <strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {boldText}
                </strong>
            );
        } else if (italicText) {
            nodes.push(
                <em key={`${keyPrefix}-italic-${match.index}`}>
                    {italicText}
                </em>
            );
        } else {
            const href = getSafeLinkHref(rawHref);

            if (!href) {
                nodes.push(linkLabel);
            } else {
                const isInternal = href.startsWith("/");
                nodes.push(
                    <a
                        key={`${keyPrefix}-link-${match.index}`}
                        href={href}
                        target={isInternal ? undefined : "_blank"}
                        rel={isInternal ? undefined : "noreferrer noopener"}
                        className="font-medium text-primary hover:underline"
                    >
                        {linkLabel}
                    </a>
                );
            }
        }

        lastIndex = match.index + raw.length;
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }

    return nodes.length > 0 ? nodes : text;
}
