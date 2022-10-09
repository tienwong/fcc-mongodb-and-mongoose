require('dotenv').config();
const mongoose = require('mongoose')

try {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('MongoDB is connected...')
}
catch (err) {
  console.log(err)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)

const arrayOfPeople = [
  {
    name: 'fn4 ln4',
    age: 20,
    favoriteFoods: ['fries', 'pizza', 'potatoes']
  },
  {
    name: 'fn2 ln2',
    age: 18,
    favoriteFoods: ['gimchi jjigae', 'army stew', 'spicy ramen']
  },
  {
    name: 'fn1 ln1',
    age: 25,
    favoriteFoods: ['pizza', 'cheese curds', 'cheese']
  },
  {
    name: 'fn3 ln3',
    age: 22,
    favoriteFoods: ['gol gappe', 'paneer pakore', 'cajun fries']
  }
]


const createAndSavePerson = (done) => {
  const document = new Person({
    name: 'Sarah Saltz',
    age: 20,
    favoriteFoods: ['apples', 'broccoli', 'spinach']
  })
  document.save((err, data) => {
    if (err) return done(err)
    done(null, data)
  })
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err)
    done(null, data)
  })
};

// Find all the people having a given name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err)
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err)
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // find the person by _id
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err)
    // edit the person's favoriteFoods array
    data.favoriteFoods.push(foodToAdd)
    // save the edited data
    data.save((error, d) => {
      if (error) return (error)
      done(null, d)
    })
  })
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // find a person by name
  // set their age to 20
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, data) => {
    if (err) return done(err)
    done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, data) => {
    if (err) return done(err)
    done(null, data)
  })
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return done(err)
    return done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  // find the people that like burritos
  Person.find({ favoriteFoods: foodToSearch })
  // sort them in ascending order by name
  .sort({ name: 'asc' })
  // only return 2 documents
  .limit(2)
  // hide the age
  .select('-age')
  .exec((err, data) => {
    if (err) return done(err)
    done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
