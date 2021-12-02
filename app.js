//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Hmm, we need a name for the fruit, please check your data entry"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pear = new Fruit ({
  name: "Pear",
  rating: 7,
  review: "Very good"
});

const person = new Person
({
  name: "Amy",
  age: 12
});

// person.save();

// pineapple.save();

/* DELETES one person depending on ID
Person.deleteOne({_id: "61a8d25e5e088cee2924fc1b"}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("person has successfully been deleted")
  }
});
*/

// Finds all fruits and loops through the names
Person.find((err, people) => {
  if(err){
    console.log(err)
  } else {

    mongoose.connection.close();
    people.forEach((person) => {
      console.log(person);
    });
  }
});

//Update a document
/*
Fruit.updateOne({_id:"61a8c57b4d107f02ae781ebc"}, {name: "Tomato", rating: 2, review: "This shouldn't be a fruit..."}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Successfully updated the document");
  }
})
*/

//Delete a document
/*
Fruit.deleteOne({_id:"61a8c56ff25b2b65c6ff465d"}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Successfully deleted document")
  }
});
*/

/* Mongoos way of life
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit."
});

const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Too sour for me"
});
const banana = new Fruit({
  name: "Banana",
  rating: 3,
  review: "Weird texture."
});

Fruit.insertMany([kiwi, orange, banana], (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log("Succesfully saved all the fruits to fruitsDB")
  }
});
/*





/* OLD CODE FOR MongoDB
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
      {
        name: "Apple",
        score: 8,
        review: "Great fruit"
      },
      {
          name: "Orange",
          score: 6,
          review: "Kinda sour" 
      },
      {
          name:"Banana",
          score: 9,
          review: "Greate stuff!"
      }
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  };

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }; 
  */