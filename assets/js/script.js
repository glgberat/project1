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
imgEL.src=data[1].items[0].volumeInfo.imageLinks.thumbnail;
aEL.appendChild(imgEL);
cardsEl.appendChild(aEL);

searchResEl.appendChild(cardsEl);



}

}



function NYTBest() 
{

  nytbestlisturl="https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?&api-key=C64Wxwb4zFKo1Au8JiTYdjhCMzmt6ev0";
  fetch(nytbestlisturl).then(function(response) {
      
    response.json().then(function(data) {
      for(i=0;i<5;i++) {
        var nycardEl=document.createElement("div");
        nycardEl.className="card";
        NYTEl.appendChild(nycardEl);
        var aEL=document.createElement("a");
        aEL.href=data.results.books[i].amazon_product_url;
        var imgEL=document.createElement("img");
        imgEL.className="card-img-top";
        imgEL.src=data.results.books[i].book_image;
        
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
          
      
      

          
    });
  });
  


}


var getApi= function(event) {
  event.preventDefault();

  searchword = nameInputEl.value.trim();
  var radioValue = $("input[name='book']:checked").val();
console.log(radioValue);


if(radioValue=="title")
{
  requestUrl1="http://openlibrary.org/search.json?title="+searchword; 
}// to search title
  else if(radioValue=="subject")
  {
requestUrl1="http://openlibrary.org/subjects/"+searchword+".json"; // to search genre or subject

  }
else if(radioValue=="author")
{
  requestUrl1="https://openlibrary.org/search/authors.json?q="+searchword;

}

  else 
  {
    requestUrl1="https://openlibrary.org/"+radioValue+"/"+searchword+".json"; // to search authors and isbn#

  }


  console.log(requestUrl1);






 

  var requestUrl = "https://api.nytimes.com/svc/books/v3/reviews?"+radioValue+"="+searchword+"&api-key="+NYTapiID;

 var requestUrl2 ="https://www.googleapis.com/books/v1/volumes?q="+searchword+"isbn&key="+GBooksApiID;









  Promise.all([
    fetch(requestUrl1),
    fetch(requestUrl2),
    fetch(nytbestlisturl)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    

    NYTBest(data);
    BooksbyISBN(data);

  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });

    
      
    
} 




NYTBest();

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