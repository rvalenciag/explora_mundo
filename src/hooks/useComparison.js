import { useEffect, useState } from "react";

const comparisonStorageKey = "exploramundo:comparison:v1";
const maximumCountries = 3;

function isCountryCode(code) {
    return typeof code === "string" && /^[A-Z]{3}$/.test(code);
}

function readComparisonCodes() {
    try {
        const storedCodes = window.localStorage.getItem(comparisonStorageKey);
        const codes = JSON.parse(storedCodes ?? "[]");
        if (!Array.isArray(codes)) return [];
        return [...new Set(codes.filter(isCountryCode))].slice(0, maximumCountries);
    } catch {
        return [];
    }
}

export function useComparison() {
    const [comparisonCodes, setComparisonCodes] = useState(readComparisonCodes);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                comparisonStorageKey,
                JSON.stringify(comparisonCodes),
            );
        } catch {
            // La comparación sigue disponible mientras dure la sesión.
        }
    }, [comparisonCodes]);

    function addCountry(code) {
        if (!isCountryCode(code)) return;
        setComparisonCodes((current) => {
            if (current.includes(code) || current.length >= maximumCountries)
                return current;
            return [...current, code];
        });
    }

    function replaceCountry(index, code) {
        if (!isCountryCode(code)) return;
        setComparisonCodes((current) => {
            if (current.includes(code) || index < 0 || index >= maximumCountries)
                return current;
            const next = [...current];
            if (index >= next.length) {
                if (next.length < maximumCountries) next.push(code);
            } else {
                next[index] = code;
            }
            return next;
        });
    }

    function removeCountry(code) {
        setComparisonCodes((current) => current.filter((item) => item !== code));
    }

    return {
        comparisonCodes,
        addCountry,
        replaceCountry,
        removeCountry,
        maximumCountries,
    };
}
