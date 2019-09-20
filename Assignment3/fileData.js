
/**
 * async getFileAsString(path)
 * async getFileAsJSON(path)
 * async saveStringToFile(path, text)
 * async saveJSONToFile(path, obj)
 */

const bluebird = require("bluebird");
const Promise = bluebird.Promise;

const prompt = bluebird.promisifyAll(require("prompt"));
const fs = bluebird.promisifyAll(require("fs"));
var util = require('util');

/**
 * async getFileAsString(path)
This method must be an async function, and will implicitly return a promise. You will await any
promises inside this method to get the result of said promise (such as the result of a file 
    operation) in order to use it in later on in the method. If the method enters a state that 
    should return a rejected promise,
you should achieve this by throwing, as thrown exceptions inside async methods cause the returned
 promise to be in a rejected state.
This method will, when given a path, return a promise (implicitly, due to being defined as an 
async function) that resolves to a string with the contents of the files.
If no path is provided, it will return a rejected promise.
If there are any errors reading the file, the returned promise will reject rather than resolve,
passing the error to the rejection callback.
 */


  async function getFileAsString(path){
    //I can call an await here
    path = path + ".txt"
    //console.log(path)
    if (!path || path == undefined) {
        throw "Need to provide a file name getFileAsString";
      }
    
    try{
        const fileContent = await fs.readFileAsync(path , "utf-8")
        let fileContentString = fileContent.toString()
        //console.log("This is fileContentString "+fileContentString)
        return fileContentString;
    }
    catch(e){
        console.log("enter proper destination")
    }
   
    
}
//path = "newText.txt"
//console.log("getFileAsString: " + getFileAsString(path))


//*************************************** */
//var path = "jsonFile.txt"
async function getfilasjson(path){
    //path = path + ".txt"
    console.log(path)
    if (!path || path == undefined){
        throw "Need to provide a file name getfilasjson";
      }
    
    try{
        const fileContent = await fs.readFileAsync(path , "utf-8")
        //fileContent = '{"text" : "this is awesome"}'
        if (typeof (fileContent) != 'string')
        fileContent = JSON.stringify(fileContent)
        //console.log(JSON.parse(fileContent)) 
        return fileContent  
    }
    catch(e){
        throw "create file"
    }
    return null
    
}
//console.log("getfilasjson: " + getfilasjson(path))

//************************************************************* */
//take the text and save it to the path 
//should return a promise resolved when it has saved it successfully
async function saveStringToFile(path , text){
    
    if (!path) {
        throw "Need to provide a file name saveStringToFile";
      }

    if(!text){
        throw "No text found. Cannot Save file!"
    }

    try{
        const a = await fs.writeFileAsync(path , text)
        
    }
    catch(e){
        console.log("Write was unsuccessfull")
    }
    return "Write was successfull"
}
//console.log("Save String to File: " + saveStringToFile("newFile" , "some very awesome text!!"))

//*********************************************************** */
//take obj and convert if to json
//return promise which will be true when saved

async function saveJSONToFile(path, obj){
    if(!path || !obj){
        throw "pass correct parameters"
    }

    // return new Promise(function(resolve , reject){
    //     //see whether obj > json
    //     if (typeof obj != 'string')
    //     obj = JSON.stringify(obj)
    //     if(JSON.parse(obj)){
    //         resolve("converted to json")
    //     }
    // }).then(function(path , obj){
    //     return new Promise(function(resolve , reject){
    //         //save it to a file
    //         if(fs.writeFileSync(path , obj)){
    //             resolve("saved to file")
    //         }
    //     })
    // }).catch(function(){
    //     console.log("Could not write the file!")
    // })
    try{
        if (typeof obj != 'string')
        obj = JSON.stringify(obj)
        JSON.parse(obj)
           
        await fs.writeFileAsync(path , obj)

    }
    catch(e){
        throw "probelms with json!"
    }


    //return null
}
// var jason = {
// 	"age" : "24",
// 	"hometown" : "Missoula, MT",
// 	"gender" : "male"
// };

//console.log("Save JSON to File: " + saveJSONToFile("newjson" , jason))




module.exports = {
    getFileAsString,
    getfilasjson,
    saveStringToFile,
    saveJSONToFile

}











 
// console.log(a)
//  async function getFileAsStrings(path){
    
//     const fileContent = await fs.readFileAsync(path, "utf-8");

//     //console.log(fileContent)
//  }

 
 
//  var readFile = util.promisify(fs.readFile);

// async function getFileAsString(path) {
//     // `readFile()` will throw proper error if `path` is invalid
//     const fileContent = await readFile(path, 'utf-8')
//     console.log(fileContent)
//     return fileContent
// }
  /**
   * Soln 1 : Using try catch
   * async function getFileAsString(path){
    
    try{
        if(!path){
            throw "no path found"
        }

        const fileContent = await fs.readFileAsync(path, "utf-8");
        console.log(fileContent)
        return fileContent.toString();

    }
    catch(err){
        console.log("Enter proper path/ file name")
    }
    

}
   */

   /**
    * Soln 2 : unisng promises

    async function getFileAsString(path){
    let promise = function(message){
        return new Promise(function(resolve , reject){
            if(!path){
                reject("No path found")
            }
            else{
                resolve("path found!")
            }
        })
        
    }

    let promise1 = function(message){
        return new Promise(function(resolve , reject){
            try{
                let returnFile = fs.readFileAsync(path, "utf-8" )
                resolve(returnFile)
            }
            catch(e){
                reject("wrong path")
            }

        })
        
        
    }

    promise().then(function(res){
        return promise1(res).then(function(res){
            return res
        })
    }).catch(function(){
        console.log("Path not found")
    })
    
}

    */