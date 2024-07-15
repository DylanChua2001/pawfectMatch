const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const createCheckoutSessionStripe = require('../APIs/stripeAPI');

router.get('/getCart/:userID', cartController.getUserCartItems);
router.put('/addCart/:userID/add/:newItem', cartController.addToUserCart);
router.put('/deleteCart/:userID/delete/:deleteItem', cartController.deleteFromUserCart);
router.put('/resetCart/:userID', cartController.resetUserCart);
router.post('/stripepay/:userID', createCheckoutSessionStripe.createCheckoutSession);

module.exports = router;