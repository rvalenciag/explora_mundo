import {
    Clock3,
    Globe2,
    Hash,
    MapPin,
    Maximize2,
    Phone,
    Route,
    UsersRound,
} from "lucide-react";
import {
    formatArea,
    formatCoordinates,
    formatPopulation,
} from "../../../utils/countryFormatters";
import { BorderCountries } from "./BorderCountries";
import { ClassificationSummary } from "./ClassificationSummary";
import { ProfileDataPanel } from "./ProfileDataPanel";
import { ProfileMap } from "./ProfileMap";
import { ProfileMetricGrid } from "./ProfileMetricGrid";
import { booleanValue, currenciesValue } from "./profileFormatters";

export function CountryProfileSummary({ country, borderCountries, onOpenCountry }) {
    return (
        <section className="profile-content" aria-labelledby="summary-title">
            <h2 className="sr-only" id="summary-title">
                Resumen de {country.name}
            </h2>
            <ProfileMetricGrid
                variant="summary"
                items={[
                    {
                        label: "Población",
                        value: formatPopulation(country.population),
                        icon: UsersRound,
                        tone: "blue",
                    },
                    {
                        label: "Superficie",
                        value: formatArea(country.area),
                        icon: Maximize2,
                        tone: "green",
                    },
                    {
                        label: "Capital",
                        value: country.capital,
                        icon: MapPin,
                        tone: "orange",
                    },
                    {
                        label: "Zona horaria",
                        value: country.timezones[0],
                        icon: Clock3,
                        tone: "purple",
                    },
                ]}
            />
            <div className="profile-two-columns">
                <ProfileDataPanel
                    title="Información general"
                    description="Datos principales del registro de REST Countries."
                    rows={[
                        ["Nombre oficial", country.officialName],
                        ["Capital", country.capital],
                        ["Región", country.region],
                        ["Subregión", country.subregion],
                        ["Códigos ISO", `${country.cca2} / ${country.cca3}`],
                    ]}
                />
                <ProfileMap country={country} compact />
            </div>
            <div className="profile-two-columns">
                <ProfileDataPanel
                    title="Geografía"
                    description="Ubicación y características territoriales."
                    rows={[
                        ["Continente", country.continent],
                        ["Subregión", country.subregion],
                        ["Superficie", formatArea(country.area)],
                        ["Coordenadas", formatCoordinates(country.coordinates)],
                        ["Sin salida al mar", booleanValue(country.landlocked)],
                    ]}
                />
                <ProfileDataPanel
                    title="Cultura y sociedad"
                    description="Idiomas, moneda y convenciones locales."
                    rows={[
                        ["Idiomas", country.languages.join(" · ")],
                        ["Moneda", currenciesValue(country.currencies)],
                        ["Gentilicio", country.demonym],
                        ["Inicio de semana", country.weekStart],
                        ["Sentido de circulación", country.drivingSide],
                    ]}
                />
            </div>
            <ProfileMetricGrid
                compact
                variant="compact"
                items={[
                    {
                        label: "Dominio de internet",
                        value: country.tld,
                        icon: Globe2,
                        tone: "blue",
                    },
                    {
                        label: "Prefijo telefónico",
                        value: country.callingCode,
                        icon: Phone,
                        tone: "green",
                    },
                    {
                        label: "Códigos ISO",
                        value: `${country.cca2} / ${country.cca3}`,
                        icon: Hash,
                        tone: "orange",
                    },
                    {
                        label: "Países limítrofes",
                        value: country.borders.length,
                        icon: Route,
                        tone: "purple",
                    },
                ]}
            />
            <BorderCountries
                countries={borderCountries}
                onOpenCountry={onOpenCountry}
            />
            <ClassificationSummary country={country} />
        </section>
    );
}
