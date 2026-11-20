import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { useCountries } from "./hooks/useCountries";
import { useComparison } from "./hooks/useComparison";
import { useFavorites } from "./hooks/useFavorites";
import { useSettings } from "./hooks/useSettings";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CountryProfilePage } from "./pages/CountryProfilePage";
import { ComparePage } from "./pages/ComparePage";
import { StatisticsPage } from "./pages/StatisticsPage";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import "./App.css";
import "./styles/responsive.css";

function App() {
    const { countries, loading, error } = useCountries();
    const { favoriteCodes, toggleFavorite, clearFavorites } = useFavorites();
    const { settings, setTheme, setCatalogView, setCatalogPageSize, resetSettings } =
        useSettings();
    const {
        comparisonCodes,
        addCountry,
        replaceCountry,
        removeCountry,
        maximumCountries,
    } = useComparison();

    return (
        <div className="app">
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomeRoute
                            countries={countries}
                            loading={loading}
                            error={error}
                            favoriteCodes={favoriteCodes}
                            onToggleFavorite={toggleFavorite}
                        />
                    }
                />
                <Route
                    path="/explorar"
                    element={
                        <ExplorePage
                            countries={countries}
                            loading={loading}
                            error={error}
                            favoriteCodes={favoriteCodes}
                            onToggleFavorite={toggleFavorite}
                            onAddToComparison={addCountry}
                            defaultView={settings.catalogView}
                            defaultPageSize={settings.catalogPageSize}
                            onCatalogViewChange={setCatalogView}
                            onCatalogPageSizeChange={setCatalogPageSize}
                        />
                    }
                />
                <Route
                    path="/explorar/:countryCode"
                    element={
                        <ExplorePage
                            countries={countries}
                            loading={loading}
                            error={error}
                            favoriteCodes={favoriteCodes}
                            onToggleFavorite={toggleFavorite}
                            onAddToComparison={addCountry}
                            defaultView={settings.catalogView}
                            defaultPageSize={settings.catalogPageSize}
                            onCatalogViewChange={setCatalogView}
                            onCatalogPageSizeChange={setCatalogPageSize}
                        />
                    }
                />
                <Route
                    path="/comparar"
                    element={
                        <ComparePage
                            countries={countries}
                            loading={loading}
                            error={error}
                            comparisonCodes={comparisonCodes}
                            onAddCountry={addCountry}
                            onReplaceCountry={replaceCountry}
                            onRemoveCountry={removeCountry}
                            maximumCountries={maximumCountries}
                        />
                    }
                />
                <Route
                    path="/estadisticas"
                    element={
                        <StatisticsPage
                            countries={countries}
                            loading={loading}
                            error={error}
                        />
                    }
                />
                <Route
                    path="/pais/:countryCode"
                    element={
                        <CountryProfilePage
                            countries={countries}
                            loading={loading}
                            error={error}
                            favoriteCodes={favoriteCodes}
                            onToggleFavorite={toggleFavorite}
                            onAddToComparison={addCountry}
                        />
                    }
                />
                <Route
                    path="/favoritos"
                    element={
                        <FavoritesPage
                            countries={countries}
                            loading={loading}
                            error={error}
                            favoriteCodes={favoriteCodes}
                            onToggleFavorite={toggleFavorite}
                            onClearFavorites={clearFavorites}
                        />
                    }
                />
                <Route
                    path="/configuracion"
                    element={
                        <SettingsPage
                            settings={settings}
                            onThemeChange={setTheme}
                            onCatalogViewChange={setCatalogView}
                            onCatalogPageSizeChange={setCatalogPageSize}
                            onReset={resetSettings}
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

function HomeRoute({ countries, loading, error, favoriteCodes, onToggleFavorite }) {
    const navigate = useNavigate();

    function openExplore({ country = null, region = "" } = {}) {
        const pathname = country
            ? `/explorar/${country.cca3.toLowerCase()}`
            : "/explorar";
        const search = region ? `?${new URLSearchParams({ region }).toString()}` : "";

        navigate({ pathname, search });
        window.scrollTo(0, 0);
    }

    function openCompare() {
        navigate("/comparar");
        window.scrollTo(0, 0);
    }

    return (
        <HomePage
            countries={countries}
            loading={loading}
            error={error}
            favoriteCodes={favoriteCodes}
            onToggleFavorite={onToggleFavorite}
            onExplore={openExplore}
            onCompare={openCompare}
            onExploreCountry={(country) => openExplore({ country })}
            onExploreRegion={(region) => openExplore({ region })}
        />
    );
}

export default App;
