import "./ComparePage.css";
import { useMemo, useState } from "react";
import { Maximize2, UsersRound } from "lucide-react";
import { ComparisonBarChart } from "../components/comparison/ComparisonBarChart";
import { ComparisonCountrySlot } from "../components/comparison/ComparisonCountrySlot";
import { ComparisonDetailTable } from "../components/comparison/ComparisonDetailTable";
import { chartItems } from "../components/comparison/comparisonFormatters";
import { formatArea, formatPopulation } from "../utils/countryFormatters";

export function ComparePage({
    countries,
    loading,
    error,
    comparisonCodes,
    onAddCountry,
    onReplaceCountry,
    onRemoveCountry,
    maximumCountries,
}) {
    const [onlyDifferences, setOnlyDifferences] = useState(false);
    const selectedCountries = useMemo(
        () =>
            comparisonCodes
                .map((code) => countries.find((country) => country.cca3 === code))
                .filter(Boolean),
        [comparisonCodes, countries],
    );
    const sortedCountries = useMemo(
        () =>
            [...countries].sort((first, second) =>
                first.name.localeCompare(second.name, "es"),
            ),
        [countries],
    );

    function selectCountry(index, code) {
        const currentCountry = selectedCountries[index];
        if (!code) {
            if (currentCountry) onRemoveCountry(currentCountry.cca3);
            return;
        }
        if (currentCountry) {
            onReplaceCountry(index, code);
        } else {
            onAddCountry(code);
        }
    }

    return (
        <main className="page-shell compare-page">
            <header className="compare-page-heading">
                <div>
                    <h1>Comparar países</h1>
                    <p>
                        Analiza similitudes y diferencias de hasta tres países con datos
                        de REST Countries.
                    </p>
                </div>
                <span className="compare-selected-count">
                    {selectedCountries.length} de {maximumCountries} países
                    seleccionados
                </span>
            </header>

            {error && (
                <p className="compare-notice" role="alert">
                    {error}
                </p>
            )}
            {loading && (
                <p className="compare-notice" role="status">
                    Cargando países…
                </p>
            )}

            <section
                className="comparison-country-slots"
                aria-label="Países seleccionados"
            >
                {Array.from({ length: maximumCountries }, (_, index) => (
                    <ComparisonCountrySlot
                        country={selectedCountries[index]}
                        countries={sortedCountries}
                        index={index}
                        key={selectedCountries[index]?.cca3 ?? `empty-${index}`}
                        selectedCodes={comparisonCodes}
                        onRemove={onRemoveCountry}
                        onSelect={(code) => selectCountry(index, code)}
                    />
                ))}
            </section>

            {selectedCountries.length ? (
                <div className="comparison-results">
                    <section
                        className="comparison-chart-grid"
                        aria-label="Indicadores comparados"
                    >
                        <ComparisonBarChart
                            icon={UsersRound}
                            title="Población"
                            description="Habitantes registrados"
                            items={chartItems(
                                selectedCountries,
                                "population",
                                formatPopulation,
                            )}
                        />
                        <ComparisonBarChart
                            icon={Maximize2}
                            title="Superficie"
                            description="Kilómetros cuadrados"
                            items={chartItems(selectedCountries, "area", formatArea)}
                        />
                    </section>
                    <ComparisonDetailTable
                        countries={selectedCountries}
                        onlyDifferences={onlyDifferences}
                        onOnlyDifferencesChange={setOnlyDifferences}
                    />
                </div>
            ) : (
                <section className="comparison-empty-state">
                    <UsersRound aria-hidden="true" />
                    <h2>Elige países para comenzar</h2>
                    <p>
                        Selecciona hasta tres países para comparar población,
                        territorio, geografía, cultura e identificadores.
                    </p>
                </section>
            )}
        </main>
    );
}
