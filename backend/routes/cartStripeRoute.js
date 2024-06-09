const express = require('express');
const router = express.Router();
const cartStripeController = require('../controllers/cartStripeController');


router.get('/cart/:userID', cartStripeController.getUserCartItems);
router.put('/cart/:userID/add/:newItem', cartStripeController.addToUserCart);
router.put('/cart/:userID/delete/:deleteItem', cartStripeController.deleteFromUserCart);

module.exports = router;