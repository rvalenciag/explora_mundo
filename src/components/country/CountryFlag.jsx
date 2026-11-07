import "./CountryFlag.css";

export function CountryFlag({ country, className = "" }) {
    if (country.flagImage) {
        return (
            <img
                className={`country-flag-image ${className}`}
                src={country.flagImage}
                alt={`Bandera de ${country.name}`}
            />
        );
    }

    return (
        <span
            className={`country-flag ${className}`}
            role="img"
            aria-label={`Bandera de ${country.name}`}
        >
            {country.flag}
        </span>
    );
}
