let mongoose = require('mongoose');

// create a model class
let petModel = mongoose.Schema({
    name: String,
    category: String,
    breed: String,
    age: Number,
    vaccine: Boolean,
    description: String,
    price: Number
},
{
    collection: "pets"
});

module.exports = mongoose.model('Pet', petModel);