const express = require('express');
const router = express.Router();
//const sequenceGenerator = require('../routes/sequenceGenerator');
const gift = require('../models/gift');

//Get Server Gift List
router.get('/', (req, res, next) => {
    gift.find()
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

//Get individual gift info
router.get('/', (req, res, next) => {
    gift.findOne()
    .then(gift => {
        res.status(200).json({
            message: "Gift Gathered!",
            gift: gifts
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "501 Santa is DOWN!!",
            error: err
        })
    })
});

//Post new person to server
router.post('/', (req, res, next) => {
    //const maxPersonId = sequenceGenerator.nextId("people");

    const gift = new gift ({
        //id: maxPersonId,
        giftNumber: req.body.giftNumber,
        category: req.body.category,
        name: req.body.name,
        cost: req.body.cost, 
        desc: req.body.desc,
        image: req.body.image,
        url: req.body.url
        
    });

    console.log('Gift Server Post');

    gift.save()
        .then(createdPerson => {
        res.status(201).json({
            message: 'Person added successfully',
            people: createdPerson
        });
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    });
});

module.exports = router;