const { Cart, Product } = require('../models');

const getCart = async (req, res) => {
    try {
        //posible autenticación de usuario
        const userId = req.user.id;
        const cartItems = await Cart.findAll({ where: { userId }, include: Product });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const cartItem = await Cart.findOne({ where: { id, userId }, include: Product });
        if (cartItem) {
            res.status(200).json(cartItem);
        } else {
            res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const cartItem = await Cart.create({ userId, productId, quantity });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const cartItem = await Cart.findOne({ where: { id, userId } });
        if (cartItem) {
            await cartItem.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity } = req.body;
        const [updated] = await Cart.update({ quantity }, { where: { id, userId } });
        if (updated) {
            const updatedCartItem = await Cart.findOne({ where: { id, userId } });
            res.status(200).json(updatedCartItem);
        } else {
            res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCart,
    getCartItem,
    addToCart,
    deleteCartItem,
    updateCartItem
};
