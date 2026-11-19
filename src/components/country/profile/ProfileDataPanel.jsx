import { ProfilePanelHeading } from "./ProfilePanelHeading";
import { countryValue } from "./profileFormatters";

export function ProfileDataPanel({ title, description, rows }) {
    return (
        <section className="profile-panel profile-data-panel">
            <ProfilePanelHeading title={title} description={description} />
            <dl className="profile-data-rows">
                {rows.map(([label, value]) => (
                    <div key={label}>
                        <dt>{label}</dt>
                        <dd>{countryValue(value)}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
