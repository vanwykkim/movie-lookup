var giffyBtnEL = $(".giffy-btn");
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
var Giffy1 = $("#gif1")
var Giffy2 = $("#gif2")
var Giffy3 = $("#gif3")

//to fill title in load movie and use in get giffy
var movieT;
//to fill genre in load movie and use in get giffy
var movieG;


//TODO: kim will write this function 
//function will load the page with previous search history
function init(){
    fillDropDown();
    giffyBtnEL.prop("disabled",true);
}

//TODO: kim fill in the drop down with updated movie array
function fillDropDown(){
    var theMovieArray = JSON.parse(localStorage.getItem("myMovieArray"));
    if(theMovieArray != null && theMovieArray != 'undefined'){
        for(var i=0; i < theMovieArray.length; i++){
            var id= '#drop'+i;
            var dropEl = $(id);
            dropEl.children().text(theMovieArray[i]);
            dropEl.show();
        }
    }
}

//TODO: kim update move array in local storage
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
      localStorage.setItem("myMovieArray", JSON.stringify(theMovieArray));
      fillDropDown();
}

//function to get movie data from OMDB API 
function MovieData(movieTitle){
    var queryURL = "https://www.omdbapi.com/?t="+movieTitle+"&apikey="+movieapikey;
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        if(data.Response=="False"){
        //make a modal for the error message?
        //clear the fields
        console.log("need a modal");
        movieTitleEL.text("Movie Title: "+ movieTitle+" - Does Not Exist Try Again");
        movieYearEL.text("Year: ");
        movieGenreEL.text("Genre: ");
        movieRatingEL.text("Rating: ");
        movieruntimeEL.text("Runtime: ");
        movieDescriptionEL.text("Description: ");
        var PosterURL = "";
        PosterIMGEL.attr("src", PosterURL);
        }
        else{
        movieTitleEL.text("Movie Title: "+data.Title);
        movieT= data.Title;
        movieYearEL.text("Year: "+data.Year);
        movieGenreEL.text("Genre: "+data.Genre);
        movieG = data.Genre;
        movieRatingEL.text("Rating: "+data.Rated);
        movieruntimeEL.text("Runtime: "+data.Runtime);
        movieDescriptionEL.text("Description: "+data.Plot);
        var PosterURL = data.Poster;
        PosterIMGEL.attr("src", PosterURL);
        updateMovieArray(data.Title);
        }
        giffyBtnEL.prop("disabled",false);
    })  
}


//FIXME: faruk to get this 
function GifData(){
    var GIFApiKey = "UVKPRAWezXOtkDQ2himTTRn0V9DTKiPw";
    var GIFQueryURL = "https://api.giphy.com/v1/gifs/search?api_key="+GIFApiKey+"&q="+movieT+movieG+"&limit=3&lang=en";
    fetch(GIFQueryURL)
    .then(function(response2){
       return response2.json();
    })
    .then(function (data2){
        var gif1url = data2.data[0].images.original.url;
        Giffy1.attr("src",gif1url)
        var gif2url = data2.data[1].images.original.url;
        Giffy2.attr("src",gif2url)
        var gif3url = data2.data[2].images.original.url;
        Giffy3.attr("src",gif3url)
    })
}


//load the page with previous search history
init();

//TODO: kim will write this function 
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

// var dropLinkEL = $("#dropdown1");
// dropLinkEL.on("change", function(){
//     movieT = this.find(':selected').text();
//     console.log("hello "+movieT);
// });

giffyBtnEL.on("click", function(){
    //FIXME:giffyfunctions here
    GifData()
});


