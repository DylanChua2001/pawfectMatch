const express = require('express');
const router = express.Router();
const { answerQuestion } = require('../controllers/geminiController.js');

router.post('/question', answerQuestion);

module.exports = router;