const express = require('express');
const router = express.Router();
const productImgController = require('../controllers/productImgController');

// Rutas para imágenes de productos
router.get('/:productId/images', productImgController.getProductImages);
router.post('/:productId/images', productImgController.addProductImage);
router.delete('/images/:id', productImgController.deleteProductImage);

module.exports = router;
