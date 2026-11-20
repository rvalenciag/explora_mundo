import { Info, Laptop } from "lucide-react";

export function SettingsStorageNotice() {
    return (
        <aside className="settings-storage-notice">
            <Info aria-hidden="true" />
            <div>
                <strong>
                    Tus preferencias y favoritos se guardan en este navegador
                    (almacenamiento local).
                </strong>
                <span>
                    No necesitas una cuenta y no se sincronizan automáticamente entre
                    dispositivos.
                </span>
            </div>
            <Laptop aria-hidden="true" />
        </aside>
    );
}
