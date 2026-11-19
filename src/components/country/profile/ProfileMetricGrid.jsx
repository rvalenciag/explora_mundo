import { countryValue } from "./profileFormatters";

export function ProfileMetricGrid({ items, compact = false, variant = "standard" }) {
    return (
        <div className={`profile-metrics ${variant} ${compact ? "is-compact" : ""}`}>
            {items.map(({ label, value, icon: Icon, tone }) => (
                <article className={`tone-${tone ?? "blue"}`} key={label}>
                    <span>{label}</span>
                    <Icon aria-hidden="true" />
                    <strong>{countryValue(value)}</strong>
                </article>
            ))}
        </div>
    );
}
