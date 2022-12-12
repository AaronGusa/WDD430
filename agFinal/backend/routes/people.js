const express = require('express');
const router = express.Router();
//const sequenceGenerator = require('../routes/sequenceGenerator');
const Person = require('../models/person');

//Get Server Person List
router.get('/', (req, res, next) => {
    // call the Document model find() method to get all documents in the collection
    // if an error occurred
    //    return response status 500 and a JSON object containing information about the error
    // endIf
    // return response status 200 and a JSON object containing the list of documents

    Person.find()
    .populate('wishlist')
    .then(people => {
        res.status(200).json({
            message: "People retrieved!",
            people: people
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "We have a 500 error on our hands!",
            error: err
        });
    })
});

//Post new person to server
router.post('/', (req, res, next) => {
    //const maxPersonId = sequenceGenerator.nextId("people");

    const person = new Person ({
        //id: maxPersonId,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        bio: req.body.bio,
        wishlist: req.body.wishlist, //this is an array and need additional attention
        pNumber: req.body.pNumber
        
    });

    console.log('People.js Server Post');
    console.log(person.imageUrl);
    console.log(person.pNumber);

    person.save()
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

// router.put('/:id', (req, res, next) => {
//     Contact.findOne({ id: req.params.id })
//       .then(contact => {
//         contact.name = req.body.name;
//         contact.email = req.body.email;
//         contact.phone = req.body.phone;
//         contact.group = req.body.group;
  
//     Contact.updateOne({ id: req.params.id }, contact)
//         .then(result => {
//         res.status(204).json({
//             message: 'Contact updated successfully'
//         })
//         })
//         .catch(error => {
//             res.status(500).json({
//             message: '500: An error occurred',
//             error: error
//         });
//         });
//     })
//     .catch(error => {
//     res.status(500).json({
//         message: '500: Contact not found.',
//         error: { message: 'Contact not found'}
//     });
//     });
// });

// router.delete("/:id", (req, res, next) => {
//     Contact.findOne({ id: req.params.id })
//         .then(contact => {
//         Contact.deleteOne({ id: req.params.id })
//             .then(result => {
//             res.status(204).json({
//                 message: "Contact deleted successfully"
//             });
//             })
//             .catch(error => {
//                 res.status(500).json({
//                 message: 'An error occurred',
//                 error: error
//             });
//             })
//         })
//         .catch(error => {
//         res.status(500).json({
//             message: '500: Message not found.',
//             error: { message: 'Message not found'}
//         });
//     });
// });

module.exports = router; 