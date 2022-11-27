var express = require('express');
var router = express.Router();
const sequenceGenerator = require('../routes/sequenceGenerator');
const Message = require('../models/message');

//Get Server Meesage List
router.get('/', (req, res, next) => {
    // call the Document model find() method to get all documents in the collection
    // if an error occurred
    //    return response status 500 and a JSON object containing information about the error
    // endIf
    // return response status 200 and a JSON object containing the list of documents

    Message.find()
    .then(messages => {
        res.status(200).json({
            message: "Messages retrieved!",
            messages: messages
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "We have a 500 error on our hands!",
            error: err
        });
    })
});

//Post new message to server
router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });

    message.save()
        .then(createdMessage => {
        res.status(201).json({
            message: 'Message added successfully',
            messages: createdMessage
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
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.name = req.body.name;
        message.description = req.body.description;
        message.url = req.body.url;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
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
          message: '500: Document not found.',
          error: { message: 'Document not found'}
        });
      });
  });

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
        Message.deleteOne({ id: req.params.id })
            .then(result => {
            res.status(204).json({
                message: "Message deleted successfully"
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