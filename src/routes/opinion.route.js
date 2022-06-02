const express = require('express');

const { getOpinion } = require('../controllers/opinion.controller');

const router = express.Router();
router.get('/opinion', getOpinion);

module.exports = router;
