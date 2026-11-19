const unavailable = "No disponible";

export function countryValue(value) {
    return value === undefined || value === null || value === "" ? unavailable : value;
}

export function booleanValue(value) {
    if (typeof value !== "boolean") return unavailable;
    return value ? "Sí" : "No";
}

export function currenciesValue(currencies) {
    if (!currencies?.length) return unavailable;
    return currencies
        .map((currency) => {
            const code = currency.code ? ` (${currency.code})` : "";
            return `${currency.name ?? unavailable}${code}`;
        })
        .join(" · ");
}

export function currencyCodes(currencies) {
    const codes = currencies?.map((currency) => currency.code).filter(Boolean) ?? [];
    return codes.length ? codes.join(" · ") : unavailable;
}

export { unavailable };
