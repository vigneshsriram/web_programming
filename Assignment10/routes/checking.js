const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.user;
const bcrypt = require("bcrypt");

var authUser;
//to get login page****************
router.get("/", async (req, res) => {
    //var cookie //= req.cookie.AuthCookie;
    if(req.cookies.AuthCookie === undefined){
         res.render("posts/login");
     }
     else{
         //here we will render private
         res.redirect("/private");
     }
    
    //res.render("posts/login");
    //console.log(res.cookie.AuthCookie);
  
});

// to get private**************
router.get("/private" , async(req, res, next) =>{
    //var cooky = req.cookies.AuthCookie;
    //res.render("posts/private", authUser);


     if (req.cookies.AuthCookie === undefined){
         res.status(403).redirect("posts/error");
     }
     else{
         res.render("posts/private", authUser);
     }
})



router.get("/logout", async(req, res)=>{
    res.clearCookie("AuthCookie");
    res.render("posts/logout");
    
    //console.log("Cookie has been cleared")
    //clear cookie here
})
// router.post("/private", async (req, res) => {

//     let operation = req.body;
//     var username = operation.palindrome;
//     var passwd = operation.psw;
//     var checkpalindrome = await postData.checkPalindrome(username,passwd)
// })

router.post("/login", async(req, res, next) =>{
    //var cookiye = undefined;
    var username = req.body.username;
    var password = req.body.password;

    //console.log(username , password);
    if(req.cookies.AuthCookie == undefined){
        try{
            var user = await userData.checkLogin(username,password)
            //console.log("This is user " + user);
        }
        catch(e){
            console.log("somthing")
        }
        

        if(!user){
            res.render("posts/login" , {err : "Username or password incorrect"})
            //console.log("got no user")
        }    

        else{
            res.cookie("AuthCookie", "");
            authUser = user;
            //res.cookie("AuthCookie", authUser.username)
            res.redirect("/private");
        }
    }

    else{
        //cookie already present
        res.redirect("/private");
    }

})

module.exports = router;