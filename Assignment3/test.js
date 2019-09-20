// //Promise in JavaScript

// /**
//  * Q) What is Promise in Javascript?
//  *  Same like any promise in real life.
//  * 
//  * Technical:
//  * Function has completed task or not?
//  * 
//  */

//  //How to make a Promise

// //  let newPromise = new Promise(function(resolve, reject){
// //      //do some task
// //      var taskCompleted = false;

// //      if(taskCompleted){
// //          resolve()
// //      }
// //      else{
// //          reject()
// //      }
// //  })




// //How to call a promise


// // newPromise.then(function(){
// //     console.log("completed")
// // }).catch(function(){
// //     console.log("not complete")
// // })














// //  let newPromise = new Promise(function(resolve, reject){
// //      //some task done
     
// //      var taskDone = true;
// //      if(taskDone){
// //          resolve("task completed");
// //      }
// //      else{
// //          reject();
// //      }
// //  });

// //  newPromise.then(function(taskresult){
// //      //console.log("Task completed")
// //      console.log(taskresult)
// //  })

// var firstPromise = function(){
//     return new Promise(function(resolve , reject){
//         reject("first promise completed  ")
//     });
// }

// var secondPromise = function(message){
//     return new Promise(function(resolve , reject){
//         resolve(message + "second promise completed  ")
//     });
// }


// var thirdPromise = function(message){
//     return new Promise(function(resolve , reject){
//         resolve(message +"third promise completed")
//     });
// }

// firstPromise().then(function(result){
//     return secondPromise(result).then(function(result){
//         return thirdPromise(result).then(function(result){
//             console.log(result)
//         })
//     })
        
// }).catch(function(){
//     console.log("first not completed")
// })


const fs = require("fs")


var simple = function simple(text){
    //regex removes all elements except aphabets and space
    //2nd removes new lines *****TABS ARE REMAINING********
    var newText = text.toString().toLowerCase().replace(/[^a-zA-Z\s]/g,"").replace(/\r\n/g," ").replace(/ +/g," ").trim(); 
    return newText
    
    //console.log(newText);


}




// {
//     totalLetters: total number of letter characters in the simplified text,
//     totalWords: total number of words in the simplified text,
//     uniqueWords: total number of unique words that appear in the simplified text,
//     longWords: number of words in the text that are 6 or more letters long; this is a total count of individual words, not unique words,
//     averageWordLength: the average number of letters in a word in the text; this is counting the individual words, not unique words,
//     wordOccurrences: a dictionary of each word and how many times each word occurs in the text; numbers count as words
//  }

var createMetrics = function createMetrics(text){
    var simplifiedText = simple(text)
    var map = {}
    map.totalLetters = simplifiedText.length
    var ar = simplifiedText.split(" ");
    map.totalWords = ar.length;
    var set = new Set(ar);
    map.uniqueWords = set.size;
    var count = 0
    var totalLength = 0
    var newMap = {}

    ar.forEach(element => {
        totalLength = totalLength + element.length
        if(element.length > 6){
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

var text = fs.readFileSync("newText.txt");

//console.log(createMetrics(text))


async function test() {
    console.log("In the async fucntion");
    var promisedata = await newP()
    console.log(promisedata)
    console.log("after newP")

}

var newP =  function(){
    return new Promise(function(resolve , reject){
        resolve("resolved")
    })
}

//test()


/**
 * **************asynct getfilasjson(path)**********************
 * This method must be an async function, and will implicitly return a promise. 
 * You will await any promises inside this method to get the result of said promise 
 * (such as the result of a file operation) in order to use it in later on in the method.
 *  If the method enters a state that should return a rejected promise, you should achieve 
 * this by throwing, as thrown exceptions inside async methods cause the returned promise to be 
 * in a rejected state.
 * This method will, when given a path, return a promise that resolves to a JavaScript object. 
 * You can use the JSON.parse function to convert a string to a JavaScript object (if it's valid!).
 * If no path is provided, it will return a rejected promise.
 * If there are any errors reading the file or parsing the file, the returned promise will reject rather
 *  than resolve, passing the error to the rejection callback.
 */

var path = "newText.txt"
//getfilasjson(path)

const getfilasjson = async function (path){
    
    if (!path) {
        throw "Need to provide a file name";
      }
    
    try{

        const fileContent = await fs.readFileAsync(path , "utf-8")
        console.log(JSON.parse(fileContent))
        return  fileContent.toString();

    }
    catch(e){
        console.log("enter proper destination")
    }
    
}



async function main(){
    var a = await newMethod();
    var b = a.toString();
    console.log(b)
}

async function newMethod() {
    var sum = 0;
    for(var i = 0 ; i <= 100000 ; i++){
        sum = sum + i;
    }
    return sum
}

//main()

// //very randon text"
var tex = fs.readFileSync('newText.txt', function (err, data) {
    if (err) throw err;
    console.log(data);
  });

var text1 = tex.toString();
var newText = text1.toLowerCase().replace(/'/g,"").replace(/\n/g," ").replace(/[^a-zA-Z\ ]/g,"").replace(/\s\s+/g, ' ').trim(); 
var sp = newText.split(" ")
//onsole.log(sp)
console.log(newText)