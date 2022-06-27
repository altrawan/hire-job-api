const { check } = require('express-validator');

const portofolio = [
  // app name
  check('app_name', 'App Name cannot be empty').not().isEmpty(),
  check('app_name', 'App Name minimum 3 characters').isLength({
    min: 3,
  }),

  // link repository
  check('link_repository', 'Link Repository cannot be empty').not().isEmpty(),

  // type portofolio
  check('type_portofolio', 'Type Portofolio cannot be empty').not().isEmpty(),
  check('type_portofolio', 'Type Portofolio only number allowed').isNumeric(),
  check(
    'type_portofolio',
    'Type Portofolio value must be between 0 to 1'
  ).isInt({
    min: 0,
    max: 1,
  }),
];

module.exports = {
  portofolio,
};
