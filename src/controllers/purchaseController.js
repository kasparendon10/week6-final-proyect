const { Purchase, Cart } = require('../models');

const getPurchases = async (req, res) => {
    try {
        // posible autenticación de usuario
        const userId = req.user.id; 
        const purchases = await Purchase.findAll({ where: { userId } });
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const makePurchase = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await Cart.findAll({ where: { userId } });
        const purchases = await Promise.all(
            cartItems.map(async (item) => {
                return await Purchase.create({
                    userId: item.userId,
                    productId: item.productId,
                    quantity: item.quantity
                });
            })
        );
        await Cart.destroy({ where: { userId } });
        res.status(201).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPurchases,
    makePurchase
};
