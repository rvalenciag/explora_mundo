import { BadgeCheck, Globe2, Route, ShieldCheck } from "lucide-react";
import { ProfilePanelHeading } from "./ProfilePanelHeading";
import { booleanValue } from "./profileFormatters";

const classificationItems = [
    { label: "Miembro de la ONU", key: "unMember", icon: BadgeCheck },
    { label: "Estado soberano", key: "independent", icon: ShieldCheck },
    { label: "Territorio dependiente", key: "dependent", icon: Globe2 },
    { label: "Reconocimiento disputado", key: "disputed", icon: Route },
];

export function ClassificationSummary({ country }) {
    return (
        <section className="profile-panel profile-classification-panel">
            <ProfilePanelHeading
                title="Otros datos destacados"
                description="Clasificación internacional disponible para este registro."
            />
            <div className="profile-classifications">
                {classificationItems.map(({ label, key, icon: Icon }) => (
                    <div key={key}>
                        <Icon aria-hidden="true" />
                        <span>{label}</span>
                        <strong>{booleanValue(country[key])}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
}
