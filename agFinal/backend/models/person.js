var mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: { type: String, required: true},
    imageUrl: { type: String},
    bio: { type: String },
    wishlist: [ {
        giftNumber: { type: Number },
        category: {type: Number },
        name: { type: String},
        desc: { type: String},
        cost: { type: Number },
        image: { type: String},
        url: { type: String }
    }],
    pNumber: { type: String }
});

module.exports = mongoose.model('Person', personSchema);