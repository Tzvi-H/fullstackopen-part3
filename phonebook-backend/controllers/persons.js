const personsController = require("express").Router();

const data = require("../data.json");

personsController.get("/", (req, res) => {
  res.json(data);
});

module.exports = personsController;
