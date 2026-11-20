import { Grid2X2, List } from "lucide-react";
import { SettingsSectionHeading } from "./SettingsSectionHeading";

export function CatalogPreferences({ view, pageSize, onViewChange, onPageSizeChange }) {
    return (
        <section className="settings-card catalog-preferences-card">
            <SettingsSectionHeading
                icon={Grid2X2}
                title="Preferencias del catálogo"
                description="Configura cómo se mostrará el catálogo de países."
            />
            <div className="settings-preference-group">
                <h3>Visualización predeterminada</h3>
                <div className="settings-choice-row">
                    <button
                        className={view === "grid" ? "selected" : ""}
                        type="button"
                        onClick={() => onViewChange("grid")}
                    >
                        <Grid2X2 aria-hidden="true" /> Cuadrícula
                    </button>
                    <button
                        className={view === "list" ? "selected" : ""}
                        type="button"
                        onClick={() => onViewChange("list")}
                    >
                        <List aria-hidden="true" /> Lista compacta
                    </button>
                </div>
            </div>
            <div className="settings-preference-group page-size-preferences">
                <h3>Países por página</h3>
                <p>Cantidad de países que se mostrarán en cada página.</p>
                <div className="settings-page-size-options">
                    {[12, 24, 48].map((option) => (
                        <button
                            className={pageSize === option ? "selected" : ""}
                            key={option}
                            type="button"
                            onClick={() => onPageSizeChange(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
