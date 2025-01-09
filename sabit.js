const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results');
const showAllBtn = document.getElementById('show-all');

let allMeals = [];

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMeals(query);
    }
});
async function fetchMeals(query) {
    resultsContainer.innerHTML = '';
    showAllBtn.style.display = 'none';
    allMeals = [];

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
