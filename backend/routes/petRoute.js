const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const verifyToken = require('../config/jwtMiddleware');

// Route to get all users
router.get('/getAllPets', petController.getAllPets);
router.get('/id/:id', petController.getPetByID);
router.post('/createPet', verifyToken, petController.createPet);
router.put('/updatePet/:id', verifyToken, petController.updatePet);
router.delete('/deletePet/:id', verifyToken, petController.deletePet);

module.exports = router;
