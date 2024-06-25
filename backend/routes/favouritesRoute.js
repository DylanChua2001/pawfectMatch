const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/favouritesController');

// Route to get all users
router.get('/getAllFavPets/:userID', favouritesController.getAllFavPets);
router.put('/addFavPet/:userID/add/:addPet', favouritesController.addFavPet);
router.put('/deleteFavPet/:userID/delete/:deletePet', favouritesController.deleteFavPet);
router.get('/getAllFavTrainPacks/:userID', favouritesController.getAllFavTrainPacks);
router.put('/addFavTrainPack/:userID/add/:addTrainPack', favouritesController.addFavTrainPack);
router.put('/deleteFavTrainPack/:userID/delete/:deleteTrainPack', favouritesController.deleteFavTrainPack);

module.exports = router;