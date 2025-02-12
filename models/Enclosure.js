const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Enclosure = sequelize.define('Enclosure', {
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surface: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Enclosure;