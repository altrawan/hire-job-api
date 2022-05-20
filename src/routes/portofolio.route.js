const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isWorker } = require('../middlewares/authorizations');
const { portofolio } = require('../validations/portofolio.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/updatePortofolio');
const {
  createPortofolio,
  getPortofolioById,
  updatePortofolio,
  deletePortofolio,
} = require('../controllers/portofolio.controller');

const router = express.Router();
router
  .post(
    '/portofolio',
    jwtAuth,
    isWorker,
    portofolio,
    validation,
    createPortofolio
  )
  .get('/portofolio/:id', jwtAuth, getPortofolioById)
  .put(
    '/portofolio',
    jwtAuth,
    isWorker,
    upload,
    experience,
    validation,
    updatePortofolio
  )
  .delete('/portofolio', jwtAuth, isWorker, deletePortofolio);

module.exports = router;
