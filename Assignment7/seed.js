const dbConnection = require("./config/mongoConnection");
const data = require("./data/");

const recipes = data.recipes;

const main = async() => {
    const db = await dbConnection();
    await db.dropDatabase();

    const firstrecipes = await recipes.addRecipes(
        "Boiled Egg",
        [{
            name : "Egg",
            amount : "2"
        },
    {
        name : "Water",
        amount: "2 cups"
    }],
    [
        "put eggs in water",
        "Boil the water"
    ]
    )
    console.log("Added!")
    await db.serverConfig.close();
}

main().catch(console.log)