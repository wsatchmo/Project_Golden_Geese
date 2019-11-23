
//Display text on the main page as it is typed
    //Save it automatically if possible

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
    //Chapters
    //Non-topic items to be fed to API's

var topics = [];

//function to store selected text
$(document).on("click", ".store-topic", function(event) {
    event.preventDefault;
    var text = window.getSelection().toString();
    topics.push(text.toLowerCase());
    topics.sort();
    console.log(topics);
});




//API searches the chosen topic when it is right-clicked
