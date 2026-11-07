import "./CountryDetailDrawer.css";
import { useState } from "react";
import {
    ArrowRight,
    Clock3,
    Coins,
    ExternalLink,
    Globe2,
    Heart,
    Languages,
    MapPin,
    Maximize2,
    UsersRound,
    X,
} from "lucide-react";
import {
    formatArea,
    formatCoordinates,
    formatPopulation,
} from "../../utils/countryFormatters";
import { CountryFlag } from "./CountryFlag";

const tabs = ["General", "Geografía", "Cultura"];

export function CountryDetailDrawer({
    country,
    favorite = false,
    onClose,
    onToggleFavorite,
}) {
    const [activeTab, setActiveTab] = useState("General");

    return (
        <>
            <button
                className="country-detail-backdrop"
                type="button"
                onClick={onClose}
                aria-label="Cerrar detalle de país"
            />
            <aside className="country-detail-drawer" aria-label="Detalle del país">
                <header className="country-detail-header">
                    <button
                        className="country-detail-close"
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar detalle de país"
                    >
                        <X aria-hidden="true" />
                    </button>
                    <div className="country-detail-header-main">
                        <CountryFlag
                            country={country}
                            className="country-detail-flag"
                        />
                        <span className="detail-header-divider detail-flag-divider" />
                        <div className="country-detail-country">
                            <strong>{country.name}</strong>
                            <small>
                                <Globe2 aria-hidden="true" />
                                {country.subregion}
                            </small>
                            <span>
                                <MapPin aria-hidden="true" />
                                {formatCoordinates(country.coordinates)}
                            </span>
                        </div>
                        <span className="detail-header-divider detail-iso-divider" />
                        <div className="country-detail-identity">
                            <strong>{country.cca2}</strong>
                            <span>{country.cca3}</span>
                        </div>
                        <button
                            className={
                                favorite
                                    ? "detail-favorite is-favorite"
                                    : "detail-favorite"
                            }
                            type="button"
                            onClick={() => onToggleFavorite(country.cca3)}
                            aria-label={`Añadir ${country.name} a favoritos`}
                        >
                            <Heart aria-hidden="true" />
                        </button>
                    </div>
                    <svg
                        className="country-detail-header-wave"
                        viewBox="0 0 500 68"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M0 10C83-4 164 4 250 28c93 27 169 27 250-6v46H0Z"
                            fill="#0a99bc"
                        />
                        <path
                            d="M0 25c84-14 164-6 249 17 91 25 166 26 251-5v31H0Z"
                            fill="#8fdceb"
                            fillOpacity="0.82"
                        />
                        <path
                            d="M0 38c83-13 164-5 249 16 91 23 166 26 251-4v18H0Z"
                            fill="#fff"
                        />
                    </svg>
                </header>

                <nav className="country-detail-tabs" aria-label="Secciones del detalle">
                    {tabs.map((tab) => (
                        <button
                            className={activeTab === tab ? "active" : ""}
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <div className="country-detail-content">
                    {activeTab === "General" && <General country={country} />}
                    {activeTab === "Geografía" && <Geography country={country} />}
                    {activeTab === "Cultura" && <Culture country={country} />}
                </div>

                <footer className="country-detail-footer">
                    <button className="detail-compare" type="button">
                        Comparar
                    </button>
                    <button className="detail-full" type="button" onClick={onClose}>
                        Ver ficha completa <ArrowRight aria-hidden="true" />
                    </button>
                    <small>Puedes cerrar el panel en cualquier momento.</small>
                </footer>
            </aside>
        </>
    );
}

function General({ country }) {
    return (
        <DetailSection title="Información general">
            <div className="detail-metrics">
                <DetailMetric
                    label="Población"
                    value={formatPopulation(country.population)}
                    icon={UsersRound}
                    tone="blue"
                />
                <DetailMetric
                    label="Superficie"
                    value={formatArea(country.area)}
                    icon={Maximize2}
                    tone="green"
                />
            </div>
            <DetailRows
                rows={[
                    ["Nombre oficial", country.officialName],
                    ["Capital", country.capital],
                    ["Región", country.region],
                    ["Subregión", country.subregion],
                    ["Códigos ISO", `${country.cca2} / ${country.cca3}`],
                ]}
            />
            {country.wikipedia && (
                <a
                    className="detail-link"
                    href={country.wikipedia}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Globe2 aria-hidden="true" />
                    Consultar Wikipedia <ExternalLink aria-hidden="true" />
                </a>
            )}
        </DetailSection>
    );
}

function Geography({ country }) {
    return (
        <DetailSection title="Información geográfica">
            <div className="detail-metrics">
                <DetailMetric
                    label="Coordenadas"
                    value={formatCoordinates(country.coordinates)}
                    icon={MapPin}
                    tone="blue"
                />
                <DetailMetric
                    label="Zona horaria"
                    value={country.timezones[0] ?? "No disponible"}
                    icon={Clock3}
                    tone="green"
                />
            </div>
            <DetailRows
                rows={[
                    ["Continente", country.continent],
                    ["Región", country.region],
                    ["Subregión", country.subregion],
                    ["Sin salida al mar", country.landlocked ? "Sí" : "No"],
                ]}
            />
            <div className="detail-borders">
                <span>Países fronterizos ({country.borders.length})</span>
                <strong>
                    {country.borders.length
                        ? country.borders.join(" · ")
                        : "No disponible"}
                </strong>
            </div>
            {country.mapUrl && (
                <a
                    className="detail-link"
                    href={country.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    <MapPin aria-hidden="true" />
                    Ver ubicación en el mapa <ExternalLink aria-hidden="true" />
                </a>
            )}
        </DetailSection>
    );
}

function Culture({ country }) {
    const languages = country.languages.length
        ? `${country.languages.slice(0, 1).join(" ")}${country.languages.length > 1 ? " y otros" : ""}`
        : "No disponible";
    const currency = country.currencies[0];
    return (
        <DetailSection title="Cultura y sociedad">
            <div className="detail-metrics">
                <DetailMetric
                    label="Idiomas"
                    value={languages}
                    icon={Languages}
                    tone="blue"
                />
                <DetailMetric
                    label="Moneda"
                    value={
                        currency
                            ? `${currency.name} (${currency.code})`
                            : "No disponible"
                    }
                    icon={Coins}
                    tone="green"
                />
            </div>
            <DetailRows
                rows={[
                    ["Gentilicio", country.demonym],
                    ["Dominio de internet", country.tld],
                    ["Prefijo telefónico", country.callingCode],
                    ["Inicio de semana", country.weekStart],
                    ["Sentido de circulación", country.drivingSide],
                ]}
            />
        </DetailSection>
    );
}

function DetailSection({ title, children }) {
    return (
        <section className="country-detail-section">
            <h2>{title}</h2>
            {children}
        </section>
    );
}

function DetailMetric({ label, value, icon: Icon, tone }) {
    return (
        <article className={`detail-metric ${tone}`}>
            <span>{label}</span>
            <Icon aria-hidden="true" />
            <strong>{value}</strong>
        </article>
    );
}

function DetailRows({ rows }) {
    return (
        <dl className="detail-rows">
            {rows.map(([label, value]) => (
                <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value || "No disponible"}</dd>
                </div>
            ))}
        </dl>
    );
}
