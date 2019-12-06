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

//Set password to ***** and checkbox to [ ] on page load
window.onload = function() {
    var passwordInput = document.getElementById("password-input");
    var passwordCheckbox = document.getElementById("password-checkbox");
    passwordInput.type = "password";
    passwordCheckbox.checked = false;
    console.log("Password Hidden")
}

//Show password function:
function showPassword() {
    var passwordInput = document.getElementById("password-input");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

//function to get currently signed in user on page load
$( document ).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;     
        if (user && user != null) {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + userId + '/text').once('value').then(function(snapshot) {
                console.log("text snapshot: ");
                console.log(snapshot);
                $("#content-box").text(snapshot.node_.value_);
            });
            loadTopics(userId);
        } else {
        // No user is signed in.
        console.log("No User Logged In");
        }
    });
});

// .__.  .  .  .___.  .__.   __.  .__.  .  .  .___
// [__]  |  |    |    |  |  (__   [__]  \  /  [__ 
// |  |  |__|    |    |__|  .__)  |  |   \/   [___

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
    var textBody = $("#content-box").text();
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

//  __.  ._.  .__   .  .    .  .  .__ 
// (__    |   [ __  |\ |    |  |  [__)
// .__)  _|_  [_./  | \|    |__|  |  

// attach event listener to newuser button
$("#new-user-btn").on("click", function(event) { //get user info
    event.preventDefault(); // prevent default behavior
    // grab values from password and email fields
    var email = $("#username-input").val().trim();
    var password = $("#password-input").val().trim();
    // make a request to firebase
    //Reject the email or password if firebase cannot take it in
    if (email === "" || !email.includes("@") || !email.includes(".") || password.length() < 6){
        $(document).ready(function(){
            $('#modal3').modal('open');
        });
    } else {
        createUser(email, password);
    }
    password = $("#password-input").val("");
});

//Creating user data for the authentication
function createUser(email, password){ 
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            welcomeUser(); //Modal to welcome new users
        }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        userExists(errorCode);
        console.log(errorCode, errorMessage);
        var topics = [];
        console.log(topics);
    });
    $("#content-box").text("");
    $("#topics-interior").empty();
}

function userExists(errorCode){
    if (errorCode){
        //modal for 'user already exists, cannot create account'
        $(document).ready(function(){
            $('#modal6').modal('open');
        });
        return;
    } 
}

//Modal function for signup
function welcomeUser(){
    //Modal to welcome new users to wordcloud
    $(document).ready(function(){
        $('#modal7').modal('open');
    });
}

// .     .__.  .__   ._.  .  .
// |     |  |  [ __   |   |\ |
// |___  |__|  [_./  _|_  | \|

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
        firebase.database().ref('/users/' + userId + '/text').once('value').then(function(snapshot) {
            console.log("text snapshot: ");
            console.log(snapshot);
            $("#content-box").text(snapshot.node_.value_);
        });
        loadTopics(userId);
    } 
}

//==================PASSWORD RESET, SIGNOUT==================

//password reset function
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

//user signout function
function signOutUser(){
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
    $("#content-box").text("");
    $("#topics-interior").empty();
}

//For Modals
$(document).ready(function(){
    $('.modal').modal();
});