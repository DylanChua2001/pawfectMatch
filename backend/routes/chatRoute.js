const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/getChatByID', chatController.getChatByID);

module.exports = router;
