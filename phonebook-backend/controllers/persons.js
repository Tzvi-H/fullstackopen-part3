const personsController = require("express").Router();

const persons = require("../data.json");

personsController.get("/", (req, res) => {
  res.json(persons);
});

personsController.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
});

module.exports = personsController;
