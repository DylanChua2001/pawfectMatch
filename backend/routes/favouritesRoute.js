const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/favouritesController');

// Route to get all users
router.get('/getAllFavPets/:userID', favouritesController.getAllFavPets);
router.put('/addFavPet/:userID/add/:petID', favouritesController.addFavPet);
router.put('/deleteFavPet/:userID/delete/:petID', favouritesController.deleteFavPet);
router.get('/getAllFavTrainPacks/:userID', favouritesController.getAllFavTrainPacks);
router.put('/addFavTrainPack/:userID/add/:trainPackID', favouritesController.addFavTrainPack);
router.put('/deleteFavTrainPack/:userID/delete/:trainPackID', favouritesController.deleteFavTrainPack);

module.exports = router;