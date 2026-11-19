import "./StatisticsPage.css";
import { useMemo, useState } from "react";
import { StatisticsDataTable } from "../components/statistics/StatisticsDataTable";
import { StatisticsFilters } from "../components/statistics/StatisticsFilters";
import { StatisticsRanking } from "../components/statistics/StatisticsRanking";
import { StatisticsRegionDistribution } from "../components/statistics/StatisticsRegionDistribution";
import { StatisticsRegionalComparison } from "../components/statistics/StatisticsRegionalComparison";
import { StatisticsSummaryMetrics } from "../components/statistics/StatisticsSummaryMetrics";
import { sortCountries } from "../components/statistics/statisticsFormatters";

const initialFilters = {
    region: "",
    subregion: "",
    territory: "",
    includeDependents: true,
};

export function StatisticsPage({ countries, loading, error }) {
    const [filters, setFilters] = useState(initialFilters);
    const [rankingMetric, setRankingMetric] = useState("population");
    const [distributionMode, setDistributionMode] = useState("count");
    const [regionalMode, setRegionalMode] = useState("population");
    const [tableSearch, setTableSearch] = useState("");
    const [tableOrder, setTableOrder] = useState("population-desc");
    const [tablePage, setTablePage] = useState(1);
    const [tablePageSize, setTablePageSize] = useState(12);

    const regions = useMemo(
        () => [...new Set(countries.map((country) => country.region))].sort(),
        [countries],
    );
    const subregions = useMemo(
        () =>
            [
                ...new Set(
                    countries
                        .filter(
                            (country) =>
                                !filters.region || country.region === filters.region,
                        )
                        .map((country) => country.subregion),
                ),
            ].sort(),
        [countries, filters.region],
    );
    const filteredCountries = useMemo(
        () =>
            countries.filter((country) => {
                if (filters.region && country.region !== filters.region) return false;
                if (filters.subregion && country.subregion !== filters.subregion)
                    return false;
                if (filters.territory === "sovereign" && country.independent !== true) {
                    return false;
                }
                if (filters.territory === "dependent" && country.dependent !== true) {
                    return false;
                }
                return filters.includeDependents || country.dependent !== true;
            }),
        [countries, filters],
    );
    const regionStats = useMemo(() => {
        const values = new Map();
        filteredCountries.forEach((country) => {
            const current = values.get(country.region) ?? {
                name: country.region,
                count: 0,
                population: 0,
                area: 0,
            };
            current.count += 1;
            current.population += country.population;
            current.area += country.area;
            values.set(country.region, current);
        });
        return [...values.values()].sort((first, second) => second.count - first.count);
    }, [filteredCountries]);
    const population = filteredCountries.reduce(
        (sum, country) => sum + country.population,
        0,
    );
    const area = filteredCountries.reduce((sum, country) => sum + country.area, 0);
    const tableCountries = useMemo(() => {
        const normalizedSearch = tableSearch.trim().toLocaleLowerCase("es");
        const searched = filteredCountries.filter(
            (country) =>
                !normalizedSearch ||
                country.name.toLocaleLowerCase("es").includes(normalizedSearch) ||
                country.officialName
                    ?.toLocaleLowerCase("es")
                    .includes(normalizedSearch),
        );
        return sortCountries(searched, tableOrder);
    }, [filteredCountries, tableOrder, tableSearch]);

    function changeFilter(key, value) {
        setFilters((current) => ({
            ...current,
            ...(key === "region" ? { region: value, subregion: "" } : { [key]: value }),
        }));
        setTablePage(1);
    }

    function resetFilters() {
        setFilters(initialFilters);
        setTablePage(1);
    }

    return (
        <main className="page-shell statistics-page">
            <header className="statistics-page-heading">
                <h1>Estadísticas mundiales</h1>
                <p>
                    Explora datos, clasificaciones y tendencias de países y territorios
                    a partir de REST Countries.
                </p>
            </header>
            <StatisticsFilters
                filters={filters}
                regions={regions}
                subregions={subregions}
                onChange={changeFilter}
                onReset={resetFilters}
            />
            {error && (
                <p className="statistics-notice" role="alert">
                    {error}
                </p>
            )}
            {loading && (
                <p className="statistics-notice" role="status">
                    Calculando estadísticas…
                </p>
            )}
            <StatisticsSummaryMetrics
                area={area}
                countries={filteredCountries}
                population={population}
                regions={regionStats}
            />
            <section className="statistics-analysis-grid">
                <StatisticsRanking
                    countries={filteredCountries}
                    metric={rankingMetric}
                    onMetricChange={setRankingMetric}
                />
                <StatisticsRegionDistribution
                    mode={distributionMode}
                    onModeChange={setDistributionMode}
                    regions={regionStats}
                />
            </section>
            <StatisticsRegionalComparison
                mode={regionalMode}
                onModeChange={setRegionalMode}
                regions={regionStats}
            />
            <StatisticsDataTable
                countries={tableCountries}
                order={tableOrder}
                page={tablePage}
                pageSize={tablePageSize}
                search={tableSearch}
                onOrderChange={(value) => {
                    setTableOrder(value);
                    setTablePage(1);
                }}
                onPageChange={setTablePage}
                onPageSizeChange={(value) => {
                    setTablePageSize(value);
                    setTablePage(1);
                }}
                onSearchChange={(value) => {
                    setTableSearch(value);
                    setTablePage(1);
                }}
            />
        </main>
    );
}
