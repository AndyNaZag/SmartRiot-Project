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
            //console.log(BookList);

            /*
            res.render('book/list', 
            {title: 'Books', 
            BookList: bookList, 
            displayName: req.user ? req.user.displayName : ''});      
            */

            res.json(petList);
        }
    });
}