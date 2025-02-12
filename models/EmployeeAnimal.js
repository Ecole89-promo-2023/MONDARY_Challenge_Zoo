const Employee = require('../models/Employee');
const Animal = require('../models/Animal');
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const EmployeeAnimal = sequelize.define('EmployeeAnimal', {});

Employee.belongsToMany(Animal, { through: EmployeeAnimal, foreignKey: 'employeeId' });
Animal.belongsToMany(Employee, { through: EmployeeAnimal, foreignKey: 'animalId' });

module.exports = EmployeeAnimal;