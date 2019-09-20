

const checkRoutes = require("./checking");

const constructorMethod = app =>{
    app.use("/", checkRoutes);

}

module.exports = constructorMethod;