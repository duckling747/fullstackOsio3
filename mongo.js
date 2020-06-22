const mongoose = require("mongoose");


if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const dbName = "puhelinluettelo";

const url =
`mongodb+srv://arttu_fullstack:\
${password}@mangoklusteri-0fsgj.\
mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
const newName = process.argv[3];
const newNum = process.argv[4];
const newPerson = new Person({
  name: newName,
  number: newNum,
});

switch (process.argv.length) {
case 3:
  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(person);
      });
      mongoose.connection.close();
    });
  break;
case 5:
  newPerson.save()
    .then(() => {
      console.log(`added ${newName} number ${newNum} to phonebook`);
      mongoose.connection.close();
    });
  break;
default:
  console.log("example: \"node mongo.js yourpassword Anna 040-1234556\"");
}
