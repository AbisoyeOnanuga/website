// load text file
$(document).ready(function() {
    $("#text").load("content.txt");
});
// load only a paragraph from text file
$(document).ready(function() {
    $("#text").load("content.txt p:first");
});
// load JSON object property 'text' into a <p> element with an id of "text"
fetch("content.json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("text").innerHTML = data.text;
    })
    .catch(error => {
        console.error(error);
    });
