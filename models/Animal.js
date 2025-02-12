const { DataTypes } = require('sequelize');
const Specie = require('./Specie');
const Enclosure = require('./Enclosure');
const sequelize = require('../config/db');

const Animal = sequelize.define('Animal', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tatoo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distinctiveMark: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Animal.belongsTo(Specie, { foreignKey: 'specieId' });
Specie.hasMany(Animal, { foreignKey: 'specieId' });

Animal.belongsTo(Enclosure, { foreignKey: 'enclosureId' });
Enclosure.hasMany(Animal, { foreignKey: 'enclosureId' });

module.exports = Animal;