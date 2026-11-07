import "./CountryListItem.css";
import { ArrowRight, Heart } from "lucide-react";
import { formatArea, formatPopulation } from "../../utils/countryFormatters";
import { CountryFlag } from "./CountryFlag";

export function CountryListItem({
    country,
    favorite = false,
    onExplore,
    onToggleFavorite,
}) {
    return (
        <article className="country-list-item">
            <div className="list-country-title">
                <CountryFlag country={country} className="list-country-flag" />
                <div>
                    <strong>{country.name}</strong>
                    <span>{country.subregion}</span>
                </div>
            </div>
            <div className="list-data">
                <span>Capital</span>
                <strong>{country.capital}</strong>
            </div>
            <div className="list-data">
                <span>Población</span>
                <strong>{formatPopulation(country.population)}</strong>
            </div>
            <div className="list-data">
                <span>Superficie</span>
                <strong>{formatArea(country.area)}</strong>
            </div>
            <div className="list-data list-iso">
                <span>Código ISO</span>
                <strong>{country.cca2}</strong>
            </div>
            <button
                className={favorite ? "list-favorite is-favorite" : "list-favorite"}
                type="button"
                onClick={() => onToggleFavorite?.(country.cca3)}
                aria-label={`Añadir ${country.name} a favoritos`}
            >
                <Heart aria-hidden="true" />
            </button>
            <button
                className="list-explore"
                type="button"
                onClick={() => onExplore?.(country)}
            >
                Explorar país <ArrowRight aria-hidden="true" />
            </button>
        </article>
    );
}
