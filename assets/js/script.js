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


function BooksbyISBN(data) //google books api
{
  searchResEl.innerHTML="";

  for(i=0;i<data[0].items.length;i++)
  {
    var cardsEl=document.createElement("div");
cardsEl.className="card";


var aEL=document.createElement("a");
aEL.href=data[0].items[i].volumeInfo.canonicalVolumeLink;
aEL.target="_blank";

var imgEL=document.createElement("img");
imgEL.className="card-img-top";
imgEL.src=data[0].items[i].volumeInfo.imageLinks.thumbnail;
aEL.appendChild(imgEL);
cardsEl.appendChild(aEL);

searchResEl.appendChild(cardsEl);

}

}

function BooksbySubject(data)
{
  searchResEl.innerHTML="";

  for(i=0;i<data[0].items.length;i++)
  {
    var cardsEl=document.createElement("div");
cardsEl.className="card";


var aEL=document.createElement("a");
aEL.href=data[0].items[i].volumeInfo.canonicalVolumeLink;
aEL.target="_blank";

var imgEL=document.createElement("img");
imgEL.className="card-img-top";
imgEL.src=data[0].items[i].volumeInfo.imageLinks.thumbnail;
aEL.appendChild(imgEL);
cardsEl.appendChild(aEL);

searchResEl.appendChild(cardsEl);



  }


}



function BooksbyAuthor(data)
{
  searchResEl.innerHTML="";

  var colEl=document.createElement("div");
    colEl.className="col-md-3 card-group";
    

  for(i=0;i<data[0].numFound;i++)
  {
  
  var cardsEl=document.createElement("div");
  cardsEl.className="card ws";
 
  colEl.appendChild(cardsEl);

  var imgEL=document.createElement("img");
  imgEL.className="img-thumbnail";
  imgEL.src="https://covers.openlibrary.org/a/olid/"+data[0].docs[i].key+"-L.jpg";
  cardsEl.appendChild(imgEL);  
  
  var cardbodyEl=document.createElement("div");
  cardbodyEl.className="card-body";
  cardsEl.appendChild(cardbodyEl);
  
  var h5El=document.createElement("h5");
  h5El.className="card-title";
  h5El.innerHTML=data[0].docs[i].name;
  cardbodyEl.appendChild(h5El);
  
  var pEl=document.createElement("p");
  pEl.className="card-text";
  cardbodyEl.appendChild(pEl);

  var ulEl=document.createElement("ul");
  ulEl.className="list-group list-group-flush";
  cardsEl.appendChild(ulEl);

  var liEL=document.createElement("li");
  liEL.className="list-group-item";
  
  liEL.innerHTML="Birth Date: "+data[0].docs[i].birth_date;
  if(data[0].docs[i].birth_date==undefined){liEL.innerHTML="Birth Date:";}
 
  ulEl.appendChild(liEL);

  liEL=document.createElement("li");
  liEL.className="list-group-item";
  liEL.innerHTML="Best Seller: "+data[0].docs[i].top_work;
  ulEl.appendChild(liEL);

  liEL=document.createElement("li");
  liEL.className="list-group-item";
  liEL.innerHTML="Number of Works: "+data[0].docs[i].work_count;
  ulEl.appendChild(liEL);

  cardbodyEl=document.createElement("div");
  cardbodyEl.className="card-body";
  var aEL=document.createElement("a");
  aEL.href="https://openlibrary.org/authors/"+data[0].docs[i].key;
  aEL.className="card-link";
  aEL.innerHTML="Details";

  cardsEl.appendChild(cardbodyEl);

  cardsEl.appendChild(aEL);
  
  searchResEl.appendChild(cardsEl);
  
  
  
  }

  searchResEl.appendChild(colEl);

} 

function BooksbyTitle(data)
{

  searchResEl.innerHTML="";

  var colEl=document.createElement("div");
    colEl.className="col-md-3 card-group";
    

  for(i=0;i<data[0].docs.length;i++)
  {
  
  var cardsEl=document.createElement("div");
  cardsEl.className="card ws";
 
  colEl.appendChild(cardsEl);

  var imgEL=document.createElement("img");
  imgEL.className="img-thumbnail";
  imgEL.src="https://covers.openlibrary.org/b/id/"+data[0].docs[i].cover_i+"-L.jpg";
  cardsEl.appendChild(imgEL);  
  
  var cardbodyEl=document.createElement("div");
  cardbodyEl.className="card-body";
  cardsEl.appendChild(cardbodyEl);
  
  var h5El=document.createElement("h5");
  h5El.className="card-title";
  h5El.innerHTML=data[0].docs[i].title.toUpperCase();
  cardbodyEl.appendChild(h5El);
  
  var pEl=document.createElement("p");
  pEl.className="card-text";
  //pEl.innerHTML=" "+data[1].items[i].volumeInfo.description;
  cardbodyEl.appendChild(pEl);

  var ulEl=document.createElement("ul");
  ulEl.className="list-group list-group-flush";
  cardsEl.appendChild(ulEl);

  var liEL=document.createElement("li");
  liEL.className="list-group-item";
  
  liEL.innerHTML="ISBN: "+data[0].docs[i].isbn[0];
  //if(data[0].docs[i].birth_date==undefined){liEL.innerHTML="Birth Date:";}
 
  ulEl.appendChild(liEL);

  liEL=document.createElement("li");
  liEL.className="list-group-item";
  liEL.innerHTML="Publisher: "+data[0].docs[i].publisher[0];
  ulEl.appendChild(liEL);

  liEL=document.createElement("li");
  liEL.className="list-group-item";
  liEL.innerHTML="Author(s): "+data[0].docs[i].author_name;
  ulEl.appendChild(liEL);

  cardbodyEl=document.createElement("div");
  cardbodyEl.className="card-body";
  var aEL=document.createElement("a");
  aEL.href="https://openlibrary.org/"+data[0].docs[i].key;
  aEL.className="card-link";
  aEL.innerHTML="Details";

  cardsEl.appendChild(cardbodyEl);

  cardsEl.appendChild(aEL);
  
  searchResEl.appendChild(cardsEl);
  
  searchResEl.appendChild(colEl);
  
  }
}

function NYTBest() 
{
NYTEl.innerHTML="";
  nytbestlisturl="https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?&api-key=C64Wxwb4zFKo1Au8JiTYdjhCMzmt6ev0";
  fetch(nytbestlisturl).then(function(response) {
      
    response.json().then(function(data) {
      for(i=0;i<5;i++) {
        var nycardEl=document.createElement("div");
        nycardEl.className="card";
        NYTEl.appendChild(nycardEl);
        var aEL=document.createElement("a");
        aEL.href=data.results.books[i].amazon_product_url;
        aEL.target="_blank";
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
  //requestUrl2 ="https://www.googleapis.com/books/v1/volumes?q=\""+searchword+"\"+intitle&key="+GBooksApiID;
  console.log(requestUrl1);

  Promise.all([
    fetch(requestUrl1)
    //fetch(requestUrl2)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log(data);
  
    BooksbyTitle(data);
   

  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });



}// to search title
  else if(radioValue=="subject")
  {
//requestUrl1="http://openlibrary.org/subjects/"+searchword+".json"; // to search genre or subject
requestUrl2 ="https://www.googleapis.com/books/v1/volumes?q="+searchword+"+subject&maxResults=40&key="+GBooksApiID;

Promise.all([
  
  fetch(requestUrl2)
]).then(function (responses) {
  // Get a JSON object from each of the responses
  return Promise.all(responses.map(function (response) {
    return response.json();
  }));
}).then(function (data) {
  // Log the data to the console
  // You would do something with both sets of data here
  console.log(data);

  BooksbySubject(data);
 

}).catch(function (error) {
  // if there's an error, log it
  console.log(error);
});


  }
else if(radioValue=="author")
{
  requestUrl1="https://openlibrary.org/search/authors.json?q="+searchword;
  requestUrl2 ="https://www.googleapis.com/books/v1/volumes?q="+searchword+"+inauthor&key="+GBooksApiID;

  Promise.all([
    fetch(requestUrl1),
    //fetch(requestUrl2)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log(data);
  
    BooksbyAuthor(data);
   

  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });


}

  else //by ISBN
  {
    //requestUrl1="https://openlibrary.org/"+radioValue+"/"+searchword+".json"; // to search authors and isbn#
    requestUrl2 ="https://www.googleapis.com/books/v1/volumes?q="+searchword+"+isbn&maxResults=10&key="+GBooksApiID;


    Promise.all([
      fetch(requestUrl2)
    ]).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      // Log the data to the console
      // You would do something with both sets of data here
      console.log(data);
    
      BooksbyISBN(data);
     
  
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
  

  }    
} 


NYTBest();

userFormEl.addEventListener("submit", getApi);