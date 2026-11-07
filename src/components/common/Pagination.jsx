import "./Pagination.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = getVisiblePages(page, totalPages);

    return (
        <nav className="pagination" aria-label="Paginación del catálogo">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                aria-label="Página anterior"
            >
                <ChevronLeft aria-hidden="true" />
            </button>
            {pages.map((item, index) =>
                item === "ellipsis" ? (
                    <span key={`ellipsis-${index}`} aria-hidden="true">
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        className={item === page ? "selected" : ""}
                        onClick={() => onPageChange(item)}
                    >
                        {item}
                    </button>
                ),
            )}
            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Página siguiente"
            >
                <ChevronRight aria-hidden="true" />
            </button>
        </nav>
    );
}

function getVisiblePages(currentPage, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pageNumbers = new Set([
        1,
        totalPages,
        currentPage - 1,
        currentPage,
        currentPage + 1,
    ]);
    const sortedPages = [...pageNumbers]
        .filter((item) => item >= 1 && item <= totalPages)
        .sort((first, second) => first - second);

    return sortedPages.reduce((items, item) => {
        const previous = items.at(-1);
        const previousPage = typeof previous === "number" ? previous : null;

        if (previousPage && item - previousPage > 2) {
            items.push("ellipsis");
        } else if (previousPage && item - previousPage === 2) {
            items.push(previousPage + 1);
        }

        items.push(item);
        return items;
    }, []);
}
