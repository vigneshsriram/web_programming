const palindromeRoutes = require("./palindrome");
const resultRoutes = require("./result")

const palindromeMethods = (app) => {
    app.use("/", palindromeRoutes);
    //app.use("/result", resultRoutes)

    app.use("*", (req, res) => {
        res.redirect("/");
    })
};

module.exports = palindromeMethods;