import "./HomePage.css";
import { ChartNoAxesCombined, Globe2, LandPlot, UsersRound } from "lucide-react";
import { FeaturedCountries } from "../components/home/FeaturedCountries";
import { Hero } from "../components/home/Hero";
import { RecentlyVisited } from "../components/home/RecentlyVisited";
import { RegionExplorer } from "../components/home/RegionExplorer";
import { StatCard } from "../components/common/StatCard";
import { formatPopulation, formatTotalArea } from "../utils/countryFormatters";

export function HomePage({
    countries,
    loading,
    error,
    onExplore,
    onExploreCountry,
    onExploreRegion,
}) {
    const population = countries.reduce(
        (total, country) => total + country.population,
        0,
    );
    const area = countries.reduce((total, country) => total + country.area, 0);
    const featured = ["Bolivia", "Japón", "Canadá", "Francia"]
        .map((name) => countries.find((country) => country.name === name))
        .filter(Boolean);
    const displayFeatured = featured.length === 4 ? featured : countries.slice(0, 4);

    return (
        <>
            <Hero onExplore={onExplore} />
            <main className="page-shell home-page">
                {loading && <HomeLoading />}
                {!loading && error && (
                    <div className="home-data-state">
                        <strong>No fue posible cargar los países.</strong>
                        <span>{error}</span>
                    </div>
                )}
                {!loading && !error && (
                    <>
                        <section className="world-stats" aria-label="Cifras del mundo">
                            <div className="world-stats-heading">
                                <span>Explora un mundo de información</span>
                                <p>
                                    Descubre las cifras que describen los países y
                                    territorios del planeta.
                                </p>
                            </div>
                            <div className="stat-grid">
                                <StatCard
                                    label="Países y territorios"
                                    value={
                                        countries.length >= 250
                                            ? "250+"
                                            : countries.length
                                    }
                                    detail="Registros disponibles"
                                    icon={Globe2}
                                />
                                <StatCard
                                    label="Población registrada"
                                    value={formatPopulation(population)}
                                    detail="Habitantes registrados"
                                    icon={UsersRound}
                                    tone="green"
                                />
                                <StatCard
                                    label="Superficie registrada"
                                    value={formatTotalArea(area)}
                                    detail="Kilómetros cuadrados"
                                    icon={LandPlot}
                                    tone="orange"
                                />
                                <StatCard
                                    label="Regiones"
                                    value={
                                        new Set(
                                            countries.map((country) => country.region),
                                        ).size
                                    }
                                    detail="Categorías geográficas"
                                    icon={ChartNoAxesCombined}
                                    tone="purple"
                                />
                            </div>
                        </section>
                        <FeaturedCountries
                            countries={displayFeatured}
                            onExploreCountry={onExploreCountry}
                        />
                        <RegionExplorer
                            countries={countries}
                            onExplore={onExploreRegion}
                        />
                        <RecentlyVisited countries={displayFeatured} />
                    </>
                )}
            </main>
        </>
    );
}

function HomeLoading() {
    return (
        <div className="home-loading" aria-live="polite">
            <div className="skeleton skeleton-heading"></div>
            <div className="skeleton-grid">
                {Array.from({ length: 4 }, (_, index) => (
                    <div className="skeleton stat-skeleton" key={index}></div>
                ))}
            </div>
            <div className="skeleton skeleton-heading section-skeleton"></div>
            <div className="skeleton-grid cards-skeleton">
                {Array.from({ length: 4 }, (_, index) => (
                    <div className="skeleton card-skeleton" key={index}></div>
                ))}
            </div>
        </div>
    );
}
