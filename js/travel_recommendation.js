document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    if (query) {
        fetch('../api/travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                displayResults(query, data);
            });
    }
});

function displayResults(query, data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    switch (query.toLowerCase()) {
        case 'country':
            data.country.forEach(country => {
                country.cities.forEach(city => {
                    resultsContainer.appendChild(createCard(city));
                });
            });
            break;
        case 'temple':
            data.temple.forEach(temple => {
                resultsContainer.appendChild(createCard(temple));
            });
            break;
        case 'beach':
            data.beach.forEach(beach => {
                resultsContainer.appendChild(createCard(beach));
            });
            break;
        default:
            resultsContainer.innerText = 'No results found for your query.';
            break;
    }
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'result-card';

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.name;
    card.appendChild(img);

    const name = document.createElement('h2');
    name.innerText = item.name;
    card.appendChild(name);

    const description = document.createElement('p');
    description.innerText = item.description;
    card.appendChild(description);

    return card;
}
