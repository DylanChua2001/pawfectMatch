// routes/openaiRoute.js
const express = require('express');
const router = express.Router();
const openaiController = require('../controllers/geminiController');

router.post('/ask', openaiController.askOpenAI);

module.exports = router;
