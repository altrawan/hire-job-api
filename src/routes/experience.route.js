const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isWorker } = require('../middlewares/authorizations');
const { experience } = require('../validations/experience.validation');
const validation = require('../middlewares/validation');
const {
  createExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
} = require('../controllers/experience.controller');

const router = express.Router();
router
  .post(
    '/experience',
    jwtAuth,
    isWorker,
    experience,
    validation,
    createExperience
  )
  .get('/experience/:id', jwtAuth, getExperienceById)
  .put(
    '/experience',
    jwtAuth,
    isWorker,
    experience,
    validation,
    updateExperience
  )
  .delete('/experience', jwtAuth, isWorker, deleteExperience);

module.exports = router;
