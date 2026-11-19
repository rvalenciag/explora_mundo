import { Clock3, Maximize2, Route } from "lucide-react";
import { formatArea, formatCoordinates } from "../../../utils/countryFormatters";
import { BorderCountries } from "./BorderCountries";
import { ProfileDataPanel } from "./ProfileDataPanel";
import { ProfileMap } from "./ProfileMap";
import { ProfileMetricGrid } from "./ProfileMetricGrid";
import { ProfileSectionHeading } from "./ProfileSectionHeading";
import { booleanValue } from "./profileFormatters";

export function CountryProfileGeography({ country, borderCountries, onOpenCountry }) {
    return (
        <section className="profile-content" aria-labelledby="geography-title">
            <ProfileSectionHeading
                id="geography-title"
                title={`Geografía de ${country.name}`}
                description="Ubicación, superficie y fronteras terrestres."
            />
            <div className="profile-geography-layout">
                <ProfileMap country={country} />
                <ProfileDataPanel
                    title="Información geográfica"
                    description="Datos geográficos informados por la API."
                    rows={[
                        ["Continente", country.continent],
                        ["Región", country.region],
                        ["Subregión", country.subregion],
                        ["Coordenadas", formatCoordinates(country.coordinates)],
                        ["Zona horaria", country.timezones.join(" · ")],
                        ["Sin salida al mar", booleanValue(country.landlocked)],
                    ]}
                />
            </div>
            <ProfileMetricGrid
                variant="geography"
                items={[
                    {
                        label: "Superficie",
                        value: formatArea(country.area),
                        icon: Maximize2,
                        tone: "blue",
                    },
                    {
                        label: "Zona horaria",
                        value: country.timezones[0],
                        icon: Clock3,
                        tone: "green",
                    },
                    {
                        label: "Fronteras terrestres",
                        value: country.borders.length,
                        icon: Route,
                        tone: "indigo",
                    },
                ]}
            />
            <BorderCountries
                countries={borderCountries}
                onOpenCountry={onOpenCountry}
            />
            <p className="profile-source-note">
                La ubicación y las fronteras se muestran según los datos disponibles de
                REST Countries.
            </p>
        </section>
    );
}
