import { BarChart3, MapPin } from "lucide-react";
import worldMap from "../../assets/illustrations/world-map.svg";

export function HeroGlobe({ onExplore }) {
    return (
        <div className="hero-globe">
            <div className="globe-halo"></div>
            <div className="globe-sphere">
                <div
                    className="globe-land"
                    style={{ "--world-map": `url(${worldMap})` }}
                ></div>
                <svg className="globe-graticule" viewBox="0 0 500 500" fill="none">
                    <ellipse cx="250" cy="250" rx="89" ry="226" />
                    <ellipse cx="250" cy="250" rx="163" ry="226" />
                    <path d="M24 147c126 57 326 57 452 0M24 250h452M24 353c126-57 326-57 452 0M45 95c115 52 295 52 410 0M45 405c115-52 295-52 410 0" />
                    <path
                        className="globe-route route-north-africa"
                        d="M128 125c100-31 192 19 151 143"
                    />
                    <path
                        className="globe-route route-africa-south"
                        d="M279 268c-30 55-91 72-171 64"
                    />
                </svg>
                <svg className="globe-border" viewBox="0 0 500 500" fill="none">
                    <circle cx="250" cy="250" r="226" />
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
            <div className="globe-action compare-action">
                <BarChart3 />
                <span>
                    Compara
                    <br />
                    países
                </span>
            </div>
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
