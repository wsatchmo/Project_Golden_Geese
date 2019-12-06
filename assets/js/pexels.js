function makePexelsRequest (queryParamater, page){
  // This is our API key
  var APIKey = "563492ad6f9170000100000100165f60dc7644b4853c25a2932b8457";

  // Here we are building the URL we need to query the database
  var queryURL = `https://api.pexels.com/v1/search?query=${queryParamater}&per_page=15&page=` + page;
  console.log(queryURL);


  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      'Authorization': APIKey
    } 
  })

  .then(function(response) {
    // Log the resulting object
    // console.log(response);
    var photos = response.photos;
    console.log(response);
    // call a function named handleResponse, 
    handleResponse (photos);
  });
}

// make a function called handleResponse
function handleResponse (photos){
  // console.log(photos);
  for(var i = 0; i<photos.length; i++){
    var photo =  photos[i];
    var imageContainer = $(".image-dropping");
    var image = `<img class='pexels-image' src="${photo.src.medium}">`
    imageContainer.prepend(image);
  }
}

var tempParam = "";
var page;
$("#search-btn").on("click", function(e){
  e.preventDefault();
  var queryParamater = document.getElementById("photo-input").value;
  if (tempParam != queryParamater){
    page = 1;
    tempParam = queryParamater;
    console.log("queryParamater:");
    console.log(queryParamater);
    console.log("tempParam:");
    console.log(tempParam);
    if(queryParamater !== "" &&queryParamater !==undefined){
      makePexelsRequest (queryParamater, page)
    } else{
      console.log("you need to type something");
    }
  } else {
    if(queryParamater !== "" &&queryParamater !==undefined){
      page++;
      makePexelsRequest (queryParamater, page)
    } else{
      console.log("you need to type something");
    }
  }
});