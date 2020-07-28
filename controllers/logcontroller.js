let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const log = require("../models/log");
let Log = require("../db").import("../models/log");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey!! This is a practice route!");
});

router.post("/create", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner: req.username.id,
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

router.get("/mine", validateSession, (req, res) => {
  let userId = req.username.id;
  Log.findAll({
    where: { owner: userId },
  })
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:title", function (req, res) {
  let title = req.params.title;

  Log.findAll({
    where: { title: title },
  })
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/about", function (req, res) {
  res.send("This is the about route");
});

router.put("/:Id", validateSession, function (req, res) {
  const updateLogEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
  };

  const query = { where: { id: req.params.entryId, owner: req.username.id } };

  Workout.update(updateLogEntry, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.username.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Journal Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
