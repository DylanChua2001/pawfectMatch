const express = require('express');
const router = express.Router();
const cartStripeController = require('../controllers/cartStripeController');


router.get('/getCart/:userID', cartStripeController.getUserCartItems);
router.put('/addCart/:userID/add/:newItem', cartStripeController.addToUserCart);
router.put('/deleteCart/:userID/delete/:deleteItem', cartStripeController.deleteFromUserCart);

module.exports = router;