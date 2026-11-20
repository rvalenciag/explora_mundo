export function SettingsSectionHeading({ icon: Icon, title, description }) {
    return (
        <header className="settings-section-heading">
            <span>
                <Icon aria-hidden="true" />
            </span>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </header>
    );
}
