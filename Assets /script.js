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

if(radioValue=="title" || radioValue=="author" || radioValue=="publisher") {
    var Gapivalue="in"+radioValue;
    console.log(Gapivalue);
    
    }
    
    var requestUrl2= "https://openlibrary.org/"+radioValue+"/"+searchword+".json";
    var requestUrl = "https://api.nytimes.com/svc/books/v3/reviews?"+radioValue+"="+searchword+"&api-key="+NYTapiID;
    var requestUrl3="https://www.googleapis.com/books/v1/volumes?q="+searchword+"+"+Gapivalue+":keyes&key="+GBooksApiID;

  console.log(requestUrl3);

  Promise.all([
    fetch(requestUrl),
    fetch(requestUrl3)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses