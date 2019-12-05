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
            var randomColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
            var text = keys[i];
            if (topics.indexOf(text) === -1){
                topics.push(text);      
                topics.sort();
                var newTopic = $("<div class='topic-circle' style='background-color: " + randomColor + "; display: table; overflow: hidden;'></div>");
                var topicText = $("<p class='topic-text text-center' style='display: table-cell; vertical-align: middle;'>" + text + "</p>")
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
    var randomColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    var text = $("#topic-input").val().toString().trim();
    console.log("text: " + text);
    if (topics.indexOf(text) === -1){
        var textFormat = (text.toLowerCase().charAt(0).toUpperCase() + text.slice(1)).trim();
        topics.push(textFormat);      
        topics.sort();
        console.log(topics);
        var newTopic = $("<div class='topic-circle' style='background-color: " + randomColor + ";'></div>");
        var topicText = $("<p class='topic-text text-center'>" + textFormat + "</p>")
        newTopic.append(topicText);
        topicsPane.append(newTopic);
    } else {
        console.log("Topic already stored");
        $(document).ready(function(){
            $('#modal5').modal('open');
        });
    }
    var topicPush = topics;
    // make a request to firebase 
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    if (user && user != null) {
        //push the array to firebase
        firebase.database().ref('users/' + userId ).child('topics').set(
            topicPush
            //user text
        );
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