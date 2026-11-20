import { useEffect, useMemo, useState } from "react";
import { selectFeaturedCountries } from "../utils/featuredCountries";

const storageKey = "exploramundo:featured:v1";
const rotationDuration = 60 * 60 * 1000;
const maximumHistory = 12;

function readRotation() {
    try {
        const stored = JSON.parse(window.localStorage.getItem(storageKey));
        if (!Array.isArray(stored?.codes))
            return { codes: [], expiresAt: 0, history: [] };

        return {
            codes: stored.codes.filter((code) => typeof code === "string"),
            expiresAt: Number(stored.expiresAt) || 0,
            history: Array.isArray(stored.history)
                ? stored.history.filter((code) => typeof code === "string")
                : [],
        };
    } catch {
        return { codes: [], expiresAt: 0, history: [] };
    }
}

function rotationIsAvailable(rotation, countries) {
    if (rotation.expiresAt <= Date.now() || rotation.codes.length !== 4) return false;
    const availableCodes = new Set(countries.map((country) => country.cca3));
    return rotation.codes.every((code) => availableCodes.has(code));
}

function createRotation(countries, previousRotation) {
    const featured = selectFeaturedCountries(countries, previousRotation.history);
    return {
        codes: featured.map((country) => country.cca3),
        expiresAt: Date.now() + rotationDuration,
        history: [
            ...new Set([...previousRotation.history, ...previousRotation.codes]),
        ].slice(-maximumHistory),
    };
}

export function useFeaturedCountries(countries) {
    const [rotation, setRotation] = useState(readRotation);
    const activeRotation = useMemo(() => {
        if (!countries.length || rotationIsAvailable(rotation, countries))
            return rotation;
        return createRotation(countries, rotation);
    }, [countries, rotation]);

    useEffect(() => {
        if (!countries.length) return undefined;

        if (activeRotation !== rotation) {
            window.localStorage.setItem(storageKey, JSON.stringify(activeRotation));
        }

        const timeout = window.setTimeout(
            () => setRotation({ ...activeRotation, expiresAt: 0 }),
            Math.max(activeRotation.expiresAt - Date.now(), 0),
        );
        return () => window.clearTimeout(timeout);
    }, [activeRotation, countries.length, rotation]);

    return useMemo(() => {
        const countryByCode = new Map(
            countries.map((country) => [country.cca3, country]),
        );
        return activeRotation.codes
            .map((code) => countryByCode.get(code))
            .filter(Boolean);
    }, [activeRotation.codes, countries]);
}
