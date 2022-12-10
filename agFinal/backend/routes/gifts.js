const express = require('express');
const router = express.Router();
//const sequenceGenerator = require('../routes/sequenceGenerator');
const Gift = require('../models/gift');

//Get Server Gift List
router.get('/', (req, res, next) => {
    Gift.find()
    .then(gifts => {
        res.status(200).json({
            message: "Gifts Gathered!",
            Gifts: gifts
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Santa is DOWN!!",
            error: err
        })
    })
});

module.exports = router;