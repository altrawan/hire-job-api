const { check } = require('express-validator');

const update = [
  // company name
  check('company', 'Company Name cannot be empty').not().isEmpty(),
  check('company', 'Company Name minimum 3 characters').isLength({
    min: 3,
  }),

  // company field
  check('companyField', 'Company Field cannot be empty').not().isEmpty(),
  check('companyField', 'Company Field only letter allowed').matches(
    /^[A-Za-z ]+$/
  ),
  check('companyField', 'Company Field minimum 3 characters').isLength({
    min: 3,
  }),

  // city
  check('city', 'City cannot be empty').not().isEmpty(),
  check('city', 'City minimum 3 characters').isLength({
    min: 3,
  }),

  // description
  check('description', 'Description cannot be empty').not().isEmpty(),
  check('description', 'Description Desk minimum 3 characters').isLength({
    min: 3,
  }),

  // email
  check('email', 'Email cannot be empty').not().isEmpty(),
  check('email', 'Please enter email correctly').isEmail(),
  check('email', 'Email maximum length is 50 characters').isLength({ max: 50 }),

  // instagram
  check('instagram', 'Instagram cannot be empty').not().isEmpty(),
  check('instagram', 'Instagram only URL allowed').isURL(),

  // phone number
  check('phoneNumber', 'Phone Number cannot be empty').not().isEmpty(),
  check('phoneNumber', 'Phone Number only number allowed').isNumeric(),
  check(
    'phoneNumber',
    'Phone Number must be between 11 and 13 characters'
  ).isLength({ min: 11, max: 13 }),

  // linkedin
  check('linkedin', 'Linkedin cannot be empty').not().isEmpty(),
  check('linkedin', 'Linkedin only URL allowed').isURL(),
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

const hire = [
  // message destination
  check('messageDestination', 'Message Destination cannot be empty')
    .not()
    .isEmpty(),

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

  // description
  check('description', 'Description cannot be empty').not().isEmpty(),
  check('description', 'Description Desk minimum 3 characters').isLength({
    min: 3,
  }),
];

module.exports = {
  update,
  password,
  hire,
};
