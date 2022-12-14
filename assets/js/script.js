//global variables to access the buttons for listeners
var giffyBtnEL = $(".giffy-btn");
var searchBtnEl = $('.searchBtn');
var dropElementEl = $(".dropTitle");
var titleDrop = $("#dropTitle");
var startImgEl = $('#start-img');

// Get the modal
var modal = document.getElementById("myModal");
var errorTxt = document.getElementById("errorMsg");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//variables to hold movie data
var movieTitleEL = $("#title");
var movieDescriptionEL = $("#Desc");
var movieRatingEL = $("#Rating");
var movieYearEL = $("#ProductionYear");
var movieGenreEL = $("#Genre");
var movieruntimeEL = $("#Runtime");
var reviewsEL = $("#Reviews");
var PosterIMGEL = $("#poster")
var movieapikey = "9e98b158";
var Giffy1 = $("#gif1")
var Giffy2 = $("#gif2")
var Giffy3 = $("#gif3")


//global variables to hold data from movieData for the giffy search
//to fill title in load movie and use in get giffy
var movieT;
//to fill genre in load movie and use in get giffy
var movieG;


//function to initialize the page on start up
//function will load the page with previous search history
function init(){
    fillDropDown();
    //hide button not ready to use
    giffyBtnEL.hide();
    dropTitle.innerText = '';
}

//functio to fill in the drop down with updated movie array
function fillDropDown(){
    //get array from storage
    var theMovieArray = JSON.parse(localStorage.getItem("myMovieArray"));
    //make sure array initialized already
    if(theMovieArray != null && theMovieArray != 'undefined'){
        //fill the drop down and increase visible drop down size til 10
        for(var i=0; i < theMovieArray.length; i++){
            var id= '#drop'+i;
            var dropEl = $(id);
            dropEl.children().text(theMovieArray[i]);
            dropEl.show();
        }
    }
}

//function that updates array and moves into local storage
function updateMovieArray(movieTitleAPI){
    var theMovieArray = JSON.parse(localStorage.getItem("myMovieArray"));
    if(theMovieArray == null || theMovieArray == 'undefined'){
        //if no items yet can't have lenght?
        theMovieArray = [movieTitleAPI];
    }else{ 
        if(theMovieArray.indexOf(movieTitleAPI)>-1){ 
        //if the array already includes the Movie move it to front
            theMovieArray.splice(theMovieArray.indexOf(movieTitleAPI),1);
            theMovieArray.unshift(movieTitleAPI);
        }else if(theMovieArray.length < 10){
            //just need to add
            theMovieArray.unshift(movieTitleAPI);
        }else{
            //remove from end and add to front so load in order on buttons with newest on top
            theMovieArray.pop();
            theMovieArray.unshift(movieTitleAPI);
        }
    }
      //set updated array in storage
      dropTitle.innerText = 'Checkout the Last '+ theMovieArray.length + " Movies Searched";
      localStorage.setItem("myMovieArray", JSON.stringify(theMovieArray));
      fillDropDown();
}

//function to get movie data from OMDB API 
function MovieData(movieTitle){
    //hide button not ready to use
    giffyBtnEL.hide();
    Giffy1.hide();
    Giffy2.hide();
    Giffy3.hide();
    var queryURL = "https://www.omdbapi.com/?t="+movieTitle+"&apikey="+movieapikey;
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        if(data.Response=="False"){
        //make modal visible for the error message
        if(movieTitle== null || movieTitle == ""){
            errorTxt.innerText = "You need to enter a title to search."
        }else{
            var error = movieTitle+" is not a searchable title.";
            errorTxt.innerText = error;
    }
        modal.style.display = "block";
        //clear the fields for retry
        startImgEl.show();
        movieTitleEL.text("");
        movieYearEL.text("");
        movieGenreEL.text("");
        movieRatingEL.text("");
        movieruntimeEL.text("");
        movieDescriptionEL.text("");
        reviewsEL.text("");
        var PosterURL = "";
        PosterIMGEL.attr("src", PosterURL);
        }
        else{
            startImgEl.css("display", "none");  
        movieTitleEL.text("Movie Title: "+data.Title);
        movieT= data.Title;
        movieYearEL.text("Year: "+data.Year);
        movieGenreEL.text("Genre: "+data.Genre);
        movieG = data.Genre;
        movieRatingEL.text("Rated: "+data.Rated);
        movieruntimeEL.text("Runtime: "+data.Runtime);
        var tomato = '';
        var meta = '';
        var imdb = '';
        for(var i = 0; i < data.Ratings.length; i++){
            if(data.Ratings[i].Source == "Rotten Tomatoes"){
                tomato = data.Ratings[i].Value;           
            }else if(data.Ratings[i].Source == "Metacritic"){
                meta = data.Ratings[i].Value;   
            }else if(data.Ratings[i].Source == "Internet Movie Database"){
                imdb = data.Ratings[i].Value;
                console.log(data.Ratings[i].Value + " IMDB");
            }
        }
        reviewsEL.text("Ratings: Rotten Tomatoes "+tomato +", Metacritic "+meta+", IMDB "+imdb);
        movieDescriptionEL.text("Description: "+data.Plot);
        var PosterURL = data.Poster;
        PosterIMGEL.attr("src", PosterURL);
        updateMovieArray(data.Title);
        }
        //show button now ready to use
       giffyBtnEL.show();
    })  
}


//gets the gif data 
function GifData(){
    var GIFApiKey = "UVKPRAWezXOtkDQ2himTTRn0V9DTKiPw";
    var GIFQueryURL = "https://api.giphy.com/v1/gifs/search?api_key="+GIFApiKey+"&q="+movieT+movieG+"&limit=100&lang=en";
    fetch(GIFQueryURL)
    .then(function(response2){
       return response2.json();
    })
    .then(function (data2){
        if (data2.meta.status === 200) {
            function generateRandomInteger(max) {
                return Math.floor(Math.random() * max) + 1;
            }
            let value1 = generateRandomInteger(20);
            let value2 = generateRandomInteger(15);
            let value3 = generateRandomInteger(10);
            var gif1url = data2.data[value1].images.original.url;
            Giffy1.attr("src",gif1url)
            Giffy1.show();
            var gif2url = data2.data[value2].images.original.url;
            Giffy2.show();
            Giffy2.attr("src",gif2url)
            var gif3url = data2.data[value3].images.original.url;
            Giffy3.show();
            Giffy3.attr("src",gif3url)
        } else {
            var GIFQueryURL2 = "https://api.giphy.com/v1/gifs/search?api_key="+GIFApiKey+"&q="+movieG+"&limit=100&lang=en";
            fetch(GIFQueryURL2)
            .then(function(response3){
               return response3.json();
            })
            .then(function (data3){
            function generateRandomInteger(max) {
                return Math.floor(Math.random() * max) + 1;
            }
            let value1 = generateRandomInteger(20);
            let value2 = generateRandomInteger(15);
            let value3 = generateRandomInteger(10);
            var gif1url = data3.data[value1].images.original.url;
            Giffy1.show();
            Giffy1.attr("src",gif1url);
            var gif2url = data3.data[value2].images.original.url;
            Giffy2.show();
            Giffy2.attr("src",gif2url);
            var gif3url = data3.data[value3].images.original.url;
            Giffy3.show();
            Giffy3.attr("src",gif3url);
        })
        }
    })
    
}


//load the page with previous search history
init();

//Event listener to run functions on button click 
searchBtnEl.on("click", function(){
    giffyBtnEL.prop("disabled",true);
    var movieTxtEl = $(".movieTxt");
    movieTitle = movieTxtEl.val().trim();
    MovieData(movieTitle);
    movieTxtEl.val("");
    PosterIMGEL.css("display", "block");
});

//initialize the dropdown
$( document ).ready(function(){
    $(".dropdown-trigger").dropdown();
})

//clicks for dropdown elements
dropElementEl.on("click",function(){
    giffyBtnEL.prop("disabled",true);
    movieTitle = this.textContent;
    MovieData(movieTitle);
    PosterIMGEL.css("display", "block");
});

//event listener for the giffy button
giffyBtnEL.on("click", function(){
    
    GifData()
    Giffy1.css("display", "inline");
    Giffy2.css("display", "inline");
    Giffy3.css("display", "inline");

});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
