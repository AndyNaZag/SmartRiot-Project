let mongoose = require('mongoose');

// create order model class
let Order = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    province: String,
    postalCode: String,
    country: String,
    shipped: Boolean,
    adoptionlist:
    {
        lines:
        [{pet:
            {
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
},
{
    collection: 'orders'
});

module.exports = mongoose.model('Order', Order);