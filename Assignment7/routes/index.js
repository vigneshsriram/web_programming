const recipesRoutes = require("./recipes");

const constructorMethod = (app) => {
    app.use("/recipes", recipesRoutes);

    app.use("*" , (req, res) => {
        res.sendStatus(404);
    })
}

module.exports = constructorMethod;