let express = require('express');
let router = express.Router();
let passport = require('passport')
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

let Pet = require('../models/pets');
let userModel = require('../models/user');
let User = userModel.User;

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

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        console.log(req.user);
        return res.json({
            success: true,
            msg: 'User Logg in Successfully!',
            //user: {
            //    id: user._id,
            //    displayName: user.displayName,
            //    username: user.username,
            //    email: user.email
            //},
            //token: authToken
        });
    } else {

        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    console.log(req.body.user);
    passport.authenticate('local',
        (err, user, info) => {
            console.log(user);
            // server err?
            if (err) {
                return next(err);
            }

            // is there a user login error?
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                // server error?
                if (err) {
                    console.log('asas');
                    return next(err);
                }

                const payload = {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                }
                const authToken = jwt.sign(payload, DB.Secret, {
                    expiresIn: 604800 // 1 week
                });

                return res.json({
                    success: true,
                    msg: 'User Logged in Successfully!',
                    user: {
                        id: user._id,
                        displayName: user.displayName,
                        username: user.username,
                        email: user.email
                    },
                    token: authToken
                });

                //return res.redirect('/book-list');
            });
        })(req, res, next);
}