const { check } = require('express-validator');

const register = [
  // name
  check('name', 'Name cannot be empty').not().isEmpty(),
  check('name', 'Name only letter allowed').matches(/^[A-Za-z ]+$/),
  check('name', 'Name must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),

  // email
  check('email', 'Email cannot be empty').not().isEmpty(),
  check('email', 'Please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  // phone number
  check('phoneNumber', 'Phone Number cannot be empty').not().isEmpty(),
  check('phoneNumber', 'Phone Number only number allowed').isNumeric(),
  check(
    'phoneNumber',
    'Phone Number must be between 11 and 13 characters'
  ).isLength({ min: 11, max: 13 }),

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

const registers = [
  register,

  check('company', 'Company cannot be empty').not().isEmpty(),
  check('company', 'Company only letter allowed').matches(/^[A-Za-z ]+$/),
  check('company', 'Company must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),

  check('position', 'Company cannot be empty').not().isEmpty(),
  check('position', 'Company only letter allowed').matches(/^[A-Za-z ]+$/),
  check('position', 'Company must be between 3 and 50 characters').isLength({
    min: 3,
    max: 50,
  }),
];

const login = [
  // email
  check('email', 'Email cannot be empty').not().isEmpty(),
  check('email', 'Please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),
  // password
  check('password', 'Password cannot be empty').not().isEmpty(),
  check('password', 'Password require 8 or more characters').isLength({
    min: 8,
  }),
  check(
    'password',
    'Password must include one lowercase character, one uppercase character, a number, and a special character.'
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
];

const forgot = [
  // email
  check('email', 'Username required').not().isEmpty(),
  check('email', 'Please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),
];

const reset = [
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
  register,
  registers,
  login,
  forgot,
  reset,
};
