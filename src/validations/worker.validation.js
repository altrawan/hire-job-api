const { check } = require('express-validator');

const update = [
  // name
  check('name', 'Name cannot be empty').not().isEmpty(),
  check('name', 'Name only letter allowed').matches(/^[A-Za-z ]+$/),
  check('name', 'Name must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),

  // job desk
  check('jobDesk', 'Job Desk cannot be empty').not().isEmpty(),
  check('jobDesk', 'Job Desk only letter allowed').matches(/^[A-Za-z ]+$/),
  check('jobDesk', 'Job Desk minimum 3 characters').isLength({
    min: 3,
  }),

  // domicile
  check('domicile', 'Domicile cannot be empty').not().isEmpty(),
  check('domicile', 'Domicile Desk minimum 3 characters').isLength({
    min: 3,
  }),

  // workplace
  check('workPlace', 'Workplace cannot be empty').not().isEmpty(),
  check('workPlace', 'Workplace Desk minimum 3 characters').isLength({
    min: 3,
  }),

  // description
  check('description', 'Description cannot be empty').not().isEmpty(),
  check('description', 'Description Desk minimum 3 characters').isLength({
    min: 3,
  }),
];

const password = [
  // password
  check('password', 'Password cannot be empty').not().isEmpty(),
  check('password', 'Password require 8 or more characters').isLength({
    min: 8,
  }),
  check(
    'password',
    'Password must include one lowercase character, one uppercase character, a number, and a special character.'
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),

  // confirm password
  check('passwordConfirmation', 'Password confirmation cannot be empty')
    .not()
    .isEmpty(),
  check('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];

module.exports = {
  update,
  password,
};
