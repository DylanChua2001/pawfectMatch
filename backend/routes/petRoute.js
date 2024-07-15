const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Route to get all users
router.get('/getAllPets', petController.getAllPets);
router.get('/id/:id', petController.getPetByID);
router.post('/createPet', petController.createPet);
router.put('/updatePet/:id', petController.updatePet);
router.delete('/deletePet/:id', petController.deletePet);
router.put('/uploadPetImageID/:petID', petController.uploadPetImageIDC);
router.get('/retrievePetImageID/:petID', petController.retrievePetImageIDC)

module.exports = router;
