import "./Catalog.css";
import { Trash2, X } from "lucide-react";

const orderLabels = {
    "name-asc": "Nombre (A-Z)",
    "name-desc": "Nombre (Z-A)",
    "population-desc": "Población (mayor)",
    "population-asc": "Población (menor)",
    "area-desc": "Superficie (mayor)",
    "area-asc": "Superficie (menor)",
};

export function CatalogActiveFilters({ filters, onChange, onReset }) {
    const chips = [
        filters.search && {
            key: "search",
            label: `Búsqueda: ${filters.search}`,
        },
        filters.region && { key: "region", label: filters.region },
        filters.subregion && { key: "subregion", label: filters.subregion },
        { key: "order", label: `Orden: ${orderLabels[filters.order]}` },
    ].filter(Boolean);

    return (
        <div className="catalog-active-filters">
            <div className="catalog-active-filters-list">
                <span className="catalog-active-label">Filtros activos:</span>
                {chips.map((chip) => (
                    <button
                        className="active-filter-chip"
                        key={chip.key}
                        type="button"
                        onClick={() =>
                            onChange(chip.key, chip.key === "order" ? "name-asc" : "")
                        }
                    >
                        {chip.label} <X aria-hidden="true" />
                    </button>
                ))}
            </div>
            <button className="clear-filters" type="button" onClick={onReset}>
                <Trash2 aria-hidden="true" /> Limpiar filtros
            </button>
        </div>
    );
}
