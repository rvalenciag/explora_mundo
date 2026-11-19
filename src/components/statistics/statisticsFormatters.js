import { formatArea, formatPopulation } from "../../utils/countryFormatters";

export const regionColors = [
    "#2869e6",
    "#0aa4b9",
    "#59bd3c",
    "#f6b417",
    "#f27742",
    "#8750d5",
];

export function densityValue(country) {
    if (!country.area || country.area <= 0 || !country.population) return 0;
    return country.population / country.area;
}

export function formatDensity(value) {
    if (!value) return "No disponible";
    return `${value.toLocaleString("es-BO", { maximumFractionDigits: 1 })} Hab./km²`;
}

export function formatCompactPopulation(value) {
    if (!value) return "0 Hab.";
    if (value >= 1000000000) {
        return `${(value / 1000000000).toLocaleString("es-BO", { maximumFractionDigits: 2 })} mil M`;
    }
    if (value >= 1000000) {
        return `${(value / 1000000).toLocaleString("es-BO", { maximumFractionDigits: 1 })} M`;
    }
    return formatPopulation(value);
}

export function sortCountries(countries, order) {
    return [...countries].sort((first, second) => {
        if (order === "population-asc") return first.population - second.population;
        if (order === "area-desc") return second.area - first.area;
        if (order === "area-asc") return first.area - second.area;
        if (order === "density-desc") return densityValue(second) - densityValue(first);
        if (order === "density-asc") return densityValue(first) - densityValue(second);
        if (order === "name-asc") return first.name.localeCompare(second.name, "es");
        return second.population - first.population;
    });
}

export { formatArea, formatPopulation };
