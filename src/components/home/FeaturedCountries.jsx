import { CountryCard } from "../country/CountryCard";
import { SectionHeader } from "../common/SectionHeader";
import { Link } from "react-router-dom";

export function FeaturedCountries({
    countries,
    favoriteCodes,
    onExploreCountry,
    onToggleFavorite,
}) {
    return (
        <section className="content-section">
            <SectionHeader
                title="Países destacados"
                description="Una selección para descubrir países interesantes."
                action={
                    <Link
                        to="/explorar"
                        className="text-button"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Ver todos los países
                    </Link>
                }
            />
            <div className="country-grid featured-grid">
                {countries.map((country) => (
                    <CountryCard
                        key={country.cca3}
                        country={country}
                        favorite={favoriteCodes.has(country.cca3)}
                        onExplore={onExploreCountry}
                        onToggleFavorite={onToggleFavorite}
                    />
                ))}
            </div>
        </section>
    );
}
