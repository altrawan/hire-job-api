const express = require('express');

const { isVerified } = require('../middlewares/authorizations');
const { register, login } = require('../validations/auth.validation');
const validation = require('../middlewares/validation');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/auth/register', register, validation)
  .get('/auth/verify-email')
  .post('/auth/login', login, validation);
