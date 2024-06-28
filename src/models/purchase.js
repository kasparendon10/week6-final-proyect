const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');
const Product = require('./product');

const Purchase = sequelize.define('Purchase', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Purchase;
