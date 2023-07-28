//let's fetch the api

function getRandomCocktail() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    displayRandomCocktail(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

}

function searchCocktail(ingredient) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    displayCocktail(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function displayCocktail(cocktail) {
    for (let i = 0; i < 3; i++) {
        ranDrink = Math.floor(Math.random() * (cocktail.drinks.length));
        searchedDrink = getCocktailInformation(cocktail.drinks[ranDrink].strDrink);
    }
}

function getCocktailInformation(cocktail) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    displayRandomCocktail(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0].strDrink);

    //placeholder html element for the sake of adding code
    /*uses code from youtube video guy
    let randomSection = document.querySelector('randomSection');
    let randomName = document.createElement('h2');
    randomName.innerHTML = cocktail.drinks[0].strDrink;
    
    randomSection.appendChild(randomName);

    let randImg = document.createElement('randImg');
    randImg.src = cocktail.drinks[0].strDrinkThumb;

    randomSection.appendChild(randImg);
    */
    for (let i = 1; i < 16; i++) {
        console.log();

        if (cocktail.drinks[0][`strIngredient${i}`] == null || cocktail.drinks[0][`strIngredient${i}`] == '') {
            break;
        }
        /*
        let ingredient = document.createElement('ons-list-item');
        ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`];

        drinkSection.appendChild(ingredient);
        */
        if (cocktail.drinks[0][`strMeasure${i}`] != null) {
            console.log(cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`]);
        }
        else {
            console.log(cocktail.drinks[0][`strIngredient${i}`]);
        }
    }

}

var searchFormEl = document.querySelector('#search-form');
var randomButtonEl = document.querySelector('#random-button');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.getElementById('search-input').value;
    if (!searchInputVal) {
        console.error('You need to choose an alcohol type!!');
        return;
    }

    searchCocktail(searchInputVal);
    // var queryString = link to search-request html with listed cocktails


    //location.assign(queryString);
}

function handleRandomSelect(event) {
    event.preventDefault();

    getRandomCocktail();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
randomButtonEl.addEventListener('click', handleRandomSelect);