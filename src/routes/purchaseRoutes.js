const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Rutas para compras
router.get('/', purchaseController.getPurchases);
router.post('/', purchaseController.makePurchase);

module.exports = router;
