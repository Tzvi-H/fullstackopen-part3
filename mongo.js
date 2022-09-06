const mongoose = require("mongoose");
const [password, name, number] = process.argv.slice(2);

if (!password) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model("Person", PersonSchema);

const url = `mongodb+srv://16guitar:${password}@cluster0.1i94l.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

if (name && number) {
  addNameAndNumber(name, number);
} else {
  listNames();
}

function addNameAndNumber(name, number) {
  const person = new Person({ name, number });
  person.save().then(({ name, number }) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

function listNames() {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });
    mongoose.connection.close();
  });
}
