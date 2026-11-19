import "./StatisticsRanking.css";
import { BarChart3 } from "lucide-react";
import { CountryFlag } from "../country/CountryFlag";
import {
    densityValue,
    formatArea,
    formatDensity,
    formatPopulation,
} from "./statisticsFormatters";

const rankingOptions = [
    {
        id: "population",
        label: "Población",
        value: (country) => country.population,
        format: formatPopulation,
    },
    {
        id: "area",
        label: "Superficie",
        value: (country) => country.area,
        format: formatArea,
    },
    { id: "density", label: "Densidad", value: densityValue, format: formatDensity },
];

export function StatisticsRanking({ countries, metric, onMetricChange }) {
    const option =
        rankingOptions.find((item) => item.id === metric) ?? rankingOptions[0];
    const ranking = [...countries]
        .sort((first, second) => option.value(second) - option.value(first))
        .slice(0, 5);
    const maximum = Math.max(...ranking.map(option.value), 1);

    return (
        <section className="statistics-ranking">
            <header className="statistics-card-heading">
                <span>
                    <BarChart3 aria-hidden="true" />
                </span>
                <div>
                    <h2>Ranking de países</h2>
                    <p>Top 5 dentro de los filtros aplicados</p>
                </div>
            </header>
            <nav aria-label="Tipo de ranking">
                {rankingOptions.map((item) => (
                    <button
                        className={item.id === option.id ? "active" : ""}
                        key={item.id}
                        type="button"
                        onClick={() => onMetricChange(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
            <ol className="statistics-ranking-list">
                {ranking.map((country, index) => (
                    <li key={country.cca3}>
                        <span className="statistics-rank-position">{index + 1}</span>
                        <CountryFlag country={country} />
                        <div>
                            <header>
                                <strong>{country.name}</strong>
                                <span>{option.format(option.value(country))}</span>
                            </header>
                            <span className="statistics-ranking-track">
                                <span
                                    style={{
                                        width: `${(option.value(country) / maximum) * 100}%`,
                                    }}
                                />
                            </span>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
