import "./FavoritesPage.css";
import { ArrowDownUp, Heart, Info, Search, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CatalogResults } from "../components/catalog/CatalogResults";

function normalizeSearch(text) {
    return (text ?? "").toLocaleLowerCase("es").normalize("NFD").replace(/\p{M}/gu, "");
}

function compareCountries(first, second, order) {
    switch (order) {
        case "name-desc":
            return second.name.localeCompare(first.name, "es");
        case "population-desc":
            return second.population - first.population;
        case "population-asc":
            return first.population - second.population;
        default:
            return first.name.localeCompare(second.name, "es");
    }
}

export function FavoritesPage({
    countries,
    loading,
    error,
    favoriteCodes,
    onToggleFavorite,
    onClearFavorites,
}) {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("name-asc");
    const clearDialog = useRef(null);
    const navigate = useNavigate();

    const total = favoriteCodes.size;
    const favoriteCountries = countries.filter((country) =>
        favoriteCodes.has(country.cca3),
    );
    const query = normalizeSearch(search.trim());
    const results = favoriteCountries
        .filter(
            (country) =>
                normalizeSearch(country.name).includes(query) ||
                normalizeSearch(country.officialName).includes(query),
        )
        .sort((first, second) => compareCountries(first, second, order));
    const controlsDisabled = loading || Boolean(error) || !favoriteCountries.length;

    function openCountry(country) {
        navigate(`/explorar/${country.cca3.toLowerCase()}`);
        window.scrollTo(0, 0);
    }

    function clearCollection() {
        onClearFavorites();
        setSearch("");
    }

    let collectionState;
    if (loading) {
        collectionState = (
            <p role="status">Cargando los datos de tus países favoritos…</p>
        );
    } else if (error) {
        collectionState = <p role="alert">{error}</p>;
    } else if (!total) {
        collectionState = (
            <>
                <strong>Todavía no tienes países favoritos.</strong>
                <span>Marca un país con el corazón para guardarlo aquí.</span>
                <Link to="/explorar" onClick={() => window.scrollTo(0, 0)}>
                    Explorar países
                </Link>
            </>
        );
    } else if (!favoriteCountries.length) {
        collectionState = (
            <p>Tus países guardados no están disponibles en el catálogo.</p>
        );
    } else if (!results.length) {
        collectionState = (
            <>
                <strong>No encontramos países con esa búsqueda.</strong>
                <span>Prueba con otro nombre.</span>
            </>
        );
    }

    return (
        <main className="page-shell favorites-page">
            <header className="favorites-heading">
                <div>
                    <h1>Países favoritos</h1>
                    <p>Guarda y consulta los países que más te interesan</p>
                </div>
                <span className="favorites-badge favorites-total">
                    <Heart aria-hidden="true" />
                    {total} {total === 1 ? "guardado" : "guardados"}
                </span>
            </header>

            <section className="favorites-summary" aria-labelledby="favorites-title">
                <span className="favorites-panel-icon">
                    <Heart aria-hidden="true" />
                </span>
                <div>
                    <h2 id="favorites-title">Tu colección de países</h2>
                    <p>
                        {total === 1
                            ? "1 país guardado para consultarlo cuando quieras."
                            : `${total} países guardados para consultarlos cuando quieras.`}
                    </p>
                </div>
            </section>

            <div className="favorites-controls">
                <label className="favorites-search">
                    <Search aria-hidden="true" />
                    <input
                        type="search"
                        aria-label="Buscar entre mis favoritos"
                        placeholder="Buscar entre mis favoritos..."
                        disabled={controlsDisabled}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>
                <label className="favorites-sort">
                    <ArrowDownUp aria-hidden="true" />
                    <span>Ordenar por:</span>
                    <select
                        disabled={controlsDisabled}
                        value={order}
                        onChange={(event) => setOrder(event.target.value)}
                    >
                        <option value="name-asc">Nombre A–Z</option>
                        <option value="name-desc">Nombre Z–A</option>
                        <option value="population-desc">Población (mayor)</option>
                        <option value="population-asc">Población (menor)</option>
                    </select>
                </label>
                <button
                    className="favorites-clear"
                    type="button"
                    disabled={!total}
                    onClick={() => clearDialog.current.showModal()}
                >
                    <Trash2 aria-hidden="true" />
                    Vaciar favoritos
                </button>
            </div>

            <section aria-labelledby="favorites-results-title">
                <header className="favorites-results-heading">
                    <div>
                        <h2 id="favorites-results-title">Tus países guardados</h2>
                        <p>
                            Abre un país o toca el corazón para quitarlo de tus
                            favoritos.
                        </p>
                    </div>
                    <span className="favorites-badge" role="status">
                        {results.length}{" "}
                        {results.length === 1 ? "resultado" : "resultados"}
                    </span>
                </header>
                {collectionState ? (
                    <div className="empty-results favorites-state">
                        {collectionState}
                    </div>
                ) : (
                    <CatalogResults
                        countries={results}
                        favoriteCodes={favoriteCodes}
                        onExplore={openCountry}
                        onToggleFavorite={onToggleFavorite}
                        view="grid"
                    />
                )}
            </section>

            <footer className="favorites-storage">
                <span className="favorites-panel-icon">
                    <Info aria-hidden="true" />
                </span>
                <div>
                    <strong>Tus favoritos, siempre a mano</strong>
                    <p>
                        Guardados en este navegador, sin cuenta de usuario y sin
                        sincronización entre dispositivos.
                    </p>
                </div>
            </footer>

            <dialog
                className="favorites-dialog"
                ref={clearDialog}
                aria-labelledby="favorites-clear-title"
                aria-describedby="favorites-clear-description"
            >
                <h2 id="favorites-clear-title">¿Vaciar favoritos?</h2>
                <p id="favorites-clear-description">
                    Se quitarán todos los países guardados de tu colección.
                </p>
                <form method="dialog">
                    <button type="submit" autoFocus>
                        Cancelar
                    </button>
                    <button
                        className="favorites-clear"
                        type="submit"
                        onClick={clearCollection}
                    >
                        Vaciar favoritos
                    </button>
                </form>
            </dialog>
        </main>
    );
}
