const express = require('express');
const router = express.Router();
const trainPackController = require('../controllers/trainPackController');

router.get('/getAllTrainingPack', trainPackController.getAllTrainingPack)
router.post('/createNewTrainingPack', trainPackController.createNewTrainingPack)
router.put('/updateTrainingPack/:trainID', trainPackController.updateTrainingPack)
router.delete('/deleteTrainingPack/:trainID', trainPackController.deleteTrainingPack)

module.exports = router