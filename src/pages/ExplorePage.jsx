import "./ExplorePage.css";
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CatalogFilters } from "../components/catalog/CatalogFilters";
import { CatalogActiveFilters } from "../components/catalog/CatalogActiveFilters";
import { CatalogResults } from "../components/catalog/CatalogResults";
import { CatalogToolbar } from "../components/catalog/CatalogToolbar";
import { CountryDetailDrawer } from "../components/country/CountryDetailDrawer";
import { Pagination } from "../components/common/Pagination";

const initialFilters = {
    search: "",
    region: "",
    subregion: "",
    order: "name-asc",
};
export function ExplorePage({ countries, loading, error }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { countryCode } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const regionFromUrl = searchParams.get("region") ?? "";
    const [filterValues, setFilterValues] = useState(() => ({
        ...initialFilters,
        region: regionFromUrl,
    }));
    const filters = useMemo(
        () => ({
            ...filterValues,
            region: regionFromUrl,
            subregion:
                filterValues.region === regionFromUrl ? filterValues.subregion : "",
        }),
        [filterValues, regionFromUrl],
    );
    const [view, setView] = useState("grid");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [favoriteCodes, setFavoriteCodes] = useState(() => new Set());

    const selectedCountry = countryCode
        ? countries.find(
              (country) =>
                  country.cca3.toLocaleLowerCase("es") ===
                  countryCode.toLocaleLowerCase("es"),
          )
        : null;
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

    const filteredCountries = useMemo(() => {
        const normalizedSearch = filters.search.trim().toLocaleLowerCase("es");
        return countries
            .filter((country) => {
                const nameMatches =
                    !normalizedSearch ||
                    country.name.toLocaleLowerCase("es").includes(normalizedSearch) ||
                    country.officialName
                        ?.toLocaleLowerCase("es")
                        .includes(normalizedSearch);
                return (
                    nameMatches &&
                    (!filters.region || country.region === filters.region) &&
                    (!filters.subregion || country.subregion === filters.subregion)
                );
            })
            .sort((first, second) => {
                if (filters.order === "name-desc")
                    return second.name.localeCompare(first.name, "es");
                if (filters.order === "population-desc")
                    return second.population - first.population;
                if (filters.order === "population-asc")
                    return first.population - second.population;
                if (filters.order === "area-desc") return second.area - first.area;
                if (filters.order === "area-asc") return first.area - second.area;
                return first.name.localeCompare(second.name, "es");
            });
    }, [countries, filters]);

    const totalPages = Math.max(1, Math.ceil(filteredCountries.length / pageSize));
    const visibleCountries = filteredCountries.slice(
        (page - 1) * pageSize,
        page * pageSize,
    );

    function updateFilter(key, value) {
        setFilterValues((current) => ({
            ...current,
            ...(key === "region" ? { region: value, subregion: "" } : { [key]: value }),
        }));
        setPage(1);

        if (key === "region") {
            const nextSearchParams = new URLSearchParams(searchParams);
            if (value) {
                nextSearchParams.set("region", value);
            } else {
                nextSearchParams.delete("region");
            }
            setSearchParams(nextSearchParams);
        }
    }

    function resetFilters() {
        setFilterValues(initialFilters);
        setPage(1);
        setSearchParams({});
    }

    function changeView(nextView) {
        setView(nextView);
        setPage(1);
    }

    function changePageSize(nextPageSize) {
        setPageSize(nextPageSize);
        setPage(1);
    }

    function toggleFavorite(code) {
        setFavoriteCodes((current) => {
            const next = new Set(current);
            if (next.has(code)) {
                next.delete(code);
            } else {
                next.add(code);
            }
            return next;
        });
    }

    function openCountry(country) {
        navigate({
            pathname: `/explorar/${country.cca3.toLocaleLowerCase("es")}`,
            search: location.search,
        });
    }

    function closeCountry() {
        navigate({ pathname: "/explorar", search: location.search });
    }

    return (
        <main className="page-shell explore-page">
            <div className="page-intro">
                <div>
                    <h1>Explorar países</h1>
                    <p>
                        Descubre países y territorios de todo el mundo. Busca, filtra y
                        conoce sus características.
                    </p>
                </div>
            </div>
            <CatalogFilters
                filters={filters}
                regions={regions}
                subregions={subregions}
                onChange={updateFilter}
            />
            <CatalogActiveFilters
                filters={filters}
                onChange={updateFilter}
                onReset={resetFilters}
            />
            {error && (
                <p className="data-notice">
                    {error} Se muestran datos de referencia mientras revisas la
                    configuración.
                </p>
            )}
            {loading && <p className="data-notice">Actualizando datos de países…</p>}
            <CatalogToolbar
                view={view}
                onViewChange={changeView}
                pageSize={pageSize}
                onPageSizeChange={changePageSize}
            />
            <CatalogResults
                countries={visibleCountries}
                favoriteCodes={favoriteCodes}
                onExplore={openCountry}
                onToggleFavorite={toggleFavorite}
                view={view}
            />
            <div className="catalog-footer">
                <span>
                    Mostrando {visibleCountries.length ? (page - 1) * pageSize + 1 : 0}–
                    {Math.min(page * pageSize, filteredCountries.length)} de{" "}
                    {filteredCountries.length} resultados
                </span>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
            {selectedCountry && (
                <CountryDetailDrawer
                    country={selectedCountry}
                    favorite={favoriteCodes.has(selectedCountry.cca3)}
                    onClose={closeCountry}
                    onToggleFavorite={toggleFavorite}
                />
            )}
        </main>
    );
}
