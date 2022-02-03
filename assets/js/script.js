var userFormEl = document.querySelector("#user-form");
var searchButton = document.getElementById('searchbtn');
var NYTEl = document.getElementById('nyt');
var searchResEl=document.getElementById('searchresults');

var nameInputEl = document.querySelector('#search');
NYTapiID="C64Wxwb4zFKo1Au8JiTYdjhCMzmt6ev0";
GBooksApiID="AIzaSyBHindfXjGQKCb_YXtPUsp1Ectnqpf0PmA";
gbooksthumbisn="https://storage.googleapis.com/du-prd/books/images/";
var datafromNYT;
var searchword;
var requestUrl2;

function BooksbyISBN(data)
{
for(i=0;i<1;i++)
{
var cardsEl=document.createElement("div");
cardsEl.className="card";


var aEL=document.createElement("a");
aEL.href="https://www.amazon.com/dp/"+data[i].isbn_10[0];

var imgEL=document.createElement("img");
imgEL.className="card-img-top";
imgEL.src="https://storage.googleapis.com/du-prd/books/images/"+data[i].isbn_13[0]+".jpg";
aEL.appendChild(imgEL);
cardsEl.appendChild(aEL);

searchResEl.appendChild(cardsEl);



}

}



function NYTBest(data) 
{

  
for(i=0;i<5;i++) {
var nycardEl=document.createElement("div");
nycardEl.className="card";
NYTEl.appendChild(nycardEl);
var aEL=document.createElement("a");
aEL.href=data[2].results.books[i].amazon_product_url;
var imgEL=document.createElement("img");
imgEL.className="card-img-top";
imgEL.src=data[2].results.books[i].book_image;

aEL.appendChild(imgEL);
nycardEl.appendChild(aEL);


var nycardfooterEl=document.createElement("div");
nycardfooterEl.className="card-footer";
var footersmall=document.createElement("small");
footersmall.className="text-muted";
footersmall.innerHTML="Rank: #"+(i+1);
nycardfooterEl.appendChild(footersmall);
nycardEl.appendChild(nycardfooterEl);

}

}


var getApi= function(event) {
  event.preventDefault();

  searchword = nameInputEl.value.trim();
  var radioValue = $("input[name='book']:checked").val();
console.log(radioValue);


if(radioValue=="title")
{
  requestUrl2="http://openlibrary.org/search.json?title="+searchword; 
}// to search title
  else if(radioValue=="subject")
  {
requestUrl2="http://openlibrary.org/subjects/"+searchword+".json"; // to search genre or subject

  }
else if(radioValue=="author")
{
  requestUrl2="https://openlibrary.org/search/authors.json?q="+searchword;

}

  else 
  {
    requestUrl2="https://openlibrary.org/"+radioValue+"/"+searchword+".json"; // to search authors and isbn#

  }


  console.log(requestUrl2);


nytbestlisturl="https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?&api-key=C64Wxwb4zFKo1Au8JiTYdjhCMzmt6ev0";



 

  var requestUrl = "https://api.nytimes.com/svc/books/v3/reviews?"+radioValue+"="+searchword+"&api-key="+NYTapiID;

 









  Promise.all([
    fetch(requestUrl2),
    fetch(requestUrl),
    fetch(nytbestlisturl)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log(data);
    console.log(data[0].number_of_pages);
    console.log(data[1].num_results);

    NYTBest(data);
    BooksbyISBN(data);

  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });

    
      
    
} 






userFormEl.addEventListener("submit", getApi);



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