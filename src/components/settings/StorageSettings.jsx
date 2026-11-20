import { Check, Database, RotateCcw } from "lucide-react";
import { SettingsSectionHeading } from "./SettingsSectionHeading";

export function StorageSettings({ onReset }) {
    return (
        <section className="settings-card storage-settings-card">
            <SettingsSectionHeading
                icon={Database}
                title="Datos y almacenamiento"
                description="Gestiona tus preferencias y configuración local."
            />
            <article className="storage-status">
                <Database aria-hidden="true" />
                <div>
                    <h3>Almacenamiento local</h3>
                    <p>
                        El tema, la vista del catálogo y la paginación se guardan en
                        este navegador.
                    </p>
                </div>
                <span>
                    <Check aria-hidden="true" />
                </span>
            </article>
            <button className="settings-reset-button" type="button" onClick={onReset}>
                <RotateCcw aria-hidden="true" />
                <span>
                    <strong>Restablecer configuración</strong>
                    <small>
                        Vuelve a los valores predeterminados. No eliminará tus países
                        favoritos.
                    </small>
                </span>
            </button>
        </section>
    );
}
