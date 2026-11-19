import "./StatisticsRegionDistribution.css";
import { PieChart } from "lucide-react";
import {
    regionColors,
    formatArea,
    formatCompactPopulation,
} from "./statisticsFormatters";

const modes = [
    {
        id: "count",
        label: "N.º de países",
        format: (value) => value.toLocaleString("es-BO"),
    },
    { id: "population", label: "Población", format: formatCompactPopulation },
    { id: "area", label: "Superficie", format: formatArea },
];

function conicGradient(regions, mode) {
    const total = regions.reduce((sum, region) => sum + region[mode], 0) || 1;
    let position = 0;
    const segments = regions.map((region, index) => {
        const next = position + (region[mode] / total) * 100;
        const color = regionColors[index % regionColors.length];
        const segment = `${color} ${position}% ${next}%`;
        position = next;
        return segment;
    });
    return `conic-gradient(${segments.join(", ")})`;
}

export function StatisticsRegionDistribution({ regions, mode, onModeChange }) {
    const currentMode = modes.find((item) => item.id === mode) ?? modes[0];
    const total = regions.reduce((sum, region) => sum + region[currentMode.id], 0);

    return (
        <section className="statistics-region-distribution">
            <header className="statistics-card-heading">
                <span>
                    <PieChart aria-hidden="true" />
                </span>
                <div>
                    <h2>Distribución por regiones</h2>
                    <p>Valores acumulados según los filtros actuales</p>
                </div>
            </header>
            <nav aria-label="Métrica de distribución regional">
                {modes.map((item) => (
                    <button
                        className={item.id === currentMode.id ? "active" : ""}
                        key={item.id}
                        type="button"
                        onClick={() => onModeChange(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="statistics-distribution-content">
                <div
                    className="statistics-donut"
                    style={{ background: conicGradient(regions, currentMode.id) }}
                >
                    <div>
                        <strong>{currentMode.format(total)}</strong>
                        <span>
                            {currentMode.id === "count"
                                ? "registros"
                                : currentMode.label}
                        </span>
                    </div>
                </div>
                <ul>
                    {regions.map((region, index) => {
                        const value = region[currentMode.id];
                        const percentage = total ? (value / total) * 100 : 0;
                        return (
                            <li key={region.name}>
                                <span
                                    style={{
                                        background:
                                            regionColors[index % regionColors.length],
                                    }}
                                />
                                <strong>{region.name}</strong>
                                <small>
                                    {currentMode.format(value)} ·{" "}
                                    {percentage.toLocaleString("es-BO", {
                                        maximumFractionDigits: 1,
                                    })}
                                    %
                                </small>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
