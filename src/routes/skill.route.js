const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isWorker } = require('../middlewares/authorizations');
const { skill } = require('../validations/skill.validation');
const validation = require('../middlewares/validation');
const {
  getSkillByWorkerId,
  getSkillById,
  createSkill,
  deleteSkill,
} = require('../controllers/skill.controller');

const router = express.Router();
router
  .get('/skill-user/:id', jwtAuth, getSkillByWorkerId)
  .get('/skill/:id', jwtAuth, getSkillById)
  .post('/skill', jwtAuth, isWorker, skill, validation, createSkill)
  .delete('/skill/:id', jwtAuth, isWorker, deleteSkill);

module.exports = router;
