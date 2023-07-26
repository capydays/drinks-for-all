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
                    displayCocktail(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

}

getRandomCocktail();

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
    console.log(cocktail);
}

searchCocktail('gin');

var searchFormEl = document.querySelector('#search-form');
var randomButtonEl = document.querySelector('#random-button');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need to choose an alcohol type!!');
    return;
  }

  // var queryString = link to search-request html with listed cocktails

  location.assign(queryString);
}

function handleRandomSelect(event) {
    event.preventDefault();


}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
randomButtonEl.addEventListener('click', handleRandomSelect);