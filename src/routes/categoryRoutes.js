const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticate = require('../middlewares/authMiddleware');

// Rutas para categorías
router.get('/', authenticate, categoryController.getCategories);
router.post('/', authenticate, categoryController.createCategory);
router.delete('/:id', authenticate, categoryController.deleteCategory);

module.exports = router;
