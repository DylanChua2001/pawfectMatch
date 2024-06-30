const express = require('express')
const router = express.Router()
const txnController = require('../controllers/txnController')

// Define routes
router.get('/getAllTxn', txnController.getAllTxn);
router.post('/createTxn', txnController.createNexTxn);
router.delete('/deleteTxn/:txnID', txnController.deleteTxn);

module.exports = router;


