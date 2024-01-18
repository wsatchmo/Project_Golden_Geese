var topics = []; //pull topics from firebase
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
        // console.log("topics snapshot: ");
        // console.log(snapshot);
        // console.log("keys: ");
        // console.log(keys);
    });
}

//  _              _          
// | |_ ___  _ __ (_) ___ ___ 
// | __/ _ \| '_ \| |/ __/ __|
// | || (_) | |_) | | (__\__ \
//  \__\___/| .__/|_|\___|___/
//          |_|               

//Function to store selected text as a topic
$(document).on("click", "#store-topic", function(event) {
    event.preventDefault();
    // make a request to firebase 
    var user = firebase.auth().currentUser;
    if (user && user != null) {
        var userId = user.uid;
        var randomColor = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
        var text = $("#topic-input").val().toString().trim();
        var textFormat = (text.charAt(0).toUpperCase() + text.slice(1)).trim();
        // console.log("Formatted text: " + textFormat);
        if (topics.indexOf(textFormat) === -1 && text != ""){
            topics.push(textFormat);      
            topics.sort();
            // console.log(topics);
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
            
            // console.log(topics);
            $(document).ready(function(){
                $('#modal5').modal('open');
                $('#modal5-text').text("'" + textFormat + "' removed from topics.");
            });
            firebase.database().ref('users/' + userId ).child('topics').set(
                topics
                //user text
            );
        }
        $("#topic-input").val("");
    } else {
        $(document).ready(function(){
            $('#modal4').modal('open');
        });
    }
});

//Highlighting topics
var highlight;
$(document).on("click", ".topic-circle", function(event) {
    event.preventDefault();
    var node = this;
    //get the text associated with the given topic-circle
    var wordSearch = node.textContent;
    
    if (highlight === true) {
        $('#content-box').removeHighlight(wordSearch);
        console.info("Unhighlighted " + wordSearch);
        highlight = false;
        return;
    }
    highlight = false;
    if (wordSearch && wordSearch != null && wordSearch != undefined){
        var contentbox = $('#content-box').val();
        $('#content-box').highlight(wordSearch);
        console.info("Highlighted " + wordSearch);
        highlight = true;
    }
});


//                                                             _.._
//      _            _                          _            .' .-'`
//   __| | __ _ _ __| | __  _ __ ___   ___   __| | ___     /  /
//  / _` |/ _` | '__| |/ / | '_ ` _ \ / _ \ / _` |/ _ \    |  |
// | (_| | (_| | |  |   <  | | | | | | (_) | (_| |  __/    \  '.___.;
//  \__,_|\__,_|_|  |_|\_\ |_| |_| |_|\___/ \__,_|\___|     '._  _.'
//                                                             ``             

let dark = false;
//Function to make page dark mode
$(document).on("click", "#toggle-dark", function(event) {
    event.preventDefault();

    //If dark mode is off, change elems to turn it on
    if (dark === false) {
        $('#content-box').css({"background-color": "#dfdfdf"});
        $('.key-point').css({"background-color": "black"});
        $('.bighuge-thesaurus').css({"color": "white"});
        $('.ref-image').css({"border": "2px solid #333333"});
        $('#bg-effect').addClass("dark");
        $('#bg-effect').removeClass("light");
        $('#thesaurus-input').css({"color": "white"});
        dark = true;
        return;
    }
    //If dark mode is on, change elems to turn it off
    if (dark === true){
        $('#content-box').css({"background-color": "white"});
        $('.key-point').css({"background-color": "#777474"});
        $('.bighuge-thesaurus').css({"color": "black"});
        $('.ref-image').css({"border": "2px solid black;"});
        $('#bg-effect').addClass("light");
        $('#bg-effect').removeClass("dark");
        $('#thesaurus-input').css({"color": "#495057"});
        dark = false;
        return;
    }
});