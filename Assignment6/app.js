const express = require("express");

let app = express();
let configRoutes = require("./routes");

configRoutes(app)


app.listen(3000 , () => {
    console.log("Connected!")
})
