const { check } = require('express-validator');

const skill = [
  check('skillName', 'Skill Name cannot be empty').not().isEmpty(),
];

module.exports = {
  skill,
};
