import "./ComparisonCountrySelector.css";
import { ChevronDown } from "lucide-react";

export function ComparisonCountrySelector({
    countries,
    selectedCodes,
    value,
    onChange,
}) {
    return (
        <label className="comparison-country-selector">
            <span className="sr-only">Seleccionar país para comparar</span>
            <select
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="">Seleccionar país</option>
                {countries.map((country) => (
                    <option
                        disabled={
                            selectedCodes.includes(country.cca3) &&
                            country.cca3 !== value
                        }
                        key={country.cca3}
                        value={country.cca3}
                    >
                        {country.name}
                    </option>
                ))}
            </select>
            <ChevronDown aria-hidden="true" />
        </label>
    );
}
