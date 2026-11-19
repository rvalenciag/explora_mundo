import "./ComparisonCountrySlot.css";
import { CircleX, MapPin, UsersRound } from "lucide-react";
import { CountryFlag } from "../country/CountryFlag";
import { formatPopulation } from "../../utils/countryFormatters";
import { ComparisonCountrySelector } from "./ComparisonCountrySelector";

export function ComparisonCountrySlot({
    country,
    countries,
    selectedCodes,
    index,
    onSelect,
    onRemove,
}) {
    const tone = ["blue", "cyan", "green"][index];

    if (!country) {
        return (
            <article className={`comparison-country-slot is-empty ${tone}`}>
                <span>Espacio {index + 1}</span>
                <strong>Selecciona un país</strong>
                <ComparisonCountrySelector
                    countries={countries}
                    selectedCodes={selectedCodes}
                    onChange={onSelect}
                />
            </article>
        );
    }

    return (
        <article className={`comparison-country-slot ${tone}`}>
            <div className="comparison-country-main">
                <CountryFlag country={country} />
                <div>
                    <strong>{country.name}</strong>
                    <span>
                        <MapPin aria-hidden="true" />
                        {country.region} · {country.subregion}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => onRemove(country.cca3)}
                    aria-label={`Quitar ${country.name} de la comparación`}
                >
                    <CircleX aria-hidden="true" />
                </button>
            </div>
            <footer>
                <span>
                    <UsersRound aria-hidden="true" />
                    {formatPopulation(country.population)}
                </span>
                <ComparisonCountrySelector
                    countries={countries}
                    selectedCodes={selectedCodes}
                    value={country.cca3}
                    onChange={onSelect}
                />
            </footer>
        </article>
    );
}
