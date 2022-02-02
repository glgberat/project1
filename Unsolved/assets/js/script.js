var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

// `getApi` function is called when the `fetchButton` is clicked

function getApi() {
  // TODO: Insert the API url to get a list of your repos

  var requestUrl = "https://openlibrary.org/api/books?bibkeys=ISBN:0385472579&format=json"

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })

    
    .then(function(data) {

      console.log(data);
      // Looping over the fetch response and inserting the URL of your repos into a list
      
    });
} 

fetchButton.addEventListener('click', getApi);
