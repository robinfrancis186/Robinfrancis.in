import { useEffect, useState } from "react";

const isDocumentDark = () =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");

export const useDomTheme = () => {
    const [isDark, setIsDark] = useState(isDocumentDark);

    useEffect(() => {
        const root = document.documentElement;
        const syncTheme = () => setIsDark(root.classList.contains("dark"));

        syncTheme();
        const observer = new MutationObserver(syncTheme);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return isDark;
};
