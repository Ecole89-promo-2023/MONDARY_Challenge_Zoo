const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Specie = sequelize.define('Specie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Specie;