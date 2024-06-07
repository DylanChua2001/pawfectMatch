const express = require('express');
const router = express.Router();
const petFilterController = require('../controllers/petFilterController');

// Route to get all users
router.get('/', petFilterController.filterPets);

module.exports = router;