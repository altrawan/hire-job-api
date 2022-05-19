const { check } = require('express-validator');

const updateWorker = [
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
  check('domicile', 'Domicile Desk only letter allowed').matches(
    /^[A-Za-z ]+$/
  ),
  check('domicile', 'Domicile Desk minimum 3 characters').isLength({
    min: 3,
  }),

  // workplace
  check('workplace', 'Workplace cannot be empty').not().isEmpty(),
  check('workplace', 'Workplace Desk minimum 3 characters').isLength({
    min: 3,
  }),

  // description
  check('description', 'Description cannot be empty').not().isEmpty(),
  check('description', 'Description Desk minimum 3 characters').isLength({
    min: 3,
  }),
];

const updateRecruiter = [
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
  check('city', 'City only letter allowed').matches(/^[A-Za-z ]+$/),
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
  check(
    'phoneNumber',
    'Phone Number must be between 11 and 13 characters'
  ).,

  // linkedin
  check('linkedin', 'Linkedin cannot be empty').not().isEmpty(),
  check('linkedin', 'Linkedin only URL allowed').isURL(),
];
