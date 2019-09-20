const express = require("express");
const router = express.Router();

const data = require("../data");
const recipesData = data.recipes;
//getRecipesByID
router.get("/:id", async(req, res) => {
    try{
        const recipesByID = await recipesData.getRecipesByID(req.params.id);
        res.json(recipesByID);
    }
    catch(e){
        res.status(404).json({error : e})
    }
})
//getAllRecipes
router.get("/" , async (req, res)=>{
    try {
        
        const allRecipes = await recipesData.getAllRecipes();
        res.json(allRecipes)    
    } catch (e) {
        res.status(404).json({error : e})
    }
    
})
//addRecipes
router.post("/" , async(req, res) =>{
    const blogPostData = req.body;
    try {
        if(!blogPostData){
            res.status(404).json({error : "provide body"})
            return
        }
        
        if(!blogPostData.title){
            res.status(404).json({error : "provide title"})
            return
        }
        if(!blogPostData.ingredients){
            res.status(404).json({error : "provide ingrediants"})
            return
        }
        if(!blogPostData.steps){
            res.status(404).json({error : "provide steps"})
            return
        }
        //create the stuff and return it
        const {title , ingredients , steps} = blogPostData;
        const newRecipes = await recipesData.addRecipes(title,ingredients,steps)
        res.json(newRecipes);
        return newRecipes;

    } catch (e) {
        res.status(500).json({error : e})
    }
})
//updateRecipes
router.put("/:id", async(req, res) =>{
    const updatedData = req.body;
    try {
        await recipesData.getRecipesByID(req.params.id)
    } catch (error) {
        res.status(404).json({error : "Post not found"})
        return;
    }

    try {
        const updatedRecipes = await recipesData.updateRecipes(req.params.id, updatedData)
        res.json(updatedRecipes)
    } catch (e) {
        res.status(500).json({error : e});
    }
})
//patchRecipes
router.patch("/:id", async(req, res) => {
    //this is remaining
    const updatedData = req.body;
    
    try {
        const oldRecipes  = await recipesData.getRecipesByID(req.params.id)
        const updatedRecipes = await recipesData.patchRecipes(req.params.id, updatedData)
        res.json(updatedRecipes)
    } catch (e) {
        res.status(500).json({error : e})
        return;
    }

})
//removeRecipes
router.delete("/:id", async(req, res) => {
    try {
        await recipesData.getRecipesByID(req.params.id)
    } catch (error) {
        res.status(404).json({error : "recipes not found"})
        return;
    }

    try {
        const a = await recipesData.removeRecipes(req.params.id);
        res.send("Deleted")
        return;
    } catch (error) {
        res.status(500).json({error : "Problems while deleting"})
    }
})

module.exports = router;    