const candidatesPerCriterion = 8;

function density(country) {
    return country.population / country.area;
}

function sortedBy(countries, value) {
    return [...countries].sort((first, second) => value(second) - value(first));
}

function pickCountry(candidates, excludedCodes) {
    const available = candidates.filter((country) => !excludedCodes.has(country.cca3));
    const options = available.length ? available : candidates;
    return options[Math.floor(Math.random() * options.length)] ?? null;
}

function validCountries(countries) {
    const withData = countries.filter(
        (country) =>
            country.population > 0 &&
            country.area > 0 &&
            country.cca3 &&
            country.region !== "Sin región",
    );
    const sovereign = withData.filter((country) => country.independent === true);

    return sovereign.length >= 4 ? sovereign : withData;
}

export function selectFeaturedCountries(countries, recentCodes = []) {
    const eligible = validCountries(countries);
    if (!eligible.length) return [];

    const previousCodes = new Set(recentCodes);
    const selectedCodes = new Set();
    const selected = [];
    const select = (candidates) => {
        const country = pickCountry(
            candidates,
            new Set([...previousCodes, ...selectedCodes]),
        );
        if (country && !selectedCodes.has(country.cca3)) {
            selected.push(country);
            selectedCodes.add(country.cca3);
        }
    };

    select(
        sortedBy(eligible, (country) => country.population).slice(
            0,
            candidatesPerCriterion,
        ),
    );
    select(
        sortedBy(eligible, (country) => country.area).slice(0, candidatesPerCriterion),
    );
    select(sortedBy(eligible, density).slice(0, candidatesPerCriterion));

    const representedRegions = new Set(selected.map((country) => country.region));
    const regionalCandidates = sortedBy(
        eligible,
        (country) => country.population,
    ).filter((country) => !representedRegions.has(country.region));
    select(regionalCandidates.slice(0, candidatesPerCriterion));

    const fallbackCandidates = sortedBy(eligible, (country) => country.population);
    while (selected.length < 4) {
        const country = pickCountry(fallbackCandidates, selectedCodes);
        if (!country || selectedCodes.has(country.cca3)) break;
        selected.push(country);
        selectedCodes.add(country.cca3);
    }

    return selected;
}
