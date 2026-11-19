const sections = [
    { id: "summary", label: "Resumen", mobileLabel: "Resumen" },
    { id: "geography", label: "Geografía", mobileLabel: "Geografía" },
    { id: "culture", label: "Cultura", mobileLabel: "Cultura" },
    { id: "details", label: "Datos adicionales", mobileLabel: "Más datos" },
];

export function CountryProfileTabs({ activeSection, onChange }) {
    return (
        <nav className="profile-tabs" aria-label="Secciones de la ficha completa">
            {sections.map((section) => (
                <button
                    className={activeSection === section.id ? "active" : ""}
                    key={section.id}
                    type="button"
                    onClick={() => onChange(section.id)}
                >
                    <span className="profile-tab-desktop">{section.label}</span>
                    <span className="profile-tab-mobile">{section.mobileLabel}</span>
                </button>
            ))}
        </nav>
    );
}
