const express = require('express');
const router = express.Router();
const { reccomendPet, getPetID } = require('../controllers/openAIController.js');

router.post('/ask', reccomendPet);
router.post('/verify', getPetID);

module.exports = router;