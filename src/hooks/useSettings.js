import { useEffect, useState } from "react";

const STORAGE_KEY = "exploramundo:settings:v1";

export const defaultSettings = {
    theme: "light",
    catalogView: "grid",
    catalogPageSize: 12,
};

function readSettings() {
    try {
        const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
        const theme = ["light", "dark", "system"].includes(stored?.theme)
            ? stored.theme
            : defaultSettings.theme;
        const catalogView = ["grid", "list"].includes(stored?.catalogView)
            ? stored.catalogView
            : defaultSettings.catalogView;
        const catalogPageSize = [12, 24, 48].includes(stored?.catalogPageSize)
            ? stored.catalogPageSize
            : defaultSettings.catalogPageSize;

        return { theme, catalogView, catalogPageSize };
    } catch {
        return defaultSettings;
    }
}

export function useSettings() {
    const [settings, setSettings] = useState(readSettings);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const applyTheme = () => {
            const resolvedTheme =
                settings.theme === "system"
                    ? mediaQuery.matches
                        ? "dark"
                        : "light"
                    : settings.theme;
            document.documentElement.dataset.theme = resolvedTheme;
        };

        applyTheme();
        mediaQuery.addEventListener("change", applyTheme);
        return () => mediaQuery.removeEventListener("change", applyTheme);
    }, [settings.theme]);

    function updateSettings(nextSettings) {
        setSettings((current) => ({ ...current, ...nextSettings }));
    }

    return {
        settings,
        setTheme: (theme) => updateSettings({ theme }),
        setCatalogView: (catalogView) => updateSettings({ catalogView }),
        setCatalogPageSize: (catalogPageSize) => updateSettings({ catalogPageSize }),
        resetSettings: () => setSettings(defaultSettings),
    };
}
