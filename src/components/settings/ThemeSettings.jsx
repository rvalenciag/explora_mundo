import { Check, Monitor, Moon, Sun } from "lucide-react";
import { SettingsSectionHeading } from "./SettingsSectionHeading";

const themes = [
    {
        id: "light",
        label: "Claro",
        description: "Interfaz luminosa y de alto contraste.",
        icon: Sun,
    },
    {
        id: "dark",
        label: "Oscuro",
        description: "Interfaz con tonos oscuros, ideal en entornos con poca luz.",
        icon: Moon,
    },
    {
        id: "system",
        label: "Automático",
        description: "Se adapta al tema de tu sistema operativo.",
        icon: Monitor,
    },
];

function ThemePreview({ theme, selected }) {
    return (
        <div className={`theme-preview ${theme}`} aria-hidden="true">
            <span className="theme-preview-bar">
                <i />
                <i />
                <i />
            </span>
            <span className="theme-preview-title" />
            <span className="theme-preview-action" />
            <div className="theme-preview-cards">
                <i />
                <i />
                <i />
            </div>
            {theme === "system" && <span className="theme-preview-split" />}
            {selected && (
                <span className="theme-preview-check">
                    <Check />
                </span>
            )}
        </div>
    );
}

export function ThemeSettings({ theme, onThemeChange }) {
    return (
        <section className="settings-card settings-theme-card">
            <SettingsSectionHeading
                icon={Monitor}
                title="Apariencia de la aplicación"
                description="Elige el tema con el que deseas navegar por ExploraMundo."
            />
            <div className="theme-options" aria-label="Tema de la aplicación">
                {themes.map(({ id, label, description, icon: Icon }) => {
                    const selected = id === theme;
                    return (
                        <button
                            className={`theme-option ${selected ? "selected" : ""}`}
                            key={id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onThemeChange(id)}
                        >
                            <ThemePreview theme={id} selected={selected} />
                            <span className="theme-option-details">
                                <span className="theme-option-icon">
                                    <Icon aria-hidden="true" />
                                </span>
                                <span>
                                    <strong>{label}</strong>
                                    <small>{description}</small>
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
