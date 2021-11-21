let mongoose = require('mongoose');

// create a model class
let petModel = mongoose.Schema({
    name: String,
    category: String,
    description: String,
    age: Number
}, {
    collection: "pets"
});



module.exports = mongoose.model('Pet', petModel);