import "./SettingsPage.css";
import { Settings2 } from "lucide-react";
import dottedWorldMap from "../assets/illustrations/settings-dot-world.svg";
import { CatalogPreferences } from "../components/settings/CatalogPreferences";
import { SettingsStorageNotice } from "../components/settings/SettingsStorageNotice";
import { StorageSettings } from "../components/settings/StorageSettings";
import { ThemeSettings } from "../components/settings/ThemeSettings";

export function SettingsPage({
    settings,
    onThemeChange,
    onCatalogViewChange,
    onCatalogPageSizeChange,
    onReset,
}) {
    return (
        <main className="page-shell settings-page">
            <img
                className="settings-world-map"
                src={dottedWorldMap}
                alt=""
                aria-hidden="true"
            />
            <header className="settings-page-heading">
                <span>
                    <Settings2 aria-hidden="true" />
                </span>
                <div>
                    <h1>Configuración</h1>
                    <p>
                        Personaliza tu experiencia y la forma de explorar ExploraMundo.
                    </p>
                </div>
            </header>
            <ThemeSettings theme={settings.theme} onThemeChange={onThemeChange} />
            <section className="settings-lower-grid">
                <CatalogPreferences
                    view={settings.catalogView}
                    pageSize={settings.catalogPageSize}
                    onViewChange={onCatalogViewChange}
                    onPageSizeChange={onCatalogPageSizeChange}
                />
                <StorageSettings onReset={onReset} />
            </section>
            <SettingsStorageNotice />
        </main>
    );
}
