const personsController = require("express").Router();

const Person = require("../models/person");

personsController.get("/", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
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

personsController.post("/", async (req, res) => {
  const { name, number } = req.body;

  // if (!name) {
  //   return res.status(400).json({ error: "name is missing" });
  // } else if (!number) {
  //   return res.status(400).json({ error: "number is missing" });
  // } else if (persons.some((person) => person.name === name)) {
  //   return res.status(400).json({ error: "name must be unique" });
  // }

  const newPerson = new Person({ name, number });
  await newPerson.save();
  res.json(newPerson);
});

personsController.delete("/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((_result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = personsController;
