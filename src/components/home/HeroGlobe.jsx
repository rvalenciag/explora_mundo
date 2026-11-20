import { BarChart3, MapPin } from "lucide-react";
import heroGlobe from "../../assets/illustrations/hero-globe.svg";

export function HeroGlobe({ onExplore, onCompare }) {
    return (
        <div className="hero-globe">
            <div className="globe-halo"></div>
            <div className="globe-sphere">
                <img className="figma-globe-art" src={heroGlobe} alt="" />
                <svg className="globe-routes" viewBox="0 0 500 500" fill="none">
                    <path
                        className="globe-route route-north-africa"
                        d="M109 101C225 75 393 115 463 216"
                    />
                    <path
                        className="globe-route route-africa-south"
                        d="M463 216C422 347 302 411 208 409"
                    />
                </svg>
                <span className="map-pin pin-north">
                    <MapPin />
                    <i></i>
                </span>
                <span className="map-pin pin-africa">
                    <MapPin />
                    <i></i>
                </span>
                <span className="map-pin pin-south">
                    <MapPin />
                    <i></i>
                </span>
            </div>
            <button
                className="globe-action compare-action"
                type="button"
                onClick={onCompare}
            >
                <BarChart3 />
                <span>
                    Compara
                    <br />
                    países
                </span>
            </button>
            <button
                className="globe-action explore-action"
                type="button"
                onClick={onExplore}
            >
                <MapPin />
                <span>
                    Explora
                    <br />
                    países
                </span>
            </button>
        </div>
    );
}
