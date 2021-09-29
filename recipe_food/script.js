const meals = document.getElementById('meals');
const favList = document.getElementById('fav-list');
const favDeleteBtn = document.getElementById('fav-container-delete');
const mealPopupEle = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('meal-info__delete-btn');
const mealInfoEle = document.getElementById('meal-info');

getRandomMeal();
fetchFavList();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealBySearch(term) {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="header-label" >Random Recipe</span>` : `` }
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>

        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <span class="heart-btn" >
                <i class="fas fa-heart"></i>
            </span>
        </div>
    `
    const heartBtn = meal.querySelector('.meal-body .heart-btn');
    heartBtn.addEventListener('click', () => {
        if(heartBtn.classList.contains('active')) {
            heartBtn.classList.remove('active');
            removeMealsLS(mealData.idMeal);
        } else {
            heartBtn.classList.add('active');
            addMealsLS(mealData.idMeal);
        }
        
        fetchFavList();
    })
    meals.appendChild(meal);

    meal.addEventListener('click', () => {
        updateMealInfo(mealData);
    })

}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds ? mealIds : [];
}

function addMealsLS(mealId) {
    // get old array idmeal
    const mealIds = getMealsLS(); 

    // set the new array idmeal
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealsLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)))
}

async function fetchFavList() {
    // Clean container
    favList.innerHTML = "";

    const mealIds = getMealsLS();

    for(let i = mealIds.length -1; i>=0; i--) {
        const meal = await getMealById(mealIds[i]);

        addFavMeal(meal);
    }
}

function addFavMeal(mealData) {
    const favItem = document.createElement('li');
    favItem.classList.add('fav-item');

    favItem.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span class="fav-meal-name" >${mealData.strMeal}</span>
        <span class="delete-fav-btn" >
            <i class="fas fa-times"></i>
        </span>
    `

    favList.appendChild(favItem);

    // Listener delete the meal
    const deleteBtn = favItem.querySelector('.delete-fav-btn'); 
    deleteBtn.addEventListener('click', () => {
        removeMealsLS(mealData.idMeal);
        fetchFavList();
    })

}

popupCloseBtn.addEventListener('click', (e) => {
    mealPopupEle.classList.add('hidden');
    console.log(e.target);
})

function updateMealInfo(mealData) {
    mealInfoEle.innerHTML = '';
    const mealInfo = document.createElement('div');
    mealInfo.innerHTML = `
        <div class="meal-info__header">
            <h1>${mealData.strMeal}</h1>
            <img src="${mealData.strMealThumb}" alt="">
        </div>
        <div class="meal-info__body">
            <p>${mealData.strInstructions}</p>
            
        </div>
    `;

    mealInfoEle.appendChild(mealInfo);

    // Show the popup 
    mealPopupEle.classList.remove('hidden');
}


function displayButtonDelete()  {
    var deleteButton = document.querySelectorAll('.delete-fav-btn');
  
    deleteButton.forEach(element => {

    style = window.getComputedStyle(element);
    attributeDisplay = style.getPropertyValue('display');
    if (attributeDisplay === "none") {
        element.style.display = "inline-block";
        }else {
        element.style.display = "none";
        }

    });

}