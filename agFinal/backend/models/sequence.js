var mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxPeopleId: { type: Number },
    maxGiftsId: { type: Number }    
});

module.exports = mongoose.model('Sequence', sequenceSchema);