import { useEffect, useState } from "react";
import { fetchCountries } from "../services/restCountries";

export function useCountries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadCountries() {
            try {
                const data = await fetchCountries();
                if (active && data?.length) {
                    setCountries(data);
                }
            } catch (requestError) {
                if (active) {
                    setError(requestError.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadCountries();
        return () => {
            active = false;
        };
    }, []);

    return { countries, loading, error };
}
