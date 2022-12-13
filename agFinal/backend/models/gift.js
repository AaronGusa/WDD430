var mongoose = require('mongoose');

const giftSchema = mongoose.Schema({
    giftNumber: { type: Number },
    category: {type: Number },
    name: { type: String},
    desc: { type: String},
    cost: { type: Number },
    image: { type: String},
    url: { type: String }
});

module.exports = mongoose.model('Gift', giftSchema);