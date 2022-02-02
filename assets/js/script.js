var userFormEl = document.querySelector("#user-form");
var searchButton = document.getElementById('searchbtn');

var nameInputEl = document.querySelector('#search');
NYTapiID="C64Wxwb4zFKo1Au8JiTYdjhCMzmt6ev0";
GBooksApiID="AIzaSyBHindfXjGQKCb_YXtPUsp1Ectnqpf0PmA";
var searchword;



var getApi= function(event) {
  event.preventDefault();

  searchword = nameInputEl.value.trim();
  var radioValue = $("input[name='book']:checked").val();
console.log(radioValue);
var requestUrl2= "https://openlibrary.org/search/"+radioValue+"s.json?q="+searchword;

  //https://www.googleapis.com/books/v1/volumes?q="+radiovalue+"isbn:keyes&key="+GBooksApiID;

  var requestUrl = "https://api.nytimes.com/svc/books/v3/reviews?"+radioValue+"="+searchword+"&api-key="+NYTapiID;
  var requestUrl3="https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBHindfXjGQKCb_YXtPUsp1Ectnqpf0PmA";
  


  Promise.all([
    fetch(requestUrl),
    fetch(requestUrl2),
    fetch(requestUrl3)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log(data);
  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });
/*

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })

    
    .then(function(data) {

      console.log(data);
      // Looping over the fetch response and inserting the URL of your repos into a list
      
    }).then( 

    fetch(requestUrl2))
     .then(function(response) {
       return response.json();
     })
  
     
     .then(function(data) {
  
       console.log(data);
       // Looping over the fetch response and inserting the URL of your repos into a list
       
     });
    

     */

    
} 








userFormEl.addEventListener("submit", getApi);