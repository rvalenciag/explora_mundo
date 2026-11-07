const paths = {
    Américas:
        "M32 8c13-4 25 4 29 15l-7 8-7-2-5 8-8 5-5 13-7-4-5-13 3-9-5-8 6-10zM71 52l10 4 4 11-5 8 2 13-9 10-6-6 3-13-5-8z",
    Europa: "M31 31l9-9 11 3 9-5 11 8-6 8-10-1-6 8-11-2-8 4-8-7zM64 52l8 5-3 10-8-5z",
    Asia: "M18 32l14-15 18 2 13-8 22 10 11 16-6 14-15 4-12 12-17-7-15 2-12-14zM72 67l10 2 3 9-10 2z",
    África: "M35 13l19 5 12 18-8 15-4 23-15 15-14-13-7-24 7-20z",
    Oceanía: "M35 31l13-8 13 10-3 17-18 4-10-10zM71 55l9 1 3 8-9 3zM25 62l7-3 5 6-6 6z",
    Antártida: "M15 51l14-11 17 4 10-7 16 8 13-1 11 12-16 8-20-3-17 5-15-7-13 2z",
};

export function ContinentIcon({ continent }) {
    return (
        <svg className="continent-icon" viewBox="10 0 90 100" aria-hidden="true">
            <path d={paths[continent]} />
        </svg>
    );
}
