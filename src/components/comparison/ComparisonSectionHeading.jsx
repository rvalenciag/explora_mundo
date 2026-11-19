import "./ComparisonSectionHeading.css";

export function ComparisonSectionHeading({ icon: Icon, title, description, actions }) {
    return (
        <header className="comparison-section-heading">
            <span className="comparison-section-icon">
                <Icon aria-hidden="true" />
            </span>
            <div>
                <h2>{title}</h2>
                {description && <p>{description}</p>}
            </div>
            {actions && <div className="comparison-section-actions">{actions}</div>}
        </header>
    );
}
