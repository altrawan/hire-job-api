const express = require('express');

const jwtAuth = require('../middlewares/jwtAuth');
const { isWorker } = require('../middlewares/authorizations');
const { portofolio } = require('../validations/portofolio.validation');
const validation = require('../middlewares/validation');
const upload = require('../middlewares/uploadPortofolio');
const {
  createPortofolio,
  getPortofolioByWorkerId,
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
    upload,
    portofolio,
    validation,
    createPortofolio
  )
  .get('/portofolio-user/:id', jwtAuth, getPortofolioByWorkerId)
  .get('/portofolio/:id', jwtAuth, getPortofolioById)
  .put(
    '/portofolio/:id',
    jwtAuth,
    isWorker,
    upload,
    portofolio,
    validation,
    updatePortofolio
  )
  .delete('/portofolio/:id', jwtAuth, isWorker, deletePortofolio);

module.exports = router;
