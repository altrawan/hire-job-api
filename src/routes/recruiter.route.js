const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isRecruiter } = require('../middlewares/authorizations');
const {
  hire,
  update,
  password,
} = require('../validations/recruiter.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/uploadRecruiter');
const {
  getRecruiterById,
  hireWorker,
  updateRecruiter,
  updatePhoto,
  updatePassword,
} = require('../controllers/recruiter.controller');

const router = express.Router();
router
  .get('/recruiter/:id', jwtAuth, getRecruiterById)
  .post('/recruiter-hire', jwtAuth, isRecruiter, hire, validation, hireWorker)
  .put('/recruiter', jwtAuth, isRecruiter, update, validation, updateRecruiter)
  .put('/recruiter-image', jwtAuth, isRecruiter, upload, updatePhoto)
  .put(
    '/recruiter-password',
    jwtAuth,
    isRecruiter,
    password,
    validation,
    updatePassword
  );

module.exports = router;
