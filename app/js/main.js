//Import modules the ES6 way
import Module from "./module"
import ko from "../../bower_components/knockout/dist/knockout.js"

//Use the Module class
var a = new Module();
a.speak();

a.setPhrase("New Phrase");

//Knockout was loaded with the ES6 module syntax
var b = ko.observable("Knockout hello");

document.getElementById("mainDiv").innerHTML = b();

//Even arrow functions work !
var c = (name) => {return "Hello " + name;}

console.log(c("World"));

//Testing the variable templates
a.setFirstName("Joel");
a.setLastName("Lord");
console.log(a.getName());