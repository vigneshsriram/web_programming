const todoItems  = require("./todo")
const connection = require("./mongoConnections")

const main = async() => {
    
    try{
    const task1 = await todoItems.createTask("Ponder Dinosaurs",
        "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?")
    console.log("1st task has been added")
    
    console.log(task1)
    console.log("*******************************************************************************")

    const task2 = await todoItems.createTask("Play Pokemon with Twitch TV",
    "Should we revive Helix?")
    console.log("Another Task has been added")
    console.log(task2);
    console.log("*******************************************************************************")
    //get all the tasks in the database

    console.log("Now we remove task with id "+ task1._id + "....")
    const rmTasks = await todoItems.removeTask(task1._id)
    console.log("Task was removed sucessfully!")
    console.log("*******************************************************************************")
    //display the remaining tasks in the database
    
    const remainingTask = await todoItems.getAllTasks();
    console.log("Total no of tasks in the database is/are "+ remainingTask.length)
    
    console.log("They is/are:")
    console.log(remainingTask)
    console.log("*******************************************************************************")
    console.log("Completing the remaining tasks....")
    console.log("Completed Tasks are:")
    //complete the remaining tasks
    for(var i = 0; i < remainingTask.length; i++){
        //console.log(remainingTask[i]._id)
        if(remainingTask[i].completedAt == null){
        const completedTask = await todoItems.completeTask(remainingTask[i]._id)
        console.log(completedTask)
        }
        else{
            console.log(remainingTask[i])
        }
    }

    console.log("*******************************************************************************")
    console.log("All remaining tasks completed")
    console.log("Closing the connections")
    const db = await connection();
    await db.close();

    console.log("Done!")
}
catch(e){
    console.log(e)
}
}

main().catch(error =>{
    console.log(error)
});
