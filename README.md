# Wordcloud

### A cloud-storage word processor for story writers

##### Team members: [Hyejin Kim](https://github.com/cshjnim "Hyejin's Github Page"), [Chris Genel](https://github.com/cgenel "Chris' Github Page"), Will Satcher  — *The Golden Geese*

```diff
+ HOW IT WORKS +
```
•Users write stories, articles, etc. in main writing section

•Users can store or delete topics in the topics pane on the left

•Clicking a topic highlights all instances of that topic in the writing section

•Users can search for reference images in the reference section, top right. Images are pulled from the Pexels API

•Users can search for synonyms of words in the thesaurus section, bottom right. Words are pulled from the Big Huge Thesaurus API

•Users must be logged in to save text and topics. Text autosaves five seconds after user finishes typing in the writing section. Text and stored topics populate on login

•If a user types their password incorrectly, they are given the option of resetting their password via email

```diff
! FEATURES TO BE ADDED !
```

•Switch reference image, topics, and thesaurus panes

•Drag-and-drop images from local storage into reference images pane for custom reference images

•Chapter outline pane; possibly as a switchable tab in the topics pane

```diff
# CODE NOTES #
```
•If you use this app frequently, there is a possibility the API will hit its request quota. You can register for an API Key from [Pexels](https://www.pexels.com/api/) or [Big Huge Thesaurus](https://words.bighugelabs.com/site/api) fairly easily. To use your own API Key, simply insert it in your code in the **pexels.js** or **thesaurus.js** files as follows:

```js
function makePexelsRequest (queryParamater, page){
    // Replace this long string with your own API Key ↓↓↓
    var APIKey = "563492ad6f9170000100000100165f60dc7644b4853c25a2932b8457"; 
    ...}
```

•If you make any changes in the **login.js** file, please be sure to input your own Firebase config information (found in Firebase project settings) first so there is no chance you overwrite another user's previously saved work. The Firebase config is as follows:

```js
//Replace this config object with your own Firebase configuration ↓↓↓
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
```

•If for some reason you would prefer to see anytonyms from the Thesaurus, you can change the code in **thesaurus.js** as follows:

```js
var nounSyn = noun.syn; //Simply find this variable and change it as shown below--
var nounSyn = noun.ant; //Note that you will no longer see synonyms for words entered
```

##### Resources Utilized:
###### Firebase
###### Bootstrap
###### Materialize
###### Pexels Image API
###### Big Huge Thesaurus API
###### Johann Burkard's Highlight Plugin
