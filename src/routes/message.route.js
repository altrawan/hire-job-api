const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { message } = require('../validations/message.validation');
const validation = require('../middlewares/validation');
const {
  getMessageById,
  getMessageBySender,
  getMessageByReceiver,
  createMessage,
  deleteMessage,
} = require('../controllers/message.controller');

const router = express.Router();
router
  .get('/message/:id', jwtAuth, getMessageById)
  .get('/message-from/:id', jwtAuth, getMessageBySender)
  .get('/message-to/:id', jwtAuth, getMessageByReceiver)
  .post('/message', jwtAuth, message, validation, createMessage)
  .delete('/message/:id', jwtAuth, deleteMessage);

module.exports = router;
