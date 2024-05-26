const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Route to get all users
router.get('/getAllUsers', userController.getAllUsersC)
router.get('/createNewUsers', userController.createNewUserC)
router.get('/updateUser', userController.updateUserC)
router.get('/deleteUser', userController.deleteUserC)

module.exports = router;