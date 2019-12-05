function makePexelsRequest (queryParamater){
  // This is our API key
  var APIKey = "563492ad6f9170000100000100165f60dc7644b4853c25a2932b8457";

  // Here we are building the URL we need to query the database
  var queryURL = `https://api.pexels.com/v1/search?query=${queryParamater}&per_page=15&page=1`;
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
    // call a function named handleResponse, 
    handleResponse (photos);
  });
}

// make a function called handleResponse
function handleResponse (photos){
  // console.log(photos);
  for(var i = 0; i<photos.length; i++){
    var photo =  photos[i];
    console.log(photo);
    var imageContainer = $(".image-dropping");
    var image = `<img src="${photo.src.small}">`
    imageContainer.prepend(image);
  }
}

$("#search-btn").on("click", function(e){
  e.preventDefault();
  var queryParamater = document.getElementById("photo-input").value;
  console.log(queryParamater);
  if(queryParamater !== "" &&queryParamater !==undefined){
    makePexelsRequest (queryParamater)
  } else{
    alert ("you need to type something");
  }
});