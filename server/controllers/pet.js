let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Pet = require('../models/pet');

module.exports.displayPetList = (req, res, next) => {
    Pet.find((err, petList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(PetList);

            /*
            res.render('pet/list', 
            {title: 'Pets', 
            PetList: petList, 
            displayName: req.user ? req.user.displayName : ''});      
            */

            res.json(petList);
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    /*
    res.render('pet/add', {title: 'Add Pet', 
    displayName: req.user ? req.user.displayName : ''});
    */
   
    res.json({success: true, msg: 'Succesfully Displayed Add Page'});
}

module.exports.processAddPage = (req, res, next) => {
    let newPet = Pet({
        "name": req.body.name,
        "category": req.body.category,
        "breed": req.body.breed,
        "age": req.body.age,
        "vaccine": req.body.vaccine,
        "description": req.body.description,
        "price": req.body.price
    });

    Pet.create(newPet, (err, Pet) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the pet list
            //res.redirect('/pet-list');

            res.json({success: true, msg: 'Successfully Added New Pet'});
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Pet.findById(id, (err, petToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            /*
            res.render('pet/edit', {title: 'Edit Pet', pet: petToEdit, 
            displayName: req.user ? req.user.displayName : ''});
            */

            res.json({success: true, msg: 'Successfully Displayed Pet to Edit', pet: petToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedPet = Pet({
        "_id": id,
        "name": req.body.name,
        "category": req.body.category,
        "breed": req.body.breed,
        "age": req.body.age,
        "vaccine": req.body.vaccine,
        "description": req.body.description,
        "price": req.body.price
    });

    Pet.updateOne({_id: id}, updatedPet, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the pet list
            //res.redirect('/pet-list');

            res.json({success: true, msg: 'Successfully Edited Pet', pet: updatedPet});
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Pet.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the pet list
             //res.redirect('/pet-list');

             res.json({success: true, msg: 'Successfully Deleted Pet'});
        }
    });
}