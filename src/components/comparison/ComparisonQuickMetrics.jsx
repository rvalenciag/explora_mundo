import "./ComparisonQuickMetrics.css";
import { Clock3, Languages, Route } from "lucide-react";
import { CountryFlag } from "../country/CountryFlag";
import { ComparisonSectionHeading } from "./ComparisonSectionHeading";

const metrics = [
    {
        label: "Fronteras terrestres",
        description: "Países limítrofes",
        icon: Route,
        tone: "blue",
        value: (country) => country.borders?.length ?? 0,
    },
    {
        label: "Idiomas registrados",
        description: "Idiomas disponibles",
        icon: Languages,
        tone: "cyan",
        value: (country) => country.languages?.length ?? 0,
    },
    {
        label: "Zonas horarias",
        description: "Husos registrados",
        icon: Clock3,
        tone: "green",
        value: (country) => country.timezones?.length ?? 0,
    },
];

export function ComparisonQuickMetrics({ countries }) {
    return (
        <section className="comparison-quick-metrics">
            <ComparisonSectionHeading
                icon={Route}
                title="Indicadores complementarios"
                description="Resumen de fronteras, idiomas y zonas horarias."
            />
            <div className="comparison-quick-metric-grid">
                {metrics.map(({ label, description, icon: Icon, tone, value }) => (
                    <article className={`comparison-quick-metric ${tone}`} key={label}>
                        <header>
                            <span>
                                <Icon aria-hidden="true" />
                            </span>
                            <div>
                                <strong>{label}</strong>
                                <small>{description}</small>
                            </div>
                        </header>
                        <div className="comparison-quick-metric-values">
                            {countries.map((country) => (
                                <div key={country.cca3}>
                                    <span>
                                        <CountryFlag country={country} />
                                        {country.name}
                                    </span>
                                    <strong>{value(country)}</strong>
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
