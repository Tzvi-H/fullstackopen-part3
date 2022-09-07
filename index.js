require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();

const personsController = require("./controllers/persons");

const { errorHandler } = require("./utils/middleware");

const port = process.env.PORT;

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("body", function (req, res) {
  return req.body ? JSON.stringify(req.body) : "";
});

app.get("/info", async (req, res) => {
  const peopleCount = await Person.count({});
  const currentDate = Date().toLocaleString();
  res.send(`Phonebook has info for ${peopleCount} people
  <br><br>
  ${currentDate}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/persons", personsController);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
