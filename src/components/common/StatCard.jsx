import "./StatCard.css";
export function StatCard({ label, value, detail, icon: Icon, tone = "blue" }) {
    return (
        <article className={`stat-card ${tone}`}>
            <svg
                className="stat-card-wave"
                viewBox="0 0 315 88"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d="M0 57C59 40 117 38 173 53c57 16 100 13 142-17v52H0Z" />
            </svg>
            <span className="stat-card-label">{label}</span>
            {Icon && (
                <span className="stat-card-icon">
                    <Icon aria-hidden="true" />
                </span>
            )}
            <strong>{value}</strong>
            {detail && <small>{detail}</small>}
        </article>
    );
}
