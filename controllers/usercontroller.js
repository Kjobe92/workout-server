const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* ********************
 *** USER SIGNUP ***
 ************************ */

router.post("/register", function (req, res) {
  User.create({
    username: req.body.user.username,
    passwordHash: bcrypt.hashSync(req.body.user.passwordHash, 13),
  })

    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        username: user,
        message: "User successfully created",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/* USER SIGNIN */

router.post("/login", function (req, res) {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.user.passwordHash, user.passwordHash,
         
          (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login failed" });
            }
          });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })

    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
