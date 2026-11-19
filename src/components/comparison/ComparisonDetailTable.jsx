import "./ComparisonDetailTable.css";
import { Columns3 } from "lucide-react";
import { CountryFlag } from "../country/CountryFlag";
import { comparisonRows } from "./comparisonFormatters";
import { ComparisonSectionHeading } from "./ComparisonSectionHeading";

function valuesDiffer(values) {
    return new Set(values).size > 1;
}

export function ComparisonDetailTable({
    countries,
    onlyDifferences,
    onOnlyDifferencesChange,
}) {
    const sections = comparisonRows(countries)
        .map((section) => ({
            ...section,
            rows: onlyDifferences
                ? section.rows.filter((row) => valuesDiffer(row.values))
                : section.rows,
        }))
        .filter((section) => section.rows.length);

    return (
        <section className="comparison-details-card">
            <ComparisonSectionHeading
                icon={Columns3}
                title="Comparación detallada"
                description="Geografía, cultura e identificadores internacionales"
                actions={
                    <label className="comparison-differences-toggle">
                        <input
                            type="checkbox"
                            checked={onlyDifferences}
                            onChange={(event) =>
                                onOnlyDifferencesChange(event.target.checked)
                            }
                        />
                        <span aria-hidden="true" />
                        Solo diferencias
                    </label>
                }
            />
            <div className="comparison-table-wrap">
                <table className="comparison-detail-table">
                    <thead>
                        <tr>
                            <th>Característica</th>
                            {countries.map((country, index) => (
                                <th className={`tone-${index + 1}`} key={country.cca3}>
                                    <span>
                                        <CountryFlag country={country} />
                                        {country.name}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section) => (
                            <SectionRows key={section.title} section={section} />
                        ))}
                    </tbody>
                </table>
            </div>
            {onlyDifferences && !sections.length && (
                <p className="comparison-no-differences">
                    No hay diferencias en los datos comparados.
                </p>
            )}
        </section>
    );
}

function SectionRows({ section }) {
    return (
        <>
            <tr className="comparison-table-section">
                <th colSpan="100%">{section.title}</th>
            </tr>
            {section.rows.map((row) => (
                <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, index) => (
                        <td key={`${row.label}-${index}`}>{value}</td>
                    ))}
                </tr>
            ))}
        </>
    );
}
