export function ProfilePanelHeading({ title, description }) {
    return (
        <header className="profile-panel-heading">
            <h3>{title}</h3>
            {description && <p>{description}</p>}
        </header>
    );
}
