const express = require('express');
const router = express.Router();
const data = require("../data");
const aboutData = data.about;

router.get("/", async (req , res) => {
    try{
        const postline = await aboutData.getAbout();
        res.json(postline);
    }
    catch(e){
        res.status(500).send();
    }
})

module.exports = router;