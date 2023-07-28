var searchFormEl = document.querySelector('#search-form');

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

searchFormEl.addEventListener('click', handleSearchFormSubmit);



