require("dotenv").config();
const express = require("express");

const app = express();

const personsController = require("./controllers/persons");

const port = process.env.PORT;

app.use(express.json());

app.use("/api/persons", personsController);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
