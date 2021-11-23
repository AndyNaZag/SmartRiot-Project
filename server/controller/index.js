let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

//let DB = require('../config/db');

let Pet = require('../models/pets');


module.exports.displayPetList = (req, res, next) => {
    Pet.find((err, petList) => {
        if (err) {
            return console.error(err);
        } else {
            res.json(petList);
        }
    });
}

module.exports.processAddPet = (req, res, next) => {
    let newPet = new Pet({
        "id": req.body.id,
        "name": req.body.name,
        "category": req.body.category,
        "description": req.body.description,
        "age": req.body.age
    });

    Pet.create(newPet, (err, Pet) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, msg: 'Pet Added' });
        }
    });
}

module.exports.processEditPet = (req, res, next) => {
    let id = req.params.id
    console.log(id);
    let updatedPet = Pet({
        "_id": id,
        "name": req.body.name,
        "category": req.body.category,
        "description": req.body.description,
        "age": req.body.age
    });

    Pet.updateOne({ _id: id }, updatedPet, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the book list
            //res.redirect('/book-list');

            res.json({ success: true, msg: 'Successfully Edited Book', pet: updatedPet });
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Pet.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the book list
            //res.redirect('/book-list');

            res.json({ success: true, msg: 'Successfully Deleted Book' });
        }
    });
}