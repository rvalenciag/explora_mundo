import { formatArea, formatCoordinates } from "../../utils/countryFormatters";

const unavailable = "No disponible";

function valueOrUnavailable(value) {
    return value === undefined || value === null || value === "" ? unavailable : value;
}

function booleanValue(value) {
    if (typeof value !== "boolean") return unavailable;
    return value ? "Sí" : "No";
}

function currenciesValue(currencies) {
    if (!currencies?.length) return unavailable;
    return currencies
        .map(
            (currency) =>
                `${currency.name ?? unavailable}${currency.code ? ` (${currency.code})` : ""}`,
        )
        .join(" · ");
}

function currencyCodesAndSymbols(currencies) {
    if (!currencies?.length) return unavailable;
    return currencies
        .map((currency) => {
            if (!currency.code) return valueOrUnavailable(currency.symbol);
            return currency.symbol
                ? `${currency.code} (${currency.symbol})`
                : currency.code;
        })
        .join(" · ");
}

function resolveCountryName(code, countries) {
    if (!code) return unavailable;
    const country = countries.find((item) => item.cca3 === code || item.cca2 === code);
    return country?.name ?? code;
}

function borderNames(country, countries) {
    if (!country.borders?.length) return unavailable;
    return country.borders
        .map((code) => resolveCountryName(code, countries))
        .join(" · ");
}

function territorialCondition(country) {
    if (country.landlocked === true) return "Sin salida al mar";
    if (country.landlocked === false && !country.borders?.length) {
        return "Sin fronteras terrestres";
    }
    if (country.landlocked === false) return "Con litoral y fronteras terrestres";
    return unavailable;
}

export function densityValue(country) {
    if (!country.area || country.area <= 0 || !country.population) return 0;
    return country.population / country.area;
}

export function formatDensity(value) {
    if (!value) return unavailable;
    return `${value.toLocaleString("es-BO", { maximumFractionDigits: 1 })} Hab./km²`;
}

function formatCount(value, singular, plural) {
    const quantity = Number(value) || 0;
    return `${quantity} ${quantity === 1 ? singular : plural}`;
}

export function comparisonRows(countries, allCountries) {
    return [
        {
            title: "Geografía",
            rows: [
                {
                    label: "Continente",
                    values: countries.map((country) => country.continent),
                },
                { label: "Región", values: countries.map((country) => country.region) },
                {
                    label: "Subregión",
                    values: countries.map((country) => country.subregion),
                },
                {
                    label: "Capital",
                    values: countries.map((country) => country.capital),
                },
                {
                    label: "Coordenadas",
                    values: countries.map((country) =>
                        formatCoordinates(country.coordinates),
                    ),
                },
                {
                    label: "Superficie",
                    values: countries.map((country) => formatArea(country.area)),
                },
                {
                    label: "Densidad poblacional",
                    values: countries.map((country) =>
                        formatDensity(densityValue(country)),
                    ),
                },
                {
                    label: "Condición territorial",
                    values: countries.map(territorialCondition),
                },
                {
                    label: "Fronteras terrestres",
                    values: countries.map((country) =>
                        formatCount(country.borders?.length, "frontera", "fronteras"),
                    ),
                },
                {
                    label: "Países fronterizos",
                    values: countries.map((country) =>
                        borderNames(country, allCountries),
                    ),
                },
                {
                    label: "Zonas horarias",
                    values: countries.map((country) =>
                        formatCount(country.timezones?.length, "zona", "zonas"),
                    ),
                },
                {
                    label: "Detalle horario",
                    values: countries.map((country) =>
                        country.timezones?.length
                            ? country.timezones.join(" · ")
                            : unavailable,
                    ),
                },
            ],
        },
        {
            title: "Cultura y vida cotidiana",
            rows: [
                {
                    label: "Moneda",
                    values: countries.map((country) =>
                        currenciesValue(country.currencies),
                    ),
                },
                {
                    label: "Código y símbolo monetario",
                    values: countries.map((country) =>
                        currencyCodesAndSymbols(country.currencies),
                    ),
                },
                {
                    label: "Idiomas registrados",
                    values: countries.map((country) =>
                        formatCount(country.languages?.length, "idioma", "idiomas"),
                    ),
                },
                {
                    label: "Detalle de idiomas",
                    values: countries.map((country) =>
                        country.languages?.length
                            ? country.languages.join(" · ")
                            : unavailable,
                    ),
                },
                {
                    label: "Gentilicio masculino",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.demonym),
                    ),
                },
                {
                    label: "Gentilicio femenino",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.demonymFemale),
                    ),
                },
                {
                    label: "Inicio de semana",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.weekStart),
                    ),
                },
                {
                    label: "Sentido de circulación",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.drivingSide),
                    ),
                },
                {
                    label: "Prefijo telefónico",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.callingCode),
                    ),
                },
            ],
        },
        {
            title: "Estado y clasificación",
            rows: [
                {
                    label: "Nombre oficial",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.officialName),
                    ),
                },
                {
                    label: "Código ISO alfa-2",
                    values: countries.map((country) => country.cca2),
                },
                {
                    label: "Código ISO alfa-3",
                    values: countries.map((country) => country.cca3),
                },
                {
                    label: "Código numérico ISO",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.numericCode),
                    ),
                },
                {
                    label: "Dominio de internet",
                    values: countries.map((country) => valueOrUnavailable(country.tld)),
                },
                {
                    label: "Estado soberano",
                    values: countries.map((country) =>
                        booleanValue(country.independent),
                    ),
                },
                {
                    label: "Miembro de la ONU",
                    values: countries.map((country) => booleanValue(country.unMember)),
                },
                {
                    label: "Territorio dependiente",
                    values: countries.map((country) => booleanValue(country.dependent)),
                },
                {
                    label: "Tipo de dependencia",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.dependencyType),
                    ),
                },
                {
                    label: "Reconocimiento disputado",
                    values: countries.map((country) => booleanValue(country.disputed)),
                },
                {
                    label: "Estatus ISO",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.isoStatus),
                    ),
                },
                {
                    label: "País o territorio padre",
                    values: countries.map((country) =>
                        resolveCountryName(country.parentCode, allCountries),
                    ),
                },
            ],
        },
    ];
}

export function chartItems(countries, accessor, formatter) {
    return countries.map((country) => {
        const value =
            typeof accessor === "function"
                ? accessor(country)
                : Number(country[accessor]) || 0;
        return {
            code: country.cca3,
            label: country.name,
            value,
            formattedValue: formatter(value),
        };
    });
}
