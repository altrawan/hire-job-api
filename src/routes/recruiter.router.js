const express = require('express');

const {
  isVerified,
  isWorker,
  isRecruiter,
} = require('../middlewares/authorizations');
const {
  updateWorker,
  updateRecruiter,
  updatePassword,
} = require('../validations/user.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/uploadUser');
const {
  getAllUser,
  getUserById,
  updateWorker,
  updateRecruiter,
  updateImage,
  updatePassword,
} = require('../controllers/user.controller');

const router = express.Router();
router
  .get('/user', isVerified, getAllUser)
  .get('/user/:id', isVerified, getUserById)
  .put(
    '/user-worker',
    isVerified,
    isWorker,
    updateWorker,
    validation,
    updateWorker
  )
  .put(
    '/user-recruiter',
    isVerified,
    isRecruiter,
    updateRecruiter,
    validation,
    updateRecruiter
  )
  .put('/user-image', isVerified, upload, updateImage)
  .put(
    '/user-password',
    isVerified,
    updatePassword,
    validation,
    updatePassword
  );

module.exports = router;
