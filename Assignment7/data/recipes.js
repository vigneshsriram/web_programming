const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes

const uuid = require("node-uuid");

const exportedMethods = {
    async getAllRecipes(){
        const recipesCollection = await recipes();
            const arr = await recipesCollection.find({}).toArray();
            if(arr.length == 0){
                throw "Database is empty"
            }
            var arr1 = [];
            for(var i  = 0; i <arr.length; i++)
                {
                arr1[i]={}
                arr1[i]._id = arr[i]._id
                arr1[i].title = arr[i].title
                }
                return arr1;
            //return arr
        
    },

    async getRecipesByID(id){
        if(!id) {
            throw "No id provided"
        }
        if(arguments.length != 1){
            throw "Provide only 1 argument"
        }
        if(id == null || id == undefined){
            throw "error"
        }
        
        const recipesCollection = await recipes();
        var rec = await recipesCollection.find({ _id: id}).toArray();
        var rec2 = await recipesCollection.find({ _id: id});
        if(Object.keys(rec).length == 0){
            throw "no such object found"
        }
        return rec[0];
    },

    async addRecipes(title,ingredients,steps){
        if(arguments.length != 3){
            throw "extra arguments"
        }
        if(!title){
            throw " no title"
        }
        if(!ingredients){
            throw "no ingrediants"
        }
        if(!steps){
            throw " no steps"
        }

        if(title == null || title == undefined){
            throw "enter proper title"
        }
        if(ingredients == null || ingredients == undefined){
            throw "enter proper ingredients"
        }
        if(steps == null || steps == undefined){
            throw "enter proper steps"
        }
        //title is string
        if(typeof title != "string"){
            throw "title should be string"
        }

        //Check if title is blank
        var tits = title
        tits = tits.replace(/\s/g, "");
        if(tits.length == 0){
            throw "Blank title"
        }

        title = title.trim();
        
        if(!Array.isArray(ingredients)){
            throw "ingrediants is not array"
        }

        if(!Array.isArray(steps)){
            throw "steps is not array"
        }

        if(ingredients.length == 0){
            throw "ingredients is empty"
        }

        if(steps.length==0){
            throw "steps is empty"
        }

        for(var i = 0; i<ingredients.length; i++){
            if(Object.keys(ingredients[i]).length !=2){
                throw "enter only name and amount"
            }

            //check if it is an object
            if(typeof(ingredients[i]) != 'object'){
                throw "it is not a object"
            }

            //check if it not an array
            if(Array.isArray(ingredients[i])){
                throw "object cannot be array"
            }

            //check if object is empty
            if(Object.keys(ingredients[i]).length === 0 && ingredients[i].constructor === Object){
                throw "ingredients object is empty"
            }

            if(typeof ingredients[i].name != 'string'){
                throw "name should be string"
            }

            if(ingredients[i].name == null){
                throw "name is null or blank"
            }

            if(ingredients[i].name == ""){
                throw "name is blank"
            }

            var ingreName = ingredients[i].name.trim();
            //ingreName.replace(/\s/g,"")

            if(ingreName.length == 0){
                throw "name of ingredients cannot be blank"
            }

            if(typeof ingredients[i].amount != 'string'){
                throw "amount should be string"
            }

            if(ingredients[i].amount == null){
                throw "amount is null"
            }

            if(ingredients[i].amount === ""){
                throw "amount is blank"
            }

            var amtName = ingredients[i].amount.trim();
            //amtName.replace(/\s/g,"")

            if(amtName.length == 0){
                throw "amount of ingredients cannot be blank"
            }

            ingredients[i].name = ingredients[i].name.trim()
            ingredients[i].amount = ingredients[i].amount.trim() 

        }

        for(var i = 0; i<steps.length; i++){
            //check if each element is a string
            if(typeof steps[i] != 'string'){
                throw "not a string"
            }
            //check if any element is blank
            var newS = steps[i];
            //str = str.replace(/abc/g, '');

            newS = newS.replace(/\s/g, "");
            if(newS.length == 0){
                throw "string is blank"
            }

            if(steps[i] == null){
                throw "steps cannot have null"
            }
            steps[i] = steps[i].trim();

        }

        const recipesCollection = await recipes();

        const newRecipes = {
            _id : uuid.v4(),
            title:title,
            ingredients : ingredients,
            steps : steps
        }

        const newInfo = await recipesCollection.insertOne(newRecipes);
        const newID = newInfo.insertedId;
        return await this.getRecipesByID(newID)
        
    },

    async updateRecipes(id, updatedData){
        const recipesCollection = await recipes();
        const newRecipesData = {}

        if(updatedData.title){

            if(typeof updatedData.title != 'string'){
                throw "title is not string"
            }
            updatedData.title = updatedData.title.trim();

            var tits = updatedData.title
            tits = tits.replace(/\s/g, "");
            if(tits.length == 0){
                throw "Blank title"
            }

            newRecipesData.title = updatedData.title
        }
        else{
            throw "no title given/check spelling"
        }
        
        if(updatedData.steps){
            if(!Array.isArray(updatedData.steps)){
                throw "steps is not array"
            }

            if(updatedData.steps.length==0){
                throw "steps is empty"
            }

            for(var i = 0; i<updatedData.steps.length; i++){
                //check if each element is a string
                if(typeof updatedData.steps[i] != 'string'){
                    throw "element in steps is not a string"
                }
                //check if any element is blank
                var newS = updatedData.steps[i];
                //str = str.replace(/abc/g, '');
    
                newS = newS.replace(/\s/g, "");
                if(newS.length == 0){
                    throw "string is blank in steps"
                }
    
                if(updatedData.steps[i] == null){
                    throw "steps cannot have null"
                }
                updatedData.steps[i] = updatedData.steps[i].trim();
    
            }


            newRecipesData.steps = updatedData.steps
        }
        else{
            throw "no steps given/ check spelling"
        }

        if(updatedData.ingredients){

            if(!Array.isArray(updatedData.ingredients)){
                throw "ingrediants is not array"
            }
    
            if(updatedData.ingredients.length == 0){
                throw "ingredients is empty"
            }

            for(var i = 0; i<updatedData.ingredients.length; i++){
                //check if it is an object
                if(typeof(updatedData.ingredients[i]) != 'object'){
                    throw "it is not a object"
                }
    
                //check if it not an array
                if(Array.isArray(updatedData.ingredients[i])){
                    throw "object in ingredients cannot be array"
                }
    
                //check if object is empty
                if(Object.keys(updatedData.ingredients[i]).length === 0 && updatedData.ingredients[i].constructor === Object){
                    throw "ingredients object is empty"
                }

                if(typeof updatedData.ingredients[i].name != 'string'){
                    throw "ingredients is not a string"
                }
    
                if(updatedData.ingredients[i].name == null){
                    throw "name of Ingredient is null or blank(Use : name and amount)"
                }
                updatedData.ingredients[i].name = updatedData.ingredients[i].name.trim() 
    
                if(updatedData.ingredients[i].name === ""){
                    throw "name is blank in ingredients"
                }

                if(typeof updatedData.ingredients[i].amount != 'string'){
                    throw "amount of ingredient is not a string"
                }
    
                if(updatedData.ingredients[i].amount == null){
                    throw "amount is null"
                }
                updatedData.ingredients[i].amount = updatedData.ingredients[i].amount.trim();
    
                if(updatedData.ingredients[i].amount === ""){
                    throw "amount in ingredients is blank"
                }

                
            }
            newRecipesData.ingredients = updatedData.ingredients
        }
        else{
            throw "no ingredients given/check spelling"
        }

        if(Object.keys(newRecipesData).length === 0 && newRecipesData.constructor === Object)
        {
            throw 'Invalid input to put'
        }
        var updateCommand = {
            $set : newRecipesData
        };

        var query = {
            _id : id
        }
        
        await recipesCollection.updateOne(query,updateCommand);
        return await this.getRecipesByID(id)
    },

    async removeRecipes(id){
        if(arguments.length != 1){
            throw "provide only 1 argument"
        }
        
        const recipesCollection = await recipes();
        const deletionInfo = await recipesCollection.removeOne({ _id : id})

        if(deletionInfo.deletedCount === 0){
            throw "could not deletes"
        }
    },

    async patchRecipes(id, updatedData){
    
        const recipesCollection = await recipes();
        const newRecipesData = {}

        if(updatedData.title != null){
            
            if(typeof updatedData.title != 'string'){
                throw "title is not string"
            }
            updatedData.title = updatedData.title.trim();

            var tits = updatedData.title
            tits = tits.replace(/\s/g, "");
            if(tits.length == 0){
                throw "Blank title"
            }

            if(updatedData.title.length == 0){
                throw "Title is blank"
            }
            
            newRecipesData.title = updatedData.title
        }

        //Check steps
        if(updatedData.steps){

            if(!Array.isArray(updatedData.steps)){
                throw "steps is not array"
            }

            if(updatedData.steps.length==0){
                throw "steps is empty"
            }

            for(var i = 0; i<updatedData.steps.length; i++){
                //check if each element is a string
                if(typeof updatedData.steps[i] != 'string'){
                    throw "element in steps is not a string"
                }
                //check if any element is blank
                var newS = updatedData.steps[i];
                //str = str.replace(/abc/g, '');
    
                newS = newS.replace(/\s/g, "");
                if(newS.length == 0){
                    throw "string is blank in steps"
                }
    
                if(updatedData.steps[i] == null){
                    throw "steps cannot have null"
                }
                updatedData.steps[i] = updatedData.steps[i].trim();
    
            }


            newRecipesData.steps = updatedData.steps        
        }
        //for ingredients
        if(updatedData.ingredients){
            if(!Array.isArray(updatedData.ingredients)){
                throw "ingrediants is not array"
            }
    
            if(updatedData.ingredients.length == 0){
                throw "ingredients is empty"
            }

            for(var i = 0; i<updatedData.ingredients.length; i++){
                //check if it is an object
                if(typeof(updatedData.ingredients[i]) != 'object'){
                    throw "it is not a object"
                }
    
                //check if it not an array
                if(Array.isArray(updatedData.ingredients[i])){
                    throw "object in ingredients cannot be array"
                }
    
                //check if object is empty
                if(Object.keys(updatedData.ingredients[i]).length === 0 && updatedData.ingredients[i].constructor === Object){
                    throw "ingredients object is empty"
                }

                if(typeof updatedData.ingredients[i].name != 'string'){
                    throw "ingredients is not a string"
                }
    
                if(updatedData.ingredients[i].name == null){
                    throw "name of Ingredient is null or blank(Use : name and amount)"
                }
                updatedData.ingredients[i].name = updatedData.ingredients[i].name.trim() 
    
                if(updatedData.ingredients[i].name === ""){
                    throw "name is blank in ingredients"
                }

                if(typeof updatedData.ingredients[i].amount != 'string'){
                    throw "amount of ingredient is not a string"
                }
    
                if(updatedData.ingredients[i].amount == null){
                    throw "amount is null"
                }
                updatedData.ingredients[i].amount = updatedData.ingredients[i].amount.trim();
    
                if(updatedData.ingredients[i].amount === ""){
                    throw "amount in ingredients is blank"
                }
            }
            newRecipesData.ingredients = updatedData.ingredients
        }
        if(Object.keys(newRecipesData).length === 0 && newRecipesData.constructor === Object)
            {
                throw 'Invalid input to patch'
            }

        var updateCommand = {
            $set : newRecipesData
        };

        var query = {
            _id : id
        }
        
        await recipesCollection.updateOne(query,updateCommand);
        return await this.getRecipesByID(id)

    }
}

module.exports = exportedMethods;