const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Category;

