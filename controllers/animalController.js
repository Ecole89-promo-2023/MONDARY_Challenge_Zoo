const Animal = require('../models/Animal');
const Specie = require('../models/Specie');
const Enclosure = require('../models/Enclosure');
const Employee = require('../models/Employee');
const EmployeeAnimal = require('../models/EmployeeAnimal');
require('dotenv').config();

const createAnimal = async (req, res) => {
    try {
        const { name, tatoo, distinctiveMark, specieId, enclosureId } = req.body;

        const existingSpecie = await Specie.findByPk(specieId);
        if (!existingSpecie) {
            return res.status(404).json({ message: 'Specie not found' });
        }

        const existingEnclosure = await Enclosure.findByPk(enclosureId);
        if (!existingEnclosure) {
            return res.status(404).json({ message: 'Enclosure not found' });
        }

        const newAnimal = new Animal({ name, tatoo, distinctiveMark, specieId, enclosureId });
        await newAnimal.save();
        res.status(201).json({ message: 'Animal created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;

        const animal = await Animal.findByPk(id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        await animal.destroy();
        res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, tatoo, distinctiveMark, specieId, enclosureId } = req.body;

        const animal = await Animal.findByPk(id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        const existingSpecie = await Specie.findByPk(specieId);
        if (!existingSpecie) {
            return res.status(404).json({ message: 'Specie not found' });
        }

        const existingEnclosure = await Enclosure.findByPk(enclosureId);
        if (!existingEnclosure) {
            return res.status(404).json({ message: 'Enclosure not found' });
        }

        await animal.update({ name, tatoo, distinctiveMark, specieId, enclosureId });
        res.status(200).json({ message: 'Animal updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const linkAnimalToEmployee = async (req, res) => {
    try {
        const { animalId, employeeId } = req.params;

        const animal = await Animal.findByPk(animalId);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const existingLink = await EmployeeAnimal.findOne({
            where: { employeeId: employeeId, animalId: animalId }
        });
        if (existingLink) {
            return res.status(400).json({ message: `Employee ${employeeId} is already linked to this animal` });
        }

        await EmployeeAnimal.create({ employeeId: employeeId, animalId: animalId });
        res.status(201).json({ message: `Employee ${employeeId} successfully linked to animal ${animalId}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;

        const animal = await Animal.findByPk(id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const animals = await Animal.findAll();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllByEnclosure = async (req, res) => {
    try {
        const { enclosureId } = req.params;

        const animals = await Animal.findAll({ where: { enclosureId } });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllbySpecie = async (req, res) => {
    try {
        const { specieId } = req.params;

        const animals = await Animal.findAll({ where: { specieId } });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const animals = await EmployeeAnimal.findAll({ where: { employeeId } });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createAnimal, deleteAnimal, updateAnimal, linkAnimalToEmployee, getOne, getAll, getAllByEnclosure, getAllbySpecie, getAllByEmployee };