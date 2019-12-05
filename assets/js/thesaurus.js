function getThesaurus(word){
    // This is our API key
    var APIKey = '2b8f64b49d6a2e4036c0d26c1944eafd';
  
    // Here we are building the URL we need to query the database
    var queryURL = 'https://words.bighugelabs.com/api/2/2b8f64b49d6a2e4036c0d26c1944eafd/' + word + '/json';
    console.log(queryURL);
  
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "jsonp",
      headers: {
        'Authorization': APIKey
      } 
    })
  
    .then(function(response) {
      // Log the resulting object
        console.log(response);
        var words = response[Object.keys(response)[0]].syn;
        console.log("words: ");
        console.log(words);
        // call a function to put on page 
        addToPage(words);
    });
  }

  // make a function called handleResponse
function addToPage(words){
    console.log("function called");
    console.log(words);
    var thesaurusOutput = $("#thesaurus-output");
    thesaurusOutput.empty();
    for (var i = 0; i < words.length; i++){
        var word = words[i];
        var wordP = $("<p class='thesaurus-word' style='width: 300px; margin-right: 10px; display: inline;'>");
        wordP.append(word);
        thesaurusOutput.append("<br>");
        thesaurusOutput.append(wordP);
    }
}
  
  $("#thesaurus-btn").on("click", function(event){
    $(".thesaurus-output").empty();  
    event.preventDefault();
    var queryParamater = document.getElementById("thesaurus-input").value;
    console.log(queryParamater);
    if(queryParamater !== "" && queryParamater !== undefined){
        getThesaurus(queryParamater)
    } else{
      alert ("you need to type something");
    }
});