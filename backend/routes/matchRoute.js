const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// Route to get all users
router.get('/getAllMatches', matchController.getAllMatches);
router.post('/addAMatch/:userID/:petID', matchController.addAMatch);
router.get('/checkUserMatch/:userID', matchController.checkUserMatch);

module.exports = router;