const personsController = require("express").Router();

let persons = require("../data.json");

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

personsController.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

module.exports = personsController;
