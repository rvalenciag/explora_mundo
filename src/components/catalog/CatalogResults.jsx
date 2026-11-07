import { CountryCard } from "../country/CountryCard";
import { CountryListItem } from "../country/CountryListItem";

export function CatalogResults({
    countries,
    favoriteCodes,
    onExplore,
    onToggleFavorite,
    view,
}) {
    if (!countries.length) {
        return (
            <div className="empty-results">
                <strong>No encontramos países con esos filtros.</strong>
                <span>Prueba con otro nombre o restablece los filtros.</span>
            </div>
        );
    }
    return (
        <div className={view === "grid" ? "country-grid catalog-grid" : "country-list"}>
            {countries.map((country) =>
                view === "grid" ? (
                    <CountryCard
                        key={country.cca3}
                        country={country}
                        favorite={favoriteCodes.has(country.cca3)}
                        onExplore={onExplore}
                        onToggleFavorite={onToggleFavorite}
                    />
                ) : (
                    <CountryListItem
                        key={country.cca3}
                        country={country}
                        favorite={favoriteCodes.has(country.cca3)}
                        onExplore={onExplore}
                        onToggleFavorite={onToggleFavorite}
                    />
                ),
            )}
        </div>
    );
}
