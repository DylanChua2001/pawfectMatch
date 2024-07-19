const express = require('express');
const router = express.Router();
const { reccomendPet, getPetID, createUserProfile, saveUserProfile } = require('../controllers/openAIController.js');
const { verifyToken, verifyToken2 } = require('../config/jwtMiddleware');

router.post('/ask', reccomendPet);
router.post('/verify', getPetID);
router.post('/user', createUserProfile);
router.post('/save', saveUserProfile);

module.exports = router;