
//Display text on the main page as it is typed
    //Save it automatically if possible


//storing chapters -- as objects or arrays?
//button and hotkey to make chapters
    //chapters change number depending on their order
//Display chapters larger (as headers?)
//Chapter names and numbers are added to the outline table in order
    //Click a chapter in the outline table to go to that chapter
    
    
//Reference image section populates images
    //file>open and drag and drop
        //function to add images to the reference viewer window
        //function to include images on drag and drop
        //function to include images on file>open
        //function to export reference table
    //function to separate reference images by topic
    //Function to tie an array or object of topics to the reference viewer


//Storing specific words or phrases in objects or arrays to be used in functions
    //topics
    //Non-topic items to be fed to API's

var topics = [];
var wikiTopics = [];
var pexelTopics = [];
var topicsPane = $(".topics-interior");

//function to store selected text as a topic
$(document).on("click", ".store-topic", function(event) {
    event.preventDefault;
    var randomColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    var text = window.getSelection().toString();
    if (topics.indexOf(text) === -1){
        var textFormat = (text.toLowerCase().charAt(0).toUpperCase() + text.slice(1)).trim();
        topics.push(textFormat);      
        topics.sort();
        console.log(topics);
        var newTopic = $("<div class='topic-circle' style='background-color: " + randomColor + ";'></div>");
        var topicText = $("<p class='topic-text text-center'>" + textFormat + "</p>")
        newTopic.append(topicText);
        topicsPane.append(newTopic);
        linkText();
    } else {
        console.log("Topic already stored!")
    }
});

//function to store selected text as a wikipedia lookup topic
$(document).on("click", ".wiki-topic", function(event) {
    event.preventDefault;
    var wikiText = window.getSelection().toString();
    wikiTopics.push(wikiText.toLowerCase());
    wikiTopics.sort();
    console.log(wikiTopics);
});

//function to store selected text as a pexels lookup topic
$(document).on("click", ".pexel-topic", function(event) {
    event.preventDefault;
    var pexText = window.getSelection().toString();
    pexelTopics.push(pexText.toLowerCase());
    pexelTopics.sort();
    console.log(pexelTopics);
});

//Linking text in the user content to topics
function linkText(){
    var userContent = $("#writing-content").text();

    for (var i = 0; i < topics.length; i++){
        var currentTopic = topics[i];
        var topicFormatted = currentTopic.trim().toLowerCase();
        var start = userContent.toLowerCase().indexOf(topicFormatted);
        var length = topicFormatted.length;
        if (start > -1){
            var stop = start + length;
            var res = userContent.substring(start, stop);

            //TODO::
            //Ability to cycle through all instances of res as they appear in userContent

        }
        console.log(res);
    }
}

//API searches the chosen topic when it is right-clicked