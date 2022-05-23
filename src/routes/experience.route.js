const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isWorker } = require('../middlewares/authorizations');
const { experience } = require('../validations/experience.validation');
const validation = require('../middlewares/validation');
const {
  createExperience,
  getExperienceByWorkerId,
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
  .get('/experience-user/:id', jwtAuth, getExperienceByWorkerId)
  .get('/experience/:id', jwtAuth, getExperienceById)
  .put(
    '/experience/:id',
    jwtAuth,
    isWorker,
    experience,
    validation,
    updateExperience
  )
  .delete('/experience/:id', jwtAuth, isWorker, deleteExperience);

module.exports = router;
