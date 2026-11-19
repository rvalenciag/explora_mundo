import { Coins, Languages, UsersRound } from "lucide-react";
import { ProfileDataPanel } from "./ProfileDataPanel";
import { ProfileMetricGrid } from "./ProfileMetricGrid";
import { ProfilePanelHeading } from "./ProfilePanelHeading";
import { ProfileSectionHeading } from "./ProfileSectionHeading";
import {
    countryValue,
    currenciesValue,
    currencyCodes,
    unavailable,
} from "./profileFormatters";

export function CountryProfileCulture({ country }) {
    const languages = country.languages.length ? country.languages : [unavailable];

    return (
        <section className="profile-content" aria-labelledby="culture-title">
            <ProfileSectionHeading
                id="culture-title"
                title={`Cultura y sociedad de ${country.name}`}
                description="Idiomas, moneda y convenciones de uso local."
            />
            <ProfileMetricGrid
                variant="culture"
                items={[
                    {
                        label: "Idiomas registrados",
                        value: country.languages.length,
                        icon: Languages,
                        tone: "blue",
                    },
                    {
                        label: "Moneda",
                        value: currenciesValue(country.currencies),
                        icon: Coins,
                        tone: "green",
                    },
                    {
                        label: "Gentilicio",
                        value: country.demonym,
                        icon: UsersRound,
                        tone: "indigo",
                    },
                ]}
            />
            <div className="profile-culture-layout">
                <section className="profile-panel profile-languages-panel">
                    <ProfilePanelHeading
                        title="Idiomas registrados"
                        description="Idiomas disponibles en el registro del país."
                    />
                    <div className="language-chips">
                        {languages.map((language) => (
                            <span key={language}>
                                <Languages aria-hidden="true" />
                                {language}
                            </span>
                        ))}
                    </div>
                    <p className="profile-inline-note">
                        La API puede registrar uno o varios idiomas para cada país o
                        territorio.
                    </p>
                </section>
                <ProfileDataPanel
                    title="Moneda y gentilicio"
                    rows={[
                        ["Moneda", currenciesValue(country.currencies)],
                        ["Código de moneda", currencyCodes(country.currencies)],
                        ["Gentilicio masculino", country.demonym],
                        ["Gentilicio femenino", country.demonymFemale],
                    ]}
                />
            </div>
            <section className="profile-panel profile-conventions">
                <ProfilePanelHeading
                    title="Convenciones del país"
                    description="Referencias de calendario y circulación."
                />
                <div className="profile-convention-values">
                    <div>
                        <span>Inicio de semana</span>
                        <strong>{countryValue(country.weekStart)}</strong>
                    </div>
                    <div>
                        <span>Sentido de circulación</span>
                        <strong>{countryValue(country.drivingSide)}</strong>
                    </div>
                </div>
            </section>
            <p className="profile-source-note">
                Información cultural y de convenciones disponible en REST Countries.
            </p>
        </section>
    );
}
