export function ProfileSectionHeading({ id, title, description }) {
    return (
        <header className="profile-section-heading">
            <h2 id={id}>{title}</h2>
            <p>{description}</p>
        </header>
    );
}
