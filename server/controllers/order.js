let express = require('express');
let router = express.Router();

let Order = require('../models/order');

let Store = require('../models/store');
let Adoptionlist = Store.Adoptionlist;
let Pet = Store.Pet;

module.exports.displayOrderList = (req, res, next) => {
    Order.find((err, orderList) => {
        if (err) {
            return console.error(err);
        } else {
            res.json(orderList);
        }
    });
}

module.exports.processAddPage = (req, res, next) => {
    // SERIALIZE THE ADOPTIONLIST DATA
    let adoptionlist = new Adoptionlist();

    // Serialize the Line Data
    for (let line of req.body.adoptionlist.lines) {
        let pet = new Pet(
            line.pet._id,
            line.pet.name,
            line.pet.category,
            line.pet.breed,
            line.pet.age,
            line.pet.vaccine,
            line.pet.description,
            line.pet.price
        );
        let quantity = line.quantity;
        adoptionlist.lines.push({ pet, quantity });
    }
    adoptionlist.itemCount = req.body.adoptionlist.itemCount;
    adoptionlist.adoptionlistPrice = req.body.adoptionlist.adoptionlistPrice;

    // Create a new Order Object
    let newOrder = Order({
        "name": req.body.name,
        "orderid": req.body.orderid,
        "address": req.body.address,
        "city": req.body.city,
        "province": req.body.province,
        "postalCode": req.body.postalCode,
        "country": req.body.country,
        "approved": req.body.approved,
        "rejected": req.body.rejected,
        "adoptionlist": adoptionlist
    });

    // Add new Order Object to the Database
    Order.create(newOrder, (err, Order) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, msg: 'Successfully Added New Order' });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    // SERIALIZE ADOPTIONLIST DATA

    let adoptionlist = new Adoptionlist();

    // serialize the line data
    for (let line of req.body.adoptionlist.lines) {
        let pet = new Pet(
            line.pet._id,
            line.pet.name,
            line.pet.category,
            line.pet.breed,
            line.pet.age,
            line.pet.vaccine,
            line.pet.description,
            line.pet.price
        );
        let quantity = line.quantity;
        adoptionlist.lines.push({ pet, quantity });
    }
    adoptionlist.itemCount = req.body.adoptionlist.itemCount;
    adoptionlist.adoptionlistPrice = req.body.adoptionlist.adoptionlistPrice;

    // Update the Order Object
    let updatedOrder = Order({
        "_id": id,
        "orderid": req.body.orderid,
        "name": req.body.name,
        "address": req.body.address,
        "city": req.body.city,
        "province": req.body.province,
        "postalCode": req.body.postalCode,
        "country": req.body.country,
        "approved": req.body.approved,
        "rejected": req.body.rejected,
        "adoptionlist": adoptionlist
    });

    Order.updateOne({ _id: id }, updatedOrder, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(updatedOrder);
            res.json({ success: true, msg: 'Successfully Edited Order', order: updatedOrder });
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Order.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({ success: true, msg: 'Successfully Deleted Order' });
        }
    })
}