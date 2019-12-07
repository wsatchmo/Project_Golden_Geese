var thesaurusOutput = $("#thesaurus-output");

function getThesaurus(word){
  // This is our API key
  var APIKey = '2b8f64b49d6a2e4036c0d26c1944eafd';

  // Here we are building the URL we need to query the database
  var queryURL = 'https://words.bighugelabs.com/api/2/2b8f64b49d6a2e4036c0d26c1944eafd/' + word + '/json';

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
    if (response.noun){
      var noun = response.noun;
      var nounSyn = noun.syn;
      thesaurusOutput.append("<p style='margin-top: 10px; margin-bottom: 0px; font-size: 16px; font-weight: bold; font-style: italic;'>Noun:</p>");
      addToPage(nounSyn);
      console.log("nounSyn:");
      console.log(nounSyn);
    }
    if (response.verb){
      var verb = response.verb;
      var verbSyn = verb.syn;
      thesaurusOutput.append("<p style='margin-top: 7px; margin-bottom: 0px; font-size: 16px; font-weight: bold; font-style: italic;'>Verb:</p>");
      addToPage(verbSyn);
      console.log("verbSyn:");
      console.log(verbSyn);
    }
    if (response.adjective){
      var adjective = response.adjective;
      var adjectiveSyn = adjective.syn;
      thesaurusOutput.append("<p style='margin-top: 10px; margin-bottom: 0px; font-size: 16px; font-weight: bold; font-style: italic;'>Adjective:</p>");
      addToPage(adjectiveSyn);
      console.log("adjectiveSyn:");
      console.log(adjectiveSyn);
    }
    if (response.adverb){
      var adverb = response.adverb;
      var adverbSyn = adverb.syn;
      thesaurusOutput.append("<p style='margin-top: 10px; margin-bottom: 0px; font-size: 16px; font-weight: bold; font-style: italic;'>Adverb:</p>");
      addToPage(adverbSyn);
      console.log("adverbSyn:");
      console.log(adverbSyn);
    }
    // call a function to put on page 
  });
}

// TODO :: Use if statements to select verb, noun, etc from response if they exist
function addToPage(words){
  for (var i = 0; i < words.length; i++){
    var word = words[i];
    var wordP = $("<p class='thesaurus-word' style='width: 300px; margin-left: 10px; display: inline;'>");
    wordP.append(word);
    thesaurusOutput.append(wordP);
    thesaurusOutput.append("<br>");
  }
}
  
$("#thesaurus-btn").on("click", function(event){
  thesaurusOutput.empty();  
  event.preventDefault();
  var queryParamater = document.getElementById("thesaurus-input").value;
  if(queryParamater !== "" && queryParamater !== undefined){
    getThesaurus(queryParamater)
  } else{
    alert ("you need to type something");
  }
});