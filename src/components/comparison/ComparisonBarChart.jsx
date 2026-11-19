import "./ComparisonBarChart.css";
import { ComparisonSectionHeading } from "./ComparisonSectionHeading";

export function ComparisonBarChart({ icon, title, description, items }) {
    const maximum = Math.max(...items.map((item) => item.value), 1);

    return (
        <section className="comparison-chart-card">
            <ComparisonSectionHeading
                icon={icon}
                title={title}
                description={description}
            />
            <div className="comparison-bars">
                {items.map((item, index) => (
                    <div className={`comparison-bar tone-${index + 1}`} key={item.code}>
                        <header>
                            <strong>{item.label}</strong>
                            <span>{item.formattedValue}</span>
                        </header>
                        <span className="comparison-bar-track">
                            <span
                                className="comparison-bar-value"
                                style={{ width: `${(item.value / maximum) * 100}%` }}
                            />
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
