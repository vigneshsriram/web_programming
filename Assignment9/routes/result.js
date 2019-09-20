const express = require("express")
const router = express.Router()

router.get("/result" , (req, res) => {
    res.render("palindrome/result")
})

module.exports = router;

