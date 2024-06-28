const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rutas para carrito
router.get('/', cartController.getCart);
router.get('/:id', cartController.getCartItem);
router.post('/', cartController.addToCart);
router.put('/', cartController.updateCartItem);

module.exports = router;
