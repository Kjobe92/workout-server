require("dotenv").config();
var express = require("express");
var app = express();
let sequelize = require("./db");
/* ********************
 *** USER Login
 */
let log = require("./controllers/logcontroller");
let user = require("./controllers/usercontroller");
app.use(require("./middleware/headers"));

sequelize.sync();

app.use(express.json());

app.use("api/user", user);
app.use(require("./middleware/validate-session"));
app.use("api/log", log);
// app.use("/about-me", function (req, res) {
//   res.send("My name is Kayla and my age is 28");
// });

app.listen(3002, function () {
  console.log("App is listening on port 3002");
});
