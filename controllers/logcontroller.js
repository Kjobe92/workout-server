let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const log = require("../models/log");
let Log = require("../db").import("../models/log");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey!! This is a practice route!");
});

router.post("/", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner: req.user.id,
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  Log.findAll()
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", validateSession, (req, res) => {
  let id = req.params.id;
  Log.findAll({
    where: { id: id },
  })
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// router.get("/:title", function (req, res) {
//   let title = req.params.title;

//   Log.findAll({
//     where: { title: title },
//   })
//     .then((log) => res.status(200).json(log))
//     .catch((err) => res.status(500).json({ error: err }));
// });

// router.get("/about", function (req, res) {
//   res.send("This is the about route");
// });

router.put("/:id", validateSession, function (req, res) {
  const updateLogEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
  };

  const query = { where: { id: req.params.id, owner: req.user.id } };

  Log.update(updateLogEntry, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Workout Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
