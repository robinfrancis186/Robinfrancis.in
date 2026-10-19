import { stripInlineMarkup } from "./inlineMarkup.ts";

export function blogNarrationText(title: string, text: string) {
    return stripInlineMarkup(`${title}.\n\n${text}`)
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

export function blogNarrationHash(text: string) {
    let hash = 0x811c9dc5;
    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
}
