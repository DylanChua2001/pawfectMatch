const express = require('express');
const router = express.Router();
const trainPackController = require('../controllers/trainPackController');
const { verifyToken, verifyToken2 } = require('../config/jwtMiddleware');

router.get('/getAllTrainingPack', trainPackController.getAllTrainingPack)
router.get('/getOneTrainingPackIdNameMoney/:trainID', trainPackController.getOneTrainingPackIdNameMoney)
router.post('/createNewTrainingPack', verifyToken,trainPackController.createNewTrainingPack)
router.put('/updateTrainingPack/:trainID', verifyToken, trainPackController.updateTrainingPack)
router.delete('/deleteTrainingPack/:trainID', verifyToken, trainPackController.deleteTrainingPack)
router.put('/uploadTrainingImageID/:trainID', trainPackController.uploadTrainingImageID)
router.get('/retrieveTrainingImageID/:trainID', trainPackController.retrieveTrainingImageID)

module.exports = router