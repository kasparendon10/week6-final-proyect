const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Product.belongsTo(Category, { foreignKey: 'categoryId' }); // Asegúrate de que la relación esté definida correctamente

module.exports = Product;


