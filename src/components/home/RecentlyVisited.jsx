import "./RecentlyVisited.css";
import { Clock3, MapPin } from "lucide-react";
import { SectionHeader } from "../common/SectionHeader";

export function RecentlyVisited({ countries }) {
    return (
        <section className="content-section recent-section">
            <SectionHeader
                title="Visitados recientemente"
                description="Continúa explorando los países que consultaste."
            />
            <div className="recent-list">
                {countries.slice(0, 3).map((country) => (
                    <article key={country.cca3}>
                        <Clock3 aria-hidden="true" />
                        <span className="country-flag">{country.flag}</span>
                        <div>
                            <strong>{country.name}</strong>
                            <small>
                                <MapPin aria-hidden="true" />
                                {country.subregion}
                            </small>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
