require("dotenv").config();
const express = require("express");
const data = require("./data.json");

const app = express();

const personsController = require("./controllers/persons");

const port = process.env.PORT;

app.use(express.json());

app.use("/api/persons", personsController);

app.get("/info", (req, res) => {
  const peopleCount = data.length;
  const currentDate = Date().toLocaleString();
  res.send(`Phonebook has info for ${peopleCount} people
  <br><br>
  ${currentDate}`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
