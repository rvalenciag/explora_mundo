import { BadgeCheck, ExternalLink, Globe2, Hash, Phone } from "lucide-react";
import { ProfileDataPanel } from "./ProfileDataPanel";
import { ProfileMetricGrid } from "./ProfileMetricGrid";
import { ProfilePanelHeading } from "./ProfilePanelHeading";
import { ProfileSectionHeading } from "./ProfileSectionHeading";
import { booleanValue } from "./profileFormatters";

export function CountryProfileAdditionalDetails({ country }) {
    const links = [
        {
            label: "Wikipedia",
            description: "Consultar artículo",
            href: country.wikipedia,
        },
        {
            label: "Google Maps",
            description: "Abrir ubicación",
            href: country.googleMaps,
        },
        {
            label: "OpenStreetMap",
            description: "Ver cartografía",
            href: country.openStreetMaps,
        },
        {
            label: "Sitio oficial",
            description: "Visitar sitio web",
            href: country.officialWebsite,
        },
    ].filter((link) => link.href);

    return (
        <section className="profile-content" aria-labelledby="details-title">
            <ProfileSectionHeading
                id="details-title"
                title="Datos adicionales"
                description="Identificadores y clasificación disponibles en el registro."
            />
            <ProfileMetricGrid
                variant="details"
                items={[
                    {
                        label: "ISO alfa-2",
                        value: country.cca2,
                        icon: Hash,
                        tone: "blue",
                    },
                    {
                        label: "ISO alfa-3",
                        value: country.cca3,
                        icon: Hash,
                        tone: "purple",
                    },
                    {
                        label: "Dominio de internet",
                        value: country.tld,
                        icon: Globe2,
                        tone: "orange",
                    },
                    {
                        label: "Prefijo internacional",
                        value: country.callingCode,
                        icon: Phone,
                        tone: "green",
                    },
                ]}
            />
            <div className="profile-two-columns">
                <ProfileDataPanel
                    title="Códigos e identificadores"
                    description="Códigos normalizados del país o territorio."
                    rows={[
                        ["Código ISO alfa-2", country.cca2],
                        ["Código ISO alfa-3", country.cca3],
                        ["Código numérico ISO", country.numericCode],
                        ["Dominio asociado", country.tld],
                        ["Prefijo telefónico", country.callingCode],
                    ]}
                />
                <ProfileDataPanel
                    title="Clasificación y membresía"
                    description="Estatus disponibles en la fuente de datos."
                    rows={[
                        ["Estado soberano", booleanValue(country.independent)],
                        ["Miembro de la ONU", booleanValue(country.unMember)],
                        ["Territorio dependiente", booleanValue(country.dependent)],
                        ["Reconocimiento disputado", booleanValue(country.disputed)],
                        ["Estatus ISO", country.isoStatus],
                    ]}
                />
            </div>
            <section className="profile-panel profile-links-panel">
                <ProfilePanelHeading
                    title="Enlaces de referencia"
                    description="Recursos externos presentes en el registro del país."
                />
                {links.length ? (
                    <div className="profile-reference-links">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Globe2 aria-hidden="true" />
                                <span>
                                    <strong>{link.label}</strong>
                                    <small>{link.description}</small>
                                </span>
                                <ExternalLink aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="profile-no-data">
                        No hay enlaces de referencia disponibles.
                    </p>
                )}
            </section>
            <p className="profile-api-note">
                <BadgeCheck aria-hidden="true" />
                Los campos sin información se muestran como “No disponible” para
                reflejar fielmente el registro de la API.
            </p>
        </section>
    );
}
