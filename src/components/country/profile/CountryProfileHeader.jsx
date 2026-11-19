import { Heart } from "lucide-react";
import { CountryFlag } from "../CountryFlag";
import { countryValue } from "./profileFormatters";

export function CountryProfileHeader({ country, favorite, onToggleFavorite, onBack }) {
    return (
        <header className="profile-header">
            <nav className="profile-breadcrumb" aria-label="Ruta de navegación">
                <button type="button" onClick={onBack}>
                    Explorar
                </button>
                <span>/</span>
                <span>{country.region}</span>
                <span>/</span>
                <strong>{country.name}</strong>
            </nav>
            <div className="profile-header-main">
                <CountryFlag country={country} className="profile-flag" />
                <div className="profile-header-copy">
                    <h1>{country.name}</h1>
                    <p>{countryValue(country.officialName)}</p>
                    <span className="profile-region-badge">
                        {country.region} · {country.cca2} / {country.cca3}
                    </span>
                </div>
                <div className="profile-header-actions">
                    <button
                        className={
                            favorite
                                ? "profile-favorite is-favorite"
                                : "profile-favorite"
                        }
                        type="button"
                        onClick={() => onToggleFavorite(country.cca3)}
                        aria-label={
                            favorite
                                ? `Quitar ${country.name} de favoritos`
                                : `Añadir ${country.name} a favoritos`
                        }
                    >
                        <Heart aria-hidden="true" />
                        <span>{favorite ? "En favoritos" : "Favoritos"}</span>
                    </button>
                </div>
            </div>
            <svg
                className="profile-header-orbits"
                viewBox="0 0 520 215"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M27 210c129-127 286-159 505-119"
                    fill="none"
                    stroke="#86d8ee"
                    strokeWidth="6"
                    strokeOpacity=".5"
                />
                <path
                    d="M0 152C127 81 272 67 521 126"
                    fill="none"
                    stroke="#4ebcdf"
                    strokeWidth="3"
                    strokeOpacity=".72"
                />
                <ellipse
                    cx="378"
                    cy="91"
                    rx="129"
                    ry="129"
                    fill="none"
                    stroke="#8ee2f0"
                    strokeWidth="1.5"
                    strokeOpacity=".58"
                />
                <ellipse
                    cx="378"
                    cy="91"
                    rx="92"
                    ry="92"
                    fill="none"
                    stroke="#8ee2f0"
                    strokeWidth="1.5"
                    strokeDasharray="5 6"
                    strokeOpacity=".58"
                />
            </svg>
        </header>
    );
}
