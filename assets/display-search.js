var randomButtonEl = document.querySelector('#random-button');

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

function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0]);


let drinkSection = document.querySelector('#drink-section');

let drinkName = document.createElement('h2');
drinkName.classList.add('text-center', 'p-3', 'text-3xl')
drinkName.innerHTML = cocktail.drinks[0].strDrink;

drinkSection.appendChild(drinkName);

let img = document.createElement('img');
img.classList.add('float-right','h-60', 'm-6', 'rounded-lg')
img.src = cocktail.drinks[0].strDrinkThumb;

drinkSection.appendChild(img);

let ingredientsTitle = document.createElement('span')
ingredientsTitle.classList.add('text-2xl', 'm-6')
ingredientsTitle.innerHTML = 'Ingredients:'
drinkSection.appendChild(ingredientsTitle)

for(let i = 1; i < 16; i++){
    

    if(cocktail.drinks[0][`strIngredient${i}`] == null){
        break;
    }

    let ingredient = document.createElement('ul');
    ingredient.classList.add('flex', 'flex-col', 'mt-1', 'justify-center', 'm-6')
    ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] 
    + ': ' + cocktail.drinks[0][`strIngredient${i}`];

    drinkSection.appendChild(ingredient);
}

let directions = document.createElement('span')
directions.classList.add('text-2xl', 'm-6')
directions.innerHTML = 'Directions:';
drinkSection.appendChild(directions)

let card = document.createElement('p');
card.classList.add('mt-1', 'm-6', 'clear-left')
card.innerHTML = cocktail.drinks[0].strInstructions + '<br/>' + '<br/>';

drinkSection.appendChild(card);
}





function handleRandomSelect(event) {
    event.preventDefault();

    getRandomCocktail();
}

// searchFormEl.addEventListener('click', handleSearchFormSubmit);
randomButtonEl.addEventListener('click', handleRandomSelect);