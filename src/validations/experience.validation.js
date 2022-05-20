const { check } = require('express-validator');

const experience = [
  // position
  check('position', 'Position cannot be empty').not().isEmpty(),
  check('position', 'Position only letter allowed').matches(/^[A-Za-z ]+$/),
  check('position', 'Position minimum 3 characters').isLength({
    min: 3,
  }),

  // company
  check('company', 'Position cannot be empty').not().isEmpty(),
  check('company', 'Position minimum 3 characters').isLength({
    min: 3,
  }),

  // description
  check('description', 'Description cannot be empty').not().isEmpty(),
  check('description', 'Description Desk minimum 3 characters').isLength({
    min: 3,
  }),
];

module.exports = {
  experience,
};
