const Animal = require('../models/Animal');
const Specie = require('../models/Specie');
const Enclosure = require('../models/Enclosure');
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

module.exports = { createAnimal, deleteAnimal, updateAnimal };