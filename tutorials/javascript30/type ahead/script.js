const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];

// Returns a promise (meaning something will eventually come back from fetch())
// fetch() does not know the data type
// blob.json() returns another promise which then gives you raw data
// ...data (spreading data) into push stores it as separate elements
fetch(endpoint).then(blob => blob.json())
    .then(data => cities
        .push(...data));

// Find city or states that match wordToMatch
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // g => global (look through the entire string)
        // i => case insensitive
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `<li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        <\li>`;
    }).join("");
    // .join to return as a string
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
// change => fires whenever users click outside a given element
searchInput.addEventListener("change", displayMatches);
// keyup => fires whenever users press a key
searchInput.addEventListener("keyup", displayMatches);

function numberWithCommas(x) {
    // \B => non-word boundary (word characters are letters, numbers, and underscores)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
