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

            res.json({ success: true, msg: 'Successfully Edited Pet', pet: updatedPet });
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

            res.json({ success: true, msg: 'Successfully Deleted Pet' });
        }
    });
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });
            
            return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});

            //return res.redirect('/book-list');
        });
    })(req, res, next);
}