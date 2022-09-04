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

personsController.post("/", (req, res) => {
  const id = Math.floor(Math.random() * 10000);
  const { name, number } = req.body;
  const newPerson = { id, name, number };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

personsController.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

module.exports = personsController;
