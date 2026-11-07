import "./Catalog.css";
import { Grid2X2, List } from "lucide-react";

export function CatalogToolbar({ view, pageSize, onPageSizeChange, onViewChange }) {
    return (
        <div className="catalog-toolbar">
            <div>
                <strong>Resultados del catálogo</strong>
                <small>{pageSize} países por página · Datos de REST Countries</small>
            </div>
            <div className="catalog-display-controls">
                <div className="view-control" aria-label="Cambiar vista">
                    <button
                        type="button"
                        className={view === "grid" ? "active" : ""}
                        onClick={() => onViewChange("grid")}
                        aria-label="Vista de tarjetas"
                    >
                        <Grid2X2 aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className={view === "list" ? "active" : ""}
                        onClick={() => onViewChange("list")}
                        aria-label="Vista de lista"
                    >
                        <List aria-hidden="true" />
                    </button>
                </div>
                <select
                    className="catalog-page-size"
                    value={pageSize}
                    onChange={(event) => onPageSizeChange(Number(event.target.value))}
                    aria-label="Países por página"
                >
                    <option value="12">12 por página</option>
                    <option value="24">24 por página</option>
                    <option value="48">48 por página</option>
                </select>
            </div>
        </div>
    );
}
