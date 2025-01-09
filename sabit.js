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
        if (data.meals) {
            allMeals = data.meals;
            displayMeals(allMeals.slice(0, 5));

            if (allMeals.length > 5) {
                showAllBtn.style.display = 'block';
            }
        } else {
            resultsContainer.innerHTML = '<p class="text-center">No meals found.</p>';
        }
    } catch (error) {
        console.error('Error fetching meals:', error);
        resultsContainer.innerHTML = '<p class="text-center text-danger">An error occurred while fetching data.</p>';
    }
}

function displayMeals(meals) {
    resultsContainer.innerHTML = meals.map(meal => `
        <div class="col-md-4 meal-card">
            <div class="card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                    <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
                </div>
            </div>
        </div>
    `).join('');
}
showAllBtn.addEventListener('click', () => {
    displayMeals(allMeals.slice(5));
    showAllBtn.style.display = 'none';
});