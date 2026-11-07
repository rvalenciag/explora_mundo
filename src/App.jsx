import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { useCountries } from "./hooks/useCountries";
import { ExplorePage } from "./pages/ExplorePage";
import { HomePage } from "./pages/HomePage";
import "./App.css";
import "./styles/responsive.css";

function App() {
    const { countries, loading, error } = useCountries();

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
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

function HomeRoute({ countries, loading, error }) {
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
            onExplore={openExplore}
            onExploreCountry={(country) => openExplore({ country })}
            onExploreRegion={(region) => openExplore({ region })}
        />
    );
}

export default App;
