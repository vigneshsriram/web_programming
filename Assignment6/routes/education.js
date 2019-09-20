const express = require('express');
const router = express.Router();
const data = require("../data");
const educationData = data.education;

router.get("/", async (req , res) => {
    try{
        const postline = await educationData.getEducation();
        res.json(postline);
    }
    catch(e){
        res.status(500).send();
    }
})

module.exports = router;