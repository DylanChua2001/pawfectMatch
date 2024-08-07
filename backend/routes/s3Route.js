const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const s3Controller = require('../controllers/s3Controller');

// Configure Multer storage for in-memory uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

 //image name must match frontend form item name
//upload.single('image') //Frontend from need to be cautious. Need to namee html name = image.

router.post('/uploadImage/:userID', upload.single('image'), s3Controller.uploadImage);
router.get('/retrieveImage/:userID', s3Controller.displayImage);
router.post('/uploadPetImage/:petID', upload.single('image'), s3Controller.uploadPetImage);
router.get('/retrievePetImage/:petID', s3Controller.displayPetImage);
router.post('/uploadTrainingImage/:trainID', upload.single('image'), s3Controller.uploadTrainingImage);
router.get('/retrieveTrainingImage/:trainID', s3Controller.displayTrainingImage);


module.exports = router;