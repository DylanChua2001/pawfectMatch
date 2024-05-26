const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Route to get all users
router.get('/getAllUsers', userController.getAllUsersC)
router.get('/createNewUsers', userController.createNewUserC)

module.exports = router;