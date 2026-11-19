import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { useCountries } from "./hooks/useCountries";
import { useFavorites } from "./hooks/useFavorites";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CountryProfilePage } from "./pages/CountryProfilePage";
import { HomePage } from "./pages/HomePage";
import "./App.css";
import "./styles/responsive.css";

function App() {
    const { countries, loading, error } = useCountries();
    const { favoriteCodes, toggleFavorite, clearFavorites } = useFavorites();

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

    return (
        <HomePage
            countries={countries}
            loading={loading}
            error={error}
            favoriteCodes={favoriteCodes}
            onToggleFavorite={onToggleFavorite}
            onExplore={openExplore}
            onExploreCountry={(country) => openExplore({ country })}
            onExploreRegion={(region) => openExplore({ region })}
        />
    );
}

export default App;
