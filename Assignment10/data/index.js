//const checkRoutes = require("./checking");
const userRoutes = require("./user");

let constructorMethod = (app) => {
  //  app.use("/checking", checkRoutes);
    app.use("/user", userRoutes);
};

module.exports = {
    //checking : require("./checking"),
    user: require("./user")
};