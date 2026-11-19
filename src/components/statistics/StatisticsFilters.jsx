import "./StatisticsFilters.css";
import { RotateCcw } from "lucide-react";

export function StatisticsFilters({ filters, regions, subregions, onChange, onReset }) {
    return (
        <section className="statistics-filters" aria-label="Filtros de estadísticas">
            <label>
                <span>Región</span>
                <select
                    value={filters.region}
                    onChange={(event) => onChange("region", event.target.value)}
                >
                    <option value="">Todas las regiones</option>
                    {regions.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                <span>Subregión</span>
                <select
                    value={filters.subregion}
                    onChange={(event) => onChange("subregion", event.target.value)}
                >
                    <option value="">Todas las subregiones</option>
                    {subregions.map((subregion) => (
                        <option key={subregion} value={subregion}>
                            {subregion}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                <span>Tipo de territorio</span>
                <select
                    value={filters.territory}
                    onChange={(event) => onChange("territory", event.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="sovereign">Estados soberanos</option>
                    <option value="dependent">Territorios dependientes</option>
                </select>
            </label>
            <label className="statistics-dependent-toggle">
                <input
                    type="checkbox"
                    checked={filters.includeDependents}
                    onChange={(event) =>
                        onChange("includeDependents", event.target.checked)
                    }
                />
                <span aria-hidden="true" />
                Incluir dependientes
            </label>
            <button type="button" onClick={onReset} aria-label="Restablecer filtros">
                <RotateCcw aria-hidden="true" />
            </button>
        </section>
    );
}
