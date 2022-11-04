var songBtnEl = $(".songBtn");
var searchBtnEl = $('.searchBtn');

//variables to hold movie data
var movieTitleEL = $("#title");
var movieDescriptionEL = $("#Desc");
var movieRatingEL = $("#Rating");
var movieYearEL = $("#ProductionYear");
var movieGenreEL = $("#Genre");
var movieruntimeEL = $("#Runtime");
var PosterIMGEL = $("#poster")
var movieapikey = "9e98b158";


//TODO: kim will write this function to initialize form
function init(){;}

//TODO: kim fill in the drop down with updated movie array
function fillDropDown(){}

//TODO: kim update move array in local storage
function updateMovieArray(){;}


//FIXME: faruk to get this with OMDB API
function MovieData(movieTitle){
    var queryURL = "https://www.omdbapi.com/?t="+movieTitle+"&apikey="+movieapikey;
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        console.log(data);
        movieTitleEL.text("Movie Title: "+data.Title);
        movieYearEL.text("Year: "+data.Year);
        movieGenreEL.text("Genre: "+data.Genre);
        movieRatingEL.text("Rating: "+data.Rated);
        movieruntimeEL.text("Runtime: "+data.Runtime);
        movieDescriptionEL.text("Description: "+data.Plot);
        var PosterURL = data.Poster;
        PosterIMGEL.attr("src", PosterURL);
    })
}


//FIXME: faruk to get this Napster or something else
function getSongData(){;}

//FIXME: faruk add song data to form
function loadSongData(){};


//TODO: kim will write this function 
searchBtnEl.on("click", function(){
    var movieTxtEl = $(".movieTxt");
    //TODO: get movie title
    movieTitle = movieTxtEl.val().trim();
    //updateMovieArray();
    //fillDropDown();
    MovieData(movieTitle);
    console.log(movieTitle)
});


//TODO: kim will write this function 
songBtnEl.on("click", function(){
    getSongData();
    loadSongData();
});

//TODO: kim will write this function
/*dropDownEl.on("click", function(){
    //TODO: get the movie title that was clicked
    //this.content?
    getMovieData();
    loadMovieData();
});


//copied from w3

// /* When the user clicks on the button, 
// toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }
  
//   // Close the dropdown if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
