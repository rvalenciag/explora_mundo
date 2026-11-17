import { useEffect, useState } from "react";

const favoritesStorageKey = "exploramundo:favorites:v1";

function isCountryCode(code) {
    return typeof code === "string" && /^[A-Z]{3}$/.test(code);
}

function readFavoriteCodes() {
    try {
        const storedCodes = window.localStorage.getItem(favoritesStorageKey);
        const codes = JSON.parse(storedCodes ?? "[]");
        return new Set(Array.isArray(codes) ? codes.filter(isCountryCode) : []);
    } catch {
        return new Set();
    }
}

export function useFavorites() {
    const [favoriteCodes, setFavoriteCodes] = useState(readFavoriteCodes);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                favoritesStorageKey,
                JSON.stringify([...favoriteCodes]),
            );
        } catch {
            // Los favoritos siguen funcionando en memoria si falla el guardado.
        }
    }, [favoriteCodes]);

    function toggleFavorite(code) {
        if (!isCountryCode(code)) return;

        setFavoriteCodes((current) => {
            const next = new Set(current);
            if (next.has(code)) {
                next.delete(code);
            } else {
                next.add(code);
            }
            return next;
        });
    }

    function clearFavorites() {
        setFavoriteCodes(new Set());
    }

    return { favoriteCodes, toggleFavorite, clearFavorites };
}
