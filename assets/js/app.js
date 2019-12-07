var topics = []; //pull topics from firebase
var pexelTopics = [];
var topicsPane = $("#topics-interior");

//Loading topics to the page
function loadTopics(userId){
    var keys = [];
    topics = [];
    var tops = firebase.database().ref('/users/' + userId).child('topics').orderByChild('topics');
    tops.once('value').then(function(snapshot) {
        snapshot.forEach(function(item) {
            var itemVal = item.val();
            keys.push(itemVal);
        });
        for (let i=0; i < keys.length; i++) {
            var randomColor = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
            var text = keys[i];
            if (topics.indexOf(text) === -1){
                topics.push(text);      
                topics.sort();
                var newTopic = $("<div class='topic-circle' id=" + text + " style='background-color: " + randomColor + ";'></div>");
                var topicText = $("<p class='topic-text text-center'>" + text + "</p>")
                newTopic.append(topicText);
                topicsPane.append(newTopic);
            }
        }
        console.log("topics snapshot: ");
        console.log(snapshot);
        console.log("keys: ");
        console.log(keys);
    });
}

//function to store selected text as a topic
$(document).on("click", "#store-topic", function(event) {
    event.preventDefault();
    // make a request to firebase 
    var user = firebase.auth().currentUser;
    if (user && user != null) {
        var userId = user.uid;
        var randomColor = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
        var text = $("#topic-input").val().toString().trim();
        var textFormat = (text.charAt(0).toUpperCase() + text.slice(1)).trim();
        console.log("Formatted text: " + textFormat);
        if (topics.indexOf(textFormat) === -1 && text != ""){
            topics.push(textFormat);      
            topics.sort();
            console.log(topics);
            var newTopic = $("<div id=" + textFormat + " class='topic-circle' style='background-color: " + randomColor + ";'></div>");
            var topicText = $("<p class='topic-text text-center' style='display: table-cell; vertical-align: middle;'>" + textFormat + "</p>")
            newTopic.append(topicText);
            topicsPane.append(newTopic);
            //push the array to firebase
            firebase.database().ref('users/' + userId ).child('topics').set(
                topics
                //user text
            );
        } else if (topics.indexOf(textFormat) >= 0 && text != "") {
            var arrIndex = topics.indexOf(textFormat);
            topics.splice(arrIndex, 1);
            //delete this topic
            $("#" + textFormat + "").remove();
            
            console.log(topics);
            $(document).ready(function(){
                $('#modal5').modal('open');
                $('#modal5-text').text("'" + textFormat + "' removed from topics.");
            });
            firebase.database().ref('users/' + userId ).child('topics').set(
                topics
                //user text
            );
        } else {
            console.log("No text entered; topic must be at least one character")
        }
        $("#topic-input").val("");
    } else {
        $(document).ready(function(){
            $('#modal4').modal('open');
        });
    }
});

var highlight;
$(document).on("click", ".topic-circle", function(event) {
    event.preventDefault();
    var node = this;
    //get the text associated with the given topic-circle
    var wordSearch = node.textContent;
    
    if (highlight === true) {
        $('#content-box').removeHighlight(wordSearch);
        console.log("unhighlighted " + wordSearch);
        highlight = false;
        return;
    }
    highlight = false;
    if (wordSearch && wordSearch != null && wordSearch != undefined){
        var contentbox = $('#content-box').val();
        $('#content-box').highlight(wordSearch);
        console.log("highlighted " + wordSearch);
        highlight = true;
    }
});