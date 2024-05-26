const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Route to get all users
router.get('/getAllPets', petController.getAllPets);
router.post('/createPet', petController.createPet);
router.put('/updatePet/:id', petController.updatePet);
router.delete('/deletePet/:id', petController.deletePet);

module.exports = router;
