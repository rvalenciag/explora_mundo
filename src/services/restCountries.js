const baseUrl = import.meta.env.VITE_REST_COUNTRIES_BASE_URL;
const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

const regionNames = {
    Americas: "Américas",
    Africa: "África",
    Antarctica: "Antártida",
    Antarctic: "Antártida",
    Asia: "Asia",
    Europe: "Europa",
    Oceania: "Oceanía",
};

const subregionNames = {
    "Central Asia": "Asia Central",
    "Eastern Asia": "Asia Oriental",
    "Northern Africa": "África Septentrional",
    "Northern America": "América del Norte",
    "North America": "América del Norte",
    "Northern Europe": "Europa Septentrional",
    "South-eastern Asia": "Asia Sudoriental",
    "Southern Africa": "África Meridional",
    "Southern Asia": "Asia del Sur",
    "Southern Europe": "Europa Meridional",
    "Western Africa": "África Occidental",
    "Western Asia": "Asia Occidental",
    "Western Europe": "Europa Occidental",
    "Central America": "América Central",
    "South America": "América del Sur",
    Caribbean: "Caribe",
    "Australia and New Zealand": "Australia y Nueva Zelanda",
    Melanesia: "Melanesia",
    Micronesia: "Micronesia",
    Polynesia: "Polinesia",
};

const continentNames = {
    Africa: "África",
    Antarctica: "Antártida",
    Asia: "Asia",
    Europe: "Europa",
    "North America": "América del Norte",
    "South America": "América del Sur",
    Oceania: "Oceanía",
};

const languageNames = {
    Spanish: "Español",
    English: "Inglés",
    French: "Francés",
    German: "Alemán",
    Portuguese: "Portugués",
};

const weekDayNames = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
};

function normalizeCountry(country) {
    return {
        name:
            country.names?.translations?.spa?.common ??
            country.names?.common ??
            "Sin nombre",
        officialName:
            country.names?.translations?.spa?.official ?? country.names?.official,
        flag: country.flag?.emoji ?? "🏳️",
        flagImage: country.flag?.url_svg ?? country.flag?.url_png,
        cca2: country.codes?.alpha_2 ?? "--",
        cca3: country.codes?.alpha_3 ?? "---",
        region: regionNames[country.region] ?? country.region ?? "Sin región",
        subregion:
            subregionNames[country.subregion] ?? country.subregion ?? "Sin subregión",
        capital:
            country.capitals?.find((capital) => capital.attributes?.primary)?.name ??
            country.capitals?.[0]?.name ??
            "No disponible",
        population: Number(country.population) || 0,
        area: Number(country.area?.kilometers) || 0,
        coordinates: country.coordinates
            ? [country.coordinates.lat, country.coordinates.lng]
            : null,
        continent:
            continentNames[country.continents?.[0]] ??
            country.continents?.[0] ??
            "No disponible",
        timezones: country.timezones ?? [],
        languages: (country.languages ?? []).map(
            (language) => languageNames[language.name] ?? language.name,
        ),
        currencies: (country.currencies ?? []).map((currency) => ({
            code: currency.code,
            name: currency.name,
            symbol: currency.symbol,
        })),
        demonym:
            country.demonyms?.spa?.m ?? country.demonyms?.eng?.m ?? "No disponible",
        tld: country.tlds?.[0] ?? "No disponible",
        callingCode: country.calling_codes?.[0]
            ? `+${country.calling_codes[0]}`
            : "No disponible",
        weekStart: weekDayNames[country.date?.start_of_week] ?? "No disponible",
        drivingSide:
            country.cars?.driving_side === "right"
                ? "Derecha"
                : country.cars?.driving_side === "left"
                  ? "Izquierda"
                  : "No disponible",
        borders: country.borders ?? [],
        landlocked: country.landlocked,
        wikipedia: country.links?.wikipedia,
        mapUrl: country.links?.google_maps ?? country.links?.open_street_maps,
    };
}

async function fetchPage(url) {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error(`No se pudieron cargar los países (${response.status}).`);
    }

    const payload = await response.json();
    return {
        countries:
            payload.data?.objects ??
            payload.data?.countries ??
            payload.countries ??
            payload.data ??
            payload,
        meta: payload.data?.meta,
    };
}

export async function fetchCountries(query = "") {
    if (!baseUrl || !apiKey) {
        throw new Error(
            "Configura VITE_REST_COUNTRIES_BASE_URL y VITE_REST_COUNTRIES_API_KEY en .env.",
        );
    }

    const url = new URL(baseUrl);
    if (query.trim()) {
        url.searchParams.set("q", query.trim());
        const result = await fetchPage(url);
        return result.countries.map(normalizeCountry);
    }

    const countries = [];
    let offset = 0;
    const limit = 100;
    let more = true;

    while (more) {
        const pageUrl = new URL(url);
        pageUrl.searchParams.set("limit", limit);
        pageUrl.searchParams.set("offset", offset);
        const result = await fetchPage(pageUrl);
        countries.push(...result.countries);
        more = Boolean(result.meta?.more);
        offset += result.countries.length;
    }

    return countries.map(normalizeCountry);
}
