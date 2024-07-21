const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { verifyToken, verifyToken2 } = require('../config/jwtMiddleware');

// Route to get all users
router.get('/getAllPets', petController.getAllPets);
router.get('/id/:id', petController.getPetByID);
router.post('/createPet', petController.createPet);
router.put('/updatePet/:id', verifyToken, petController.updatePet);
router.delete('/deletePet/:id', petController.deletePet);
router.put('/uploadPetImageID/:petID', petController.uploadPetImageIDC);
router.get('/retrievePetImageID/:petID', petController.retrievePetImageIDC)

module.exports = router;
