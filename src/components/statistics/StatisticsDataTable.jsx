import "./StatisticsDataTable.css";
import { Search, Table2 } from "lucide-react";
import { Pagination } from "../common/Pagination";
import { CountryFlag } from "../country/CountryFlag";
import {
    formatArea,
    formatDensity,
    formatPopulation,
    densityValue,
} from "./statisticsFormatters";

export function StatisticsDataTable({
    countries,
    page,
    pageSize,
    search,
    order,
    onSearchChange,
    onOrderChange,
    onPageChange,
    onPageSizeChange,
}) {
    const totalPages = Math.max(1, Math.ceil(countries.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const visibleCountries = countries.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    return (
        <section className="statistics-data-table">
            <header className="statistics-table-heading">
                <span>
                    <Table2 aria-hidden="true" />
                </span>
                <div>
                    <h2>Tabla de datos</h2>
                    <p>Principales registros de países y territorios</p>
                </div>
                <label className="statistics-table-search">
                    <Search aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Buscar país…"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                    />
                </label>
                <select
                    value={order}
                    onChange={(event) => onOrderChange(event.target.value)}
                >
                    <option value="population-desc">Población (mayor)</option>
                    <option value="population-asc">Población (menor)</option>
                    <option value="area-desc">Superficie (mayor)</option>
                    <option value="area-asc">Superficie (menor)</option>
                    <option value="density-desc">Densidad (mayor)</option>
                    <option value="density-asc">Densidad (menor)</option>
                    <option value="name-asc">Nombre A–Z</option>
                </select>
                <select
                    className="catalog-page-size"
                    value={pageSize}
                    onChange={(event) => onPageSizeChange(Number(event.target.value))}
                    aria-label="Países por página"
                >
                    <option value="12">12 por página</option>
                    <option value="24">24 por página</option>
                    <option value="48">48 por página</option>
                </select>
            </header>
            <div className="statistics-table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>País</th>
                            <th>Región</th>
                            <th>Subregión</th>
                            <th>Población</th>
                            <th>Superficie (km²)</th>
                            <th>Densidad (hab/km²)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleCountries.map((country, index) => (
                            <tr key={country.cca3}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>
                                    <span className="statistics-table-country">
                                        <CountryFlag country={country} />
                                        {country.name}
                                    </span>
                                </td>
                                <td>{country.region}</td>
                                <td>{country.subregion}</td>
                                <td>{formatPopulation(country.population)}</td>
                                <td>{formatArea(country.area)}</td>
                                <td>{formatDensity(densityValue(country))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer>
                <span>
                    Mostrando{" "}
                    {visibleCountries.length ? (currentPage - 1) * pageSize + 1 : 0}–
                    {Math.min(currentPage * pageSize, countries.length)} de{" "}
                    {countries.length} registros
                </span>
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </footer>
        </section>
    );
}
