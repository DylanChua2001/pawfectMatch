const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Route to get all users
router.get('/getAllPets', petController.getAllPets);

module.exports = router;
