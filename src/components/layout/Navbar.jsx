import "./Navbar.css";
import {
    BarChart3,
    Globe2,
    Heart,
    House,
    Search,
    Settings2,
    ArrowLeftRight,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const items = [
    { id: "home", label: "Inicio", icon: House, to: "/" },
    { id: "explore", label: "Explorar", icon: Search, to: "/explorar" },
    { id: "compare", label: "Comparar", icon: ArrowLeftRight, to: "/comparar" },
    { id: "stats", label: "Estadísticas", icon: BarChart3, to: "/estadisticas" },
    { id: "favorites", label: "Favoritos", icon: Heart, to: "/favoritos" },
];

export function Navbar() {
    const location = useLocation();

    return (
        <header className="site-header">
            <div className="nav-shell">
                <Link
                    className="brand"
                    to="/"
                    onClick={() => window.scrollTo(0, 0)}
                    aria-label="Ir a inicio"
                >
                    <Globe2 aria-hidden="true" />
                    <span>ExploraMundo</span>
                </Link>

                <nav className="main-nav" aria-label="Navegación principal">
                    {items.map(({ id, label, icon: Icon, to }) =>
                        to ? (
                            <NavLink
                                aria-label={label}
                                className={({ isActive }) => {
                                    const profileIsOpen =
                                        id === "explore" &&
                                        location.pathname.startsWith("/pais/");
                                    return isActive || profileIsOpen
                                        ? "nav-link active"
                                        : "nav-link";
                                }}
                                end={id === "home"}
                                key={id}
                                to={to}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <Icon aria-hidden="true" />
                                <span>{label}</span>
                            </NavLink>
                        ) : (
                            <button className="nav-link" key={id} type="button">
                                <Icon aria-hidden="true" />
                                <span>{label}</span>
                            </button>
                        ),
                    )}
                </nav>

                <div className="nav-settings">
                    <button className="settings-button" type="button">
                        <Settings2 aria-hidden="true" />
                        <span>Ajustes</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
