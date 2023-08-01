//let's fetch the api


var searchFormEl = document.querySelector('#search-form');
var randomBtnEl = document.querySelector('#random-button');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-request.html?q=' + searchInputVal;

  location.assign(queryString);
  
}

function handleRandomButton(event) {
  event.preventDefault();

  //var randomString = './search-request.html?q='
} 

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
randomBtnEl.addEventListener('click', handleRandomButton);


