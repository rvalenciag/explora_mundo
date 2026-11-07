import "./CountryCard.css";
import { ArrowRight, Globe2, Heart, MapPin, Maximize2, UsersRound } from "lucide-react";
import {
    formatArea,
    formatCoordinates,
    formatPopulation,
} from "../../utils/countryFormatters";
import { CountryFlag } from "./CountryFlag";

export function CountryCard({
    country,
    favorite = false,
    onExplore,
    onToggleFavorite,
}) {
    return (
        <article className="country-card">
            <header className="country-card-header">
                <CountryFlag country={country} className="country-card-flag" />
                <div className="country-card-identity">
                    <strong>{country.cca2}</strong>
                    <small>{country.cca3}</small>
                    <span>
                        <MapPin aria-hidden="true" />
                        {formatCoordinates(country.coordinates)}
                    </span>
                </div>
                <svg
                    className="country-card-wave"
                    viewBox="0 0 315 66"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        d="M0 9C54-2 103 6 153 24c61 23 111 26 162-2v44H0Z"
                        fill="#0a99bc"
                    />
                    <path
                        d="M0 23c52-10 103-3 153 15 60 21 109 24 162-3v31H0Z"
                        fill="#8fdceb"
                        fillOpacity="0.82"
                    />
                    <path
                        d="M0 35c53-10 103-3 153 14 59 20 109 24 162-2v20H0Z"
                        fill="#ffffff"
                    />
                </svg>
            </header>

            <div className="country-card-content">
                <h3>{country.name}</h3>
                <div className="country-card-subline">
                    <span className="country-card-region">
                        <Globe2 aria-hidden="true" />
                        {country.subregion}
                    </span>
                    <button
                        className={
                            favorite
                                ? "country-card-favorite is-favorite"
                                : "country-card-favorite"
                        }
                        type="button"
                        onClick={() => onToggleFavorite?.(country.cca3)}
                        aria-label={`Añadir ${country.name} a favoritos`}
                    >
                        <Heart aria-hidden="true" />
                    </button>
                </div>

                <dl className="country-card-facts">
                    <div className="country-card-fact capital">
                        <span className="country-card-fact-icon">
                            <MapPin aria-hidden="true" />
                        </span>
                        <div>
                            <dt>Capital</dt>
                            <dd>{country.capital}</dd>
                        </div>
                    </div>
                    <div className="country-card-fact population">
                        <span className="country-card-fact-icon">
                            <UsersRound aria-hidden="true" />
                        </span>
                        <div>
                            <dt>Población</dt>
                            <dd>{formatPopulation(country.population)}</dd>
                        </div>
                    </div>
                    <div className="country-card-fact area">
                        <span className="country-card-fact-icon">
                            <Maximize2 aria-hidden="true" />
                        </span>
                        <div>
                            <dt>Superficie</dt>
                            <dd>{formatArea(country.area)}</dd>
                        </div>
                    </div>
                </dl>

                <button
                    className="country-card-explore"
                    type="button"
                    onClick={() => onExplore?.(country)}
                >
                    Explorar país <ArrowRight aria-hidden="true" />
                </button>
            </div>
        </article>
    );
}
