const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isWorker } = require('../middlewares/authorizations');
const { update, password } = require('../validations/worker.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/uploadUser');
const {
  getAllWorker,
  getWorkerById,
  createSkill,
  updateWorker,
  updateImage,
  updatePassword,
} = require('../controllers/worker.controller');

const router = express.Router();
router
  .get('/worker', jwtAuth, getAllWorker)
  .get('/worker/:id', jwtAuth, getWorkerById)
  .post('/worker-skill', jwtAuth, isWorker, createSkill)
  .put('/worker', jwtAuth, isWorker, update, validation, updateWorker)
  .put('/worker-image', jwtAuth, isWorker, upload, updateImage)
  .put(
    '/worker-password',
    jwtAuth,
    isWorker,
    password,
    validation,
    updatePassword
  );

module.exports = router;
