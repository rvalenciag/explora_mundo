import { ArrowLeft } from "lucide-react";
import { CountryFlag } from "../CountryFlag";
import { ProfilePanelHeading } from "./ProfilePanelHeading";

export function BorderCountries({ countries, onOpenCountry }) {
    return (
        <section className="profile-panel profile-borders-panel">
            <ProfilePanelHeading
                title="Países fronterizos"
                description="Países o territorios con frontera terrestre registrados."
            />
            {countries.length ? (
                <div className="profile-border-countries">
                    {countries.map((country) => (
                        <button
                            key={country.cca3}
                            type="button"
                            onClick={() => onOpenCountry(country)}
                        >
                            <CountryFlag country={country} />
                            <span>
                                <strong>{country.name}</strong>
                                <small>{country.cca3}</small>
                            </span>
                            <ArrowLeft aria-hidden="true" />
                        </button>
                    ))}
                </div>
            ) : (
                <p className="profile-no-data">
                    No hay fronteras terrestres registradas.
                </p>
            )}
        </section>
    );
}
