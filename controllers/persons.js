const personsController = require("express").Router();

const Person = require("../models/person");

personsController.get("/", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

personsController.get("/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        res.status(404).json({ error: `id ${req.params.id} does not exist` });
      } else {
        res.json(person);
      }
    })
    .catch((error) => next(error));
});

personsController.post("/", async (req, res, next) => {
  const { name, number } = req.body;

  const person = await Person.findOne({ name });

  if (person) {
    return res.status(400).json({ error: "name already exists" });
  }
  //else if (!number) {
  //   return res.status(400).json({ error: "number is missing" });
  // } else if (persons.some((person) => person.name === name)) {
  //   return res.status(400).json({ error: "name must be unique" });
  // }

  const newPerson = new Person({ name, number });
  try {
    await newPerson.save();
    res.json(newPerson);
  } catch (error) {
    next(error);
  }
});

personsController.put("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const savedPerson = await Person.findByIdAndUpdate(
      id,
      { number: req.body.number },
      { new: true, runValidators: true, context: "query" }
    );

    if (!savedPerson) {
      return res.status(404).json({ error: `id ${id} does not exist` });
    }

    res.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

personsController.delete("/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((_result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = personsController;
