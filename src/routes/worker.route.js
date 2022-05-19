const express = require('express');

const { isVerified, isWorker } = require('../middlewares/authorizations');
const { update, password } = require('../validations/worker.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/uploadUser');
const {
  getAllWorker,
  getWorkerById,
  updateWorker,
  updateImage,
  updatePassword,
} = require('../controllers/worker.controller');

const router = express.Router();
router
  .get('/worker', isVerified, getAllWorker)
  .get('/worker/:id', isVerified, getWorkerById)
  .put('/worker', isVerified, isWorker, update, validation, updateWorker)
  .put('/worker-image', isVerified, upload, updateImage)
  .put('/worker-password', isVerified, password, validation, updatePassword);

module.exports = router;
