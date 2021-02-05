require("dotenv").config();
var express = require("express");
var app = express();
let sequelize = require("./db");
/* ********************
 *** USER Login
 */
let log = require("./controllers/logcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();
app.use(require("./middleware/headers"));

app.use(express.json());

app.use("/log", log);
app.use("/user", user);

// app.use("/about-me", function (req, res) {
//   res.send("My name is Kayla and my age is 28");
// });

app.listen(3000, function () {
  console.log("App is listening on port 3002");
});
