
function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');

    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();


    getCocktail(query);
}


var randomButtonEl = document.querySelector('#random-button');
var submitButtonEl = document.querySelector('#submit-button');



// function to get random cocktail
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
                    displayCocktail(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
function displayCocktail(cocktail) {
    console.log(cocktail.drinks[0]);


    let drinkSection = document.querySelector('#drink-section');

    let drinkName = document.createElement('h2');
    drinkName.classList.add('text-center', 'p-3', 'text-3xl', 'mt-6')
    drinkName.innerHTML = cocktail.drinks[0].strDrink;

    drinkSection.appendChild(drinkName);

    let img = document.createElement('img');
    img.classList.add('h-60', 'justify-center', 'items-center', 'float-right', 'm-4')
    img.src = cocktail.drinks[0].strDrinkThumb;

    drinkSection.appendChild(img);

    let ingredientsTitle = document.createElement('span')
    ingredientsTitle.classList.add('text-2xl', 'm-4')
    ingredientsTitle.innerHTML = 'Ingredients:'
    drinkSection.appendChild(ingredientsTitle)

    for (let i = 1; i < 16; i++) {


        if (cocktail.drinks[0][`strIngredient${i}`] == null) {
            break;
        }
        if (cocktail.drinks[0][`strMeasure${i}`] != null) {
            let ingredient = document.createElement('ul');
            ingredient.classList.add('flex', 'flex-col', 'mt-1', 'justify-center', 'm-4')
            ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`]
                + ': ' + cocktail.drinks[0][`strIngredient${i}`];

            drinkSection.appendChild(ingredient);
        }
        else {
            let ingredient = document.createElement('ul');
            ingredient.classList.add('flex', 'flex-col', 'mt-1', 'justify-center', 'm-4')
            ingredient.innerHTML = cocktail.drinks[0][`strIngredient${i}`];

            drinkSection.appendChild(ingredient);
        }
    }

    let directions = document.createElement('span')
    directions.classList.add('text-2xl', 'm-4')
    directions.innerHTML = 'Directions:';
    drinkSection.appendChild(directions)

    let card = document.createElement('p', 'm-4', 'clear-left');
    card.classList.add('mt-1', 'm-4', 'clear-left');
    card.innerHTML = cocktail.drinks[0].strInstructions + '<br/>' + '<br/>';

    drinkSection.appendChild(card);
};

// function to allow search by ingedients
function getCocktail(ingredient) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    searchCocktail(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
function searchCocktail(cocktail) {
    for (let i = 0; i < 3; i++) {
        ranDrink = Math.floor(Math.random() * (cocktail.drinks.length));
        console.log(cocktail.drinks[ranDrink].strDrink);
        getSearchedCocktail(cocktail.drinks[ranDrink].strDrink);
    }
}

function getSearchedCocktail(cocktail) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    displayCocktail(data);
                }

                )
            });
}
//Gets a random Dad joke to display
async function getDadJoke() {
    const dadJoke = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json"
        }
    });
    const dadJokeJSON = await dadJoke.json();
    if (dadJokeJSON.status === 200) {
        document.getElementById("jokes").innerHTML = dadJokeJSON.joke;
    } else {
        return "Error retrieving dad joke!"
    }
};

function handleRandomSelect(event) {
    event.preventDefault();
    getRandomCocktail();
    getDadJoke();
}

function handleSelect(event) {
    event.preventDefault();
    var searchInputVal = document.getElementById('default-input').value;
    if (!searchInputVal) {
        console.error('You need to choose an alcohol type!!');
        return;
    }
    getCocktail(searchInputVal);
    getDadJoke();

}




// searchFormEl.addEventListener('click', handleSearchFormSubmit);
randomButtonEl.addEventListener('click', handleRandomSelect);
submitButtonEl.addEventListener('click', handleSelect);

getParams();