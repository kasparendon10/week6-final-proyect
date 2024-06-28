const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware'); // Importar el middleware

// Rutas para productos
router.get('/', authenticate, productController.getProducts); // Añadir el middleware
router.post('/', authenticate, productController.createProduct); // Añadir el middleware
router.get('/:id', authenticate, productController.getProductById); // Añadir el middleware
router.delete('/:id', authenticate, productController.deleteProduct); // Añadir el middleware
router.put('/:id', authenticate, productController.updateProduct); // Añadir el middleware
router.post('/:id/images', authenticate, productController.addProductImage); // Añadir el middleware

module.exports = router;


