const unavailable = "No disponible";

export function formatPopulation(value) {
    if (!value && value !== 0) return unavailable;
    return `${value.toLocaleString("es-BO", { maximumFractionDigits: 0 })} Hab.`;
}

export function formatArea(value) {
    if (!value && value !== 0) return unavailable;
    return `${value.toLocaleString("es-BO", { maximumFractionDigits: 0 })} km²`;
}

export function formatTotalArea(value) {
    if (!value && value !== 0) return unavailable;
    if (value >= 1000000) {
        return `${(value / 1000000).toLocaleString("es-BO", { maximumFractionDigits: 1 })} M km²`;
    }
    return formatArea(value);
}

export function formatCoordinates(coordinates) {
    if (!coordinates?.length) return unavailable;
    const [latitude, longitude] = coordinates;
    const coordinateOptions = { maximumFractionDigits: 2 };
    const latValue = Math.abs(latitude).toLocaleString("es-BO", coordinateOptions);
    const lonValue = Math.abs(longitude).toLocaleString("es-BO", coordinateOptions);
    const lat = `${latValue}° ${latitude >= 0 ? "N" : "S"}`;
    const lon = `${lonValue}° ${longitude >= 0 ? "E" : "O"}`;
    return `${lat} · ${lon}`;
}
