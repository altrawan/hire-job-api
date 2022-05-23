const { check } = require('express-validator');

const portofolio = [
  // app name
  check('appName', 'Position cannot be empty').not().isEmpty(),
  check('appName', 'Position minimum 3 characters').isLength({
    min: 3,
  }),

  // link repository
  check('linkRepository', 'Link Repository cannot be empty').not().isEmpty(),
  check('linkRepository', 'Link Repository only URL allowed').isURL(),

  // type portofolio
  check('typePortofolio', 'Type Portofolio cannot be empty').not().isEmpty(),
  check('typePortofolio', 'Type Portofolio only number allowed').isNumeric(),
  check('typePortofolio', 'Type Portofolio value must be between 0 to 1').isInt(
    {
      min: 0,
      max: 1,
    }
  ),
];

module.exports = {
  portofolio,
};
