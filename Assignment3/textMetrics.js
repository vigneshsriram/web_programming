/**
 * this method will export a method called simplify text
 * This method will take a string of text and will:
Convert the text to lowercase
Remove all characters except for letters and whitespace characters
Convert all white space to simple spaces (new lines become spaces; tabs become spaces, spaces stay the same, etc)
Convert all duplicate spaces to be single spaces; ie, hello phil with 5 spaces between each word becomes 
hello phil with one space between each word
Trim the whitespace off the start and end of the text
Return the result.

Secondly, this module will export a method, createMetrics(text) 
which will scan through the text, simplify the text, and return an object with 
the following information based on the simplified text:
 */

var simplify = function simplify(text){
    //regex removes all elements except aphabets and space
    //2nd removes new lines *****TABS ARE REMAINING********
    //var newText = text.toLowerCase().replace(/[^a-zA-Z\s]/g,"").replace(/\r\n/g," ").replace(/ +/g," ").trim(); 
    //var newText = text.toLowerCase().replace(/'/g,"").replace(/[^a-zA-Z\ ]/g," ").replace(/\s\s+/g, ' ').replace(/\n/g," ").trim();
    var newText = text.toLowerCase().replace(/'/g,"").replace(/\n/g," ").replace(/[^a-zA-Z\ ]/g," ").replace(/\s\s+/g, ' ').trim(); 
    return newText
    
    //console.log(newText);
}

var createMetrics = function createMetrics(text){
    var simplifiedText = simplify(text)
    var map = {}
    
    var ar = simplifiedText.split(" ");
    map.totalLetters = (simplifiedText.length - ar.length + 1)
    map.totalWords = ar.length;
    
    var set = new Set(ar);
    map.uniqueWords = set.size;
    var count = 0
    var totalLength = 0
    var newMap = {}

    ar.forEach(element => {
        totalLength = totalLength + element.length
        if(element.length >= 6){
            count = count + 1;
        }

        if(newMap[element] != undefined){
            //console.log(element)
            
            var old = newMap[element];
            var newVal = old + 1;
            //console.log(newVal)
            newMap[element] = newVal
        }
        else{
            newMap[element] = 1
        }

    });
    map.longWords = count

    map.averageWordLength = (totalLength/ar.length)
    
    map.wordOccurrences = newMap;

    return map;

}

module.exports = {
    firstName: "Vignesh", 
    lastName: "Sriram", 
    studentId: "10430312",
    simplify,
    createMetrics
};