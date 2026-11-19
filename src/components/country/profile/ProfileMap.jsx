import { ExternalLink, MapPin } from "lucide-react";
import { formatCoordinates } from "../../../utils/countryFormatters";
import { ProfilePanelHeading } from "./ProfilePanelHeading";

export function ProfileMap({ country, compact = false }) {
    const [latitude, longitude] = country.coordinates ?? [];
    const hasCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);
    const mapUrl = hasCoordinates
        ? `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}&z=4&output=embed`
        : null;
    const link = country.googleMaps ?? country.openStreetMaps;

    return (
        <section
            className={`profile-panel profile-map-panel ${compact ? "is-compact" : ""}`}
        >
            <ProfilePanelHeading
                title="Ubicación geográfica"
                description="Mapa basado en las coordenadas disponibles."
            />
            {mapUrl ? (
                <iframe
                    className="profile-map"
                    title={`Mapa de ${country.name}`}
                    src={mapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            ) : (
                <div className="profile-map-empty">
                    <MapPin aria-hidden="true" />
                    No hay coordenadas disponibles para mostrar el mapa.
                </div>
            )}
            <footer className="profile-map-footer">
                <span>
                    <MapPin aria-hidden="true" />
                    {formatCoordinates(country.coordinates)}
                </span>
                {link && (
                    <a href={link} target="_blank" rel="noreferrer">
                        Abrir en el mapa <ExternalLink aria-hidden="true" />
                    </a>
                )}
            </footer>
        </section>
    );
}
