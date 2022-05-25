const { check } = require('express-validator');

const message = [check('message', 'Message cannot be empty').not().isEmpty()];

module.exports = {
  message,
};
