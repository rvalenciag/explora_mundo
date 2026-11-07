import "./Catalog.css";
import { Search } from "lucide-react";

export function CatalogFilters({ filters, regions, subregions, onChange }) {
    return (
        <div className="catalog-filters">
            <label className="search-field">
                <Search aria-hidden="true" />
                <input
                    aria-label="Buscar país"
                    value={filters.search}
                    onChange={(event) => onChange("search", event.target.value)}
                    placeholder="Buscar un país por su nombre..."
                />
            </label>
            <label>
                <select
                    aria-label="Filtrar por región"
                    value={filters.region}
                    onChange={(event) => onChange("region", event.target.value)}
                >
                    <option value="">Todas las regiones</option>
                    {regions.map((region) => (
                        <option key={region}>{region}</option>
                    ))}
                </select>
            </label>
            <label>
                <select
                    aria-label="Filtrar por subregión"
                    value={filters.subregion}
                    onChange={(event) => onChange("subregion", event.target.value)}
                >
                    <option value="">Todas las subregiones</option>
                    {subregions.map((subregion) => (
                        <option key={subregion}>{subregion}</option>
                    ))}
                </select>
            </label>
            <label>
                <select
                    aria-label="Ordenar países"
                    value={filters.order}
                    onChange={(event) => onChange("order", event.target.value)}
                >
                    <option value="name-asc">Nombre: A–Z</option>
                    <option value="name-desc">Nombre: Z–A</option>
                    <option value="population-desc">Población: mayor</option>
                    <option value="population-asc">Población: menor</option>
                    <option value="area-desc">Superficie: mayor</option>
                    <option value="area-asc">Superficie: menor</option>
                </select>
            </label>
        </div>
    );
}
