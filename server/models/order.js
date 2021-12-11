let mongoose = require('mongoose');

// create order model class
let Order = mongoose.Schema({
    orderid: String,
    name: String,
    address: String,
    city: String,
    province: String,
    postalCode: String,
    country: String,
    approved: Boolean,
    rejected: Boolean,
    adoptionlist: {
        lines: [{
            pet: {
                name: String,
                category: String,
                breed: String,
                age: Number,
                vaccine: Boolean,
                description: String,
                price: Number
            },
            quantity: Number
        }],
        itemCount: Number,
        adoptionlistPrice: Number
    }
}, {
    collection: 'orders'
});

module.exports = mongoose.model('Order', Order);