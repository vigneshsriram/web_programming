const uuidv1 = require('uuid/v1');
const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems


module.exports = {
    async createTask(title, description){
        if(!title){
            throw "title cant be blank"
        }

        if(!description){
            throw "description cant be blank"
        }

        if(arguments.length !=2){
            throw "Only enter 2 arguments"
        }

        const taskCollection = await todoItems(); //makes an object of mongoCollections
        //generate id using uuid package
        var id = uuidv1();

        var objToInsert = {
            completed : false,
            completedAt : null,
            title : title,
            description : description,
            _id : id
        }
        

        //add this object to the database
        const insertInfo = await taskCollection.insertOne(objToInsert)
            if(insertInfo.insertedCount === 0) {
                throw "could not insert item"
            }
        
        const newId = insertInfo.insertedId;
        const task = await this.getTask(newId)
        return task;

    },

    async getTask(id){
        if(!id) throw "enter id"

        if(arguments.length !=1){
            throw "Only enter 1 argument"
        }

        const taskCollection = await todoItems();
        const taskGo = await taskCollection.findOne({ _id: id})
        if(taskGo == null) throw "now such id found"

        return taskGo
    },

    async completeTask(taskId){
        if(!taskId) throw "enter id"

        if(arguments.length !=1){
            throw "Only enter 1 argument"
        }

        const taskCollection = await todoItems()
        try{
        const updateItem = {
                $set: {
                    completed: true,
                    completedAt: new Date().toString()
                }
                
        }
        const updatedItem = await taskCollection.updateOne({_id:taskId},
        updateItem)
        if(updatedItem.modifiedCount == 0 ){
            throw "Could not update the item.Try again"
        }
        return await this.getTask(taskId);
        }
        catch(e){
            console.log(e)
        }

        
    },

    async removeTask(id){
        if(!id){
            throw "enter id to find"
        }

        if(arguments.length !=1){
            throw "Only enter 1 argument"
        }

        const taskCollection = await todoItems();
        const deletionInfo = await taskCollection.removeOne({_id: id})

        if(deletionInfo.deletedCount === 0){
            throw "The task could not be deleted"
        }

    },

    async getAllTasks(){
        const taskCollection = await todoItems() //
        const allTasks = await taskCollection.find({}).toArray();
        return allTasks;
    }


}

