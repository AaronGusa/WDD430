var mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: { type: String, required: true},
    imgUrl: { type: String},
    bio: { type: String },
    wishlist: [ {giftNumber: {type: Number}}]
});

module.exports = mongoose.model('Person', personSchema);