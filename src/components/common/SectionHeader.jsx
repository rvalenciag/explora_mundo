import "./SectionHeader.css";
export function SectionHeader({ title, description, action }) {
    return (
        <div className="section-header">
            <div>
                <h2>{title}</h2>
                {description && <p>{description}</p>}
            </div>
            {action}
        </div>
    );
}
