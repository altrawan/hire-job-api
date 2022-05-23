const express = require('express');

const { isVerified } = require('../middlewares/authorizations');
const {
  register,
  registers,
  login,
  forgot,
  reset,
} = require('../validations/auth.validation');
const validation = require('../middlewares/validation');
const {
  registerWorker,
  registerRecruiter,
  verifyEmail,
  loginAccount,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register-worker', register, validation, registerWorker)
  .post('/auth/register-recruiter', registers, validation, registerRecruiter)
  .get('/auth/verify-email', verifyEmail)
  .post('/auth/login', isVerified, login, validation, loginAccount)
  .put('/auth/forgot-password', isVerified, forgot, validation, forgotPassword)
  .put('/auth/reset-password', isVerified, reset, validation, resetPassword);

module.exports = router;
