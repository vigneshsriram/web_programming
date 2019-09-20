const express = require("express")
const router = express.Router()
const data = require("../data")
const postData = data.palindrome

router.get("/", (req, res) => {
    res.render("palindrome/static")
})

router.post("/result", (req, res) => {
    //res.render("palindrome/result")

    let bigPostData = req.body;
    var input = bigPostData.palindrome
    input = input.replace(/ /g,"").replace(/\n/g,"").replace(/[^a-zA-Z0-9\ ]/g,"").replace(/\s\s+/g, "").trim();
 
    var PalindromeChecker = postData.isPalindrome(input)
    
    if(PalindromeChecker == undefined){
        //throw 400 error here
        res.status(404).render("palindrome/result" , {palindrome : input , title : "Results" , testclass: "neutral" , res: "Cannot work with blank string"})
        //res.render("palindrome/result" , {palindrome : input , title : "Results" , testclass: "neutral" , res: "Cannot compare blank string"})
    }
    else if(PalindromeChecker == "multiple"){
        res.status(404).render("palindrome/result" , {palindrome : input , title : "Results" , testclass: "neutral" , res: "Multiple arguments found!"})
    }
    else if(PalindromeChecker){
        res.render("palindrome/result" , {palindrome : input , title : "Results" , testclass: "success" , res: " is a palindrome"})
    }
    else{
        res.render("palindrome/result" , {palindrome : input , title : "Results" , testclass: "failure" , res: " is not a palindrome"})
    }
})

module.exports = router;