import "./CountryProfilePage.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CountryProfileAdditionalDetails } from "../components/country/profile/CountryProfileAdditionalDetails";
import { CountryProfileCulture } from "../components/country/profile/CountryProfileCulture";
import { CountryProfileGeography } from "../components/country/profile/CountryProfileGeography";
import { CountryProfileHeader } from "../components/country/profile/CountryProfileHeader";
import { CountryProfileSummary } from "../components/country/profile/CountryProfileSummary";
import { CountryProfileTabs } from "../components/country/profile/CountryProfileTabs";

export function CountryProfilePage({
    countries,
    loading,
    error,
    favoriteCodes,
    onToggleFavorite,
}) {
    const { countryCode } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("summary");
    const [activeSectionCountry, setActiveSectionCountry] = useState(countryCode);
    const country = countries.find(
        (item) =>
            item.cca3.toLocaleLowerCase("es") === countryCode?.toLocaleLowerCase("es"),
    );
    const borderCountries = useMemo(() => {
        if (!country?.borders?.length) return [];
        const borderCodes = new Set(country.borders.map((code) => code.toUpperCase()));
        return countries.filter(
            (item) =>
                borderCodes.has(item.cca3.toUpperCase()) ||
                borderCodes.has(item.cca2.toUpperCase()),
        );
    }, [countries, country]);
    const visibleSection =
        activeSectionCountry === countryCode ? activeSection : "summary";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [countryCode]);

    function openCountry(nextCountry) {
        navigate(`/pais/${nextCountry.cca3.toLocaleLowerCase("es")}`);
    }

    function returnToExplore() {
        navigate("/explorar");
        window.scrollTo(0, 0);
    }

    function changeSection(nextSection) {
        setActiveSection(nextSection);
        setActiveSectionCountry(countryCode);
    }

    if (loading) {
        return (
            <main className="page-shell country-profile-page country-profile-state">
                <p role="status">Cargando la ficha del país…</p>
            </main>
        );
    }

    if (!country) {
        return (
            <main className="page-shell country-profile-page country-profile-state">
                <strong>No encontramos este país en el catálogo.</strong>
                <span>{error || "Comprueba el enlace e intenta de nuevo."}</span>
                <button type="button" onClick={returnToExplore}>
                    Volver a explorar
                </button>
            </main>
        );
    }

    const sectionProps = { country, borderCountries, onOpenCountry: openCountry };

    return (
        <main className="page-shell country-profile-page">
            <CountryProfileHeader
                country={country}
                favorite={favoriteCodes.has(country.cca3)}
                onToggleFavorite={onToggleFavorite}
                onBack={returnToExplore}
            />
            <CountryProfileTabs
                activeSection={visibleSection}
                onChange={changeSection}
            />
            {visibleSection === "summary" && (
                <CountryProfileSummary {...sectionProps} />
            )}
            {visibleSection === "geography" && (
                <CountryProfileGeography {...sectionProps} />
            )}
            {visibleSection === "culture" && (
                <CountryProfileCulture country={country} />
            )}
            {visibleSection === "details" && (
                <CountryProfileAdditionalDetails country={country} />
            )}
        </main>
    );
}
