
const tm = require("./textMetrics");
const fd = require("./fileData");
const fs = require("fs")

const bluebird = require("bluebird");
const Promise = bluebird.Promise;

async function main() {
    var pathName = "chapter1"
    var path1 = pathName.toString();
    if(path1 == null || path1 == undefined || path1.length == 0){
        console.log("Enter Proper File Name")
        return
    }
//12792
//3053/895
//656
//4.18    
    //check if the matrix exists
    try{
        var filename = path1 + ".result.json"
        const file1 = await fd.getfilasjson(filename , "utf-8")
        console.log(file1.toString())
        return;
    }
    catch(e){
        console.log("No result matrix found by the name " +path1+".result.json. Creating one now!")

    }
    try{
        //take the contents of chapter1.txt and returns the contents
        var file1Text = await fd.getFileAsString(path1)

        //converts the contents to string
        if(file1Text == undefined){
            console.log("Sorry Wrong path. Can not create file")
            return
        }
        var file1TextString = file1Text.toString();
        
        //pass the string to make it simplify string
        var simplyfiedText = tm.simplify(file1TextString)

        //save simplyfiedText to  chapter1.debug.txt
        var a = await fd.saveStringToFile(path1 + ".debug.txt" , simplyfiedText)

        //console.log("hi")
        var mextrixS = tm.createMetrics(simplyfiedText)
        //console.log("This is sisisis " + mextrixS)

        await fd.saveJSONToFile(path1 + ".result.json" , mextrixS)
        console.log("result matrix created!")

        var filename = path1 + ".result.json"
        const file1 = await fd.getfilasjson(filename , "utf-8")
        //console.log(JSON.parse(file1))
        console.log(file1.toString())
    }
    catch(e){
        //throw "error found while creating file!!"
        console.log(e)
    }
  
    
}

main()