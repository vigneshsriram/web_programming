const express = require('express');
const router = express.Router();
const data = require("../data");
const storyData = data.story;

// router.get("/" , (req , res) => {
//     storyData.getStory().then((postList) => {
//         res.json(postList);
//     }, () =>{
//         //something is wrong
//         res.status(500).send();
//     })
// })


router.get("/", async (req, res) => {
    try {
      const postList = await storyData.getStory();
      res.json(postList);
    } catch (e) {
      res.status(500).send();
    }
  });

module.exports = router;