import "./StatisticsRegionalComparison.css";
import { TrendingUp } from "lucide-react";
import {
    formatArea,
    formatCompactPopulation,
    regionColors,
} from "./statisticsFormatters";

const modes = [
    { id: "population", label: "Población", format: formatCompactPopulation },
    { id: "area", label: "Superficie", format: formatArea },
];

export function StatisticsRegionalComparison({ regions, mode, onModeChange }) {
    const currentMode = modes.find((item) => item.id === mode) ?? modes[0];
    const maximum = Math.max(...regions.map((region) => region[currentMode.id]), 1);

    return (
        <section className="statistics-regional-comparison">
            <header className="statistics-card-heading">
                <span>
                    <TrendingUp aria-hidden="true" />
                </span>
                <div>
                    <h2>Comparación regional</h2>
                    <p>Población o superficie acumulada por región</p>
                </div>
                <nav aria-label="Métrica de comparación regional">
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
            </header>
            <div className="statistics-regional-bars">
                {regions.map((region, index) => (
                    <div key={region.name}>
                        <span>{currentMode.format(region[currentMode.id])}</span>
                        <i
                            style={{
                                height: `${Math.max((region[currentMode.id] / maximum) * 100, 3)}%`,
                                background: regionColors[index % regionColors.length],
                            }}
                        />
                        <strong>{region.name}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
}
