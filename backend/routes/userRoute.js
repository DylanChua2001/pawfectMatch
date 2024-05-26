const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Route to get all users
router.get('/getAllUser', userController.getAllUserC)
router.post('/createNewUser', userController.createNewUserC)
router.put('/updateUser/:userID', userController.updateUserC)
router.delete('/deleteUser/:userID', userController.deleteUserC)

module.exports = router;