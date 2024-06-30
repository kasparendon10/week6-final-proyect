const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware'); 

// Rutas para productos
router.get('/', authenticate, productController.getProducts);
router.post('/', authenticate, productController.createProduct);
router.get('/:id', authenticate, productController.getProductById);
router.delete('/:id', authenticate, productController.deleteProduct);
router.put('/:id', authenticate, productController.updateProduct);
router.post('/:id/images', authenticate, productController.addProductImage);

module.exports = router;


