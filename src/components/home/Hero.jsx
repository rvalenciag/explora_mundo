import "./Hero.css";
import { ArrowRight } from "lucide-react";
import { HeroGlobe } from "./HeroGlobe";

export function Hero({ onExplore }) {
    return (
        <section className="hero-section">
            <div className="hero-copy">
                <span className="eyebrow">
                    <i className="eyebrow-line" aria-hidden="true"></i> EXPLORAMUNDO ·
                    ATLAS INTERACTIVO
                </span>
                <h1>
                    Descubre el mundo,
                    <br />
                    <em>país por país.</em>
                </h1>
                <p>
                    Explora países, conoce sus características y compara información de
                    diferentes regiones del planeta.
                </p>
                <button
                    className="primary-button hero-button"
                    type="button"
                    onClick={onExplore}
                >
                    Comenzar a explorar <ArrowRight aria-hidden="true" />
                </button>
            </div>
            <HeroGlobe onExplore={onExplore} />
        </section>
    );
}
