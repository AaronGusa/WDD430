var mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: { type: String, required: true},
    imageUrl: { type: String},
    bio: { type: String },
    wishlist: [ {giftNumber: {type: Number}}],
    pNumber: { type: String }
});

module.exports = mongoose.model('Person', personSchema);