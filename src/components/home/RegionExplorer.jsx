import "./RegionExplorer.css";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../common/SectionHeader";
import { ContinentIcon } from "./ContinentIcon";

const colors = ["blue", "aqua", "green", "orange", "ocean", "purple"];

export function RegionExplorer({ countries, onExplore }) {
    const regions = ["Américas", "Europa", "Asia", "África", "Oceanía", "Antártida"];

    return (
        <section className="content-section">
            <SectionHeader
                title="El mundo por regiones"
                description="Descubre países y territorios según su región geográfica."
            />
            <div className="region-grid">
                {regions.map((region, index) => {
                    const count = countries.filter(
                        (country) => country.region === region,
                    ).length;
                    return (
                        <button
                            className={`region-card ${colors[index]}`}
                            key={region}
                            type="button"
                            onClick={() => onExplore(region)}
                        >
                            <svg
                                className="region-card-wave"
                                viewBox="0 0 400 68"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <path d="M0 42C102 49 181 49 263 32c54-11 99-23 137-31v67H0Z" />
                            </svg>
                            <span className="region-head">
                                <span className="region-icon-box">
                                    <ContinentIcon continent={region} />
                                </span>
                                <span className="region-card-info">
                                    <strong>{region}</strong>
                                    <span>{count || "—"} registros</span>
                                </span>
                            </span>
                            <span className="region-open">
                                <ArrowUpRight aria-hidden="true" />
                            </span>
                            <small>
                                Explorar países <ArrowRight aria-hidden="true" />
                            </small>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
