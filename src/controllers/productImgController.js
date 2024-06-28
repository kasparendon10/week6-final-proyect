const { ProductImg } = require('../models');

const getProductImages = async (req, res) => {
    try {
        const { productId } = req.params;
        const images = await ProductImg.findAll({ where: { productId } });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addProductImage = async (req, res) => {
    try {
        const { productId } = req.params;
        const { imageUrl } = req.body;
        const newImage = await ProductImg.create({ productId, imageUrl });
        res.status(201).json(newImage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProductImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await ProductImg.findByPk(id);
        if (image) {
            await image.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProductImages,
    addProductImage,
    deleteProductImage
};
