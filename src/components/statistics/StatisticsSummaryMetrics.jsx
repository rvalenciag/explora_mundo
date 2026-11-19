import "./StatisticsSummaryMetrics.css";
import { BarChart3, Globe2, LandPlot, UsersRound } from "lucide-react";
import { formatArea, formatCompactPopulation } from "./statisticsFormatters";

export function StatisticsSummaryMetrics({ countries, population, area, regions }) {
    const items = [
        {
            label: "Países y territorios",
            value: countries.length,
            icon: Globe2,
            tone: "blue",
        },
        {
            label: "Población acumulada",
            value: formatCompactPopulation(population),
            icon: UsersRound,
            tone: "green",
        },
        {
            label: "Superficie acumulada",
            value: formatArea(area),
            icon: LandPlot,
            tone: "orange",
        },
        { label: "Regiones", value: regions.length, icon: BarChart3, tone: "purple" },
    ];

    return (
        <section
            className="statistics-summary-metrics"
            aria-label="Resumen de estadísticas"
        >
            {items.map(({ label, value, icon: Icon, tone }) => (
                <article className={tone} key={label}>
                    <span>{label}</span>
                    <Icon aria-hidden="true" />
                    <strong>{value}</strong>
                </article>
            ))}
        </section>
    );
}
