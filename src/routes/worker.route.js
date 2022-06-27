const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isWorker } = require('../middlewares/authorizations');
const { update, password } = require('../validations/worker.validation');
const socialValidation = require('../validations/url.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/uploads');
const multipleUpload = require('../middlewares/multipleUpload');
const {
  getAllWorker,
  getWorkerById,
  updateWorker,
  updateImage,
  updatePassword,
} = require('../controllers/worker.controller');

const router = express.Router();
router
  .get('/worker', jwtAuth, getAllWorker)
  .get('/worker/:id', jwtAuth, getWorkerById)
  .put(
    '/worker',
    jwtAuth,
    isWorker,
    multipleUpload,
    update,
    validation,
    socialValidation,
    updateWorker
  )
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
