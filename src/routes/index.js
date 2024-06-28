const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const productImgRoutes = require('./productImgRoutes');
const authRoutes = require('./authRoutes'); // Añadir esta línea

router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/product-images', productImgRoutes);
router.use('/auth', authRoutes); // Añadir esta línea

module.exports = router;
