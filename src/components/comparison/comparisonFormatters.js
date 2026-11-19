import { formatArea } from "../../utils/countryFormatters";

const unavailable = "No disponible";

function valueOrUnavailable(value) {
    return value === undefined || value === null || value === "" ? unavailable : value;
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

export function comparisonRows(countries) {
    return [
        {
            title: "Geografía",
            rows: [
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
                    label: "Superficie",
                    values: countries.map((country) => formatArea(country.area)),
                },
                {
                    label: "Sin salida al mar",
                    values: countries.map((country) =>
                        typeof country.landlocked === "boolean"
                            ? country.landlocked
                                ? "Sí"
                                : "No"
                            : unavailable,
                    ),
                },
                {
                    label: "Zona horaria",
                    values: countries.map((country) =>
                        country.timezones?.length
                            ? country.timezones.join(" · ")
                            : unavailable,
                    ),
                },
            ],
        },
        {
            title: "Cultura y economía",
            rows: [
                {
                    label: "Moneda",
                    values: countries.map((country) =>
                        currenciesValue(country.currencies),
                    ),
                },
                {
                    label: "Idiomas",
                    values: countries.map((country) =>
                        country.languages?.length
                            ? country.languages.join(" · ")
                            : unavailable,
                    ),
                },
                {
                    label: "Gentilicio",
                    values: countries.map((country) =>
                        valueOrUnavailable(country.demonym),
                    ),
                },
            ],
        },
        {
            title: "Identificadores",
            rows: [
                {
                    label: "Códigos ISO",
                    values: countries.map(
                        (country) => `${country.cca2} / ${country.cca3}`,
                    ),
                },
                {
                    label: "Dominio de internet",
                    values: countries.map((country) => valueOrUnavailable(country.tld)),
                },
            ],
        },
    ];
}

export function chartItems(countries, key, formatter) {
    return countries.map((country) => ({
        code: country.cca3,
        label: country.name,
        value: Number(country[key]) || 0,
        formattedValue: formatter(country[key]),
    }));
}
