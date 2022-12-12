var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

//Get Server DocList
router.get('/', (req, res, next) => {
    // call the Document model find() method to get all documents in the collection
    // if an error occurred
    //    return response status 500 and a JSON object containing information about the error
    // endIf
    // return response status 200 and a JSON object containing the list of documents

    Contact.find()
    .populate('group')
    .then(contacts => {
        res.status(200).json({
            message: "Contacts retrieved!",
            contact: contacts
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "We have a 500 error on our hands!",
            error: err
        });
    })
});

//Post new docs to server
router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact ({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        group: req.body.group //this is an array and need additional attention
    });
    contact.save()
        .then(createdContact => {
        res.status(201).json({
            message: 'Contact added successfully',
            contact: createdContact
        });
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.group = req.body.group;
  
    Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
        res.status(204).json({
            message: 'Contact updated successfully'
        })
        })
        .catch(error => {
            res.status(500).json({
            message: '500: An error occurred',
            error: error
        });
        });
    })
    .catch(error => {
    res.status(500).json({
        message: '500: Contact not found.',
        error: { message: 'Contact not found'}
    });
    });
});

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
        Contact.deleteOne({ id: req.params.id })
            .then(result => {
            res.status(204).json({
                message: "Contact deleted successfully"
            });
            })
            .catch(error => {
                res.status(500).json({
                message: 'An error occurred',
                error: error
            });
            })
        })
        .catch(error => {
        res.status(500).json({
            message: '500: Message not found.',
            error: { message: 'Message not found'}
        });
    });
});

module.exports = router; 