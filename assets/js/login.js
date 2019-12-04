//Initialize Firebase
var config = {
    apiKey: "AIzaSyBtr7RXc1xMn2Dpaq4clWNqINsWAfBwag0",
    authDomain: "wordcloud-cd654.firebaseapp.com",
    databaseURL: "https://wordcloud-cd654.firebaseio.com",
    projectId: "wordcloud-cd654",
    storageBucket: "wordcloud-cd654.appspot.com",
    messagingSenderId: "835307039957",
    appId: "1:835307039957:web:3736745b8d1d54d986465c"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

//Show password function:
function myFunction() {
    var x = document.getElementById("password-input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

//timer to autosave to database after a user has typed in the text field
var typingTimer;                
var doneTypingInterval = 5000;  //5 second timer
var textInput = $('#content-box');

//on keyup, start the countdown
textInput.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
  $(".autosave-datetime").text("");
});

//on keydown, clear the countdown 
textInput.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is finished typing
function doneTyping () {
    console.log("Done typing");
    //save the data to Firebase
    var textBody = $("#content-box").val();
    console.log(textBody);
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    if (user && user != null) {
        var today = new Date();
        var hrs = today.getHours();
        var mins = today.getMinutes();
        var time = hrs + ":" + mins;
        time = time.split(':'); // convert to array
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var timeValue;
        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
        }
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        $(".autosave-datetime").text("Autosaved at " + timeValue);
        //Writing user data to the DATABASE
        firebase.database().ref('users/' + userId ).child('text').set(
            textBody
            //user text
        );
    }
}

//function to get currently signed in user
$( document ).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;     
        if (user && user != null) {
            var userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/users/' + userId + '/text').once('value').then(function(snapshot) {
                console.log(snapshot);
                $("#content-box").val(snapshot.node_.value_);
            });
        } else {
        // No user is signed in.
        console.log("No User Logged In");
        }
    });
});

//================NEW USER=================

// attach event listener to newuser button
$("#new-user-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase
    //Creating user data for the AUTHENTICATION
    createUser(email, password);
    password = $("#password-input").val("");
});

// new user request to firebase
function createUser(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

//Writing user data to the Database
function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
}

//================LOGIN=================

// attach event listener to login button
$("#login-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase 
    signInUser(email, password);
    password = $("#password-input").val("");
});

// sign in request to firebase
function signInUser(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        $(document).ready(function(){
            $('#modal1').modal('open');
        });
    });
    var user = firebase.auth().currentUser;     
    if (user && user != null) {
        //load text to text box once signed in
        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId + '/text').once('value').then(function(snapshot) {
            console.log(snapshot);
            $("#content-box").val(snapshot.node_.value_);
        });
    } 
}

function passwordReset(){
    var email = $("#username-input").val().trim();
    console.log("Email: " + email);
    if (email && email != "" && email != null && email != undefined){
            //Send password reset email
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            // MODAL TO SAY Email sent.
            $(document).ready(function(){
                $('#modal2').modal('open');
            });
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
}

function signOutUser(){
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
    $(document).ready(function(){
        $('#modal3').modal('open');
    });
}

$(document).ready(function(){
    $('.modal').modal();
});

//* * * TODO _________________________________________________________ 
//Load the topics arrays to the document

//Load all of a user's files in the file tab
    //When a user opens the file, its corresponding text appears below
    //Also able to make new in file tab

//Prevent a request from being made to pexels without login