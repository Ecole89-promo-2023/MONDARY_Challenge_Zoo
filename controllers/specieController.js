const Specie = require('../models/Specie');
require('dotenv').config();

const createSpecie = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingSpecie = await Specie.findOne({ where: { name } });
        if (existingSpecie) {
            return res.status(400).json({ message: 'Specie already exists' });
        }

        const newSpecie = new Specie({ name, description });
        await newSpecie.save();
        res.status(201).json({ message: 'Specie created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteSpecie = async (req, res) => {
    try {
        const { id } = req.params;

        const specie = await Specie.findByPk(id);
        if (!specie) {
            return res.status(404).json({ message: 'Specie not found' });
        }

        await specie.destroy();
        res.status(200).json({ message: 'Specie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSpecie = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const specie = await Specie.findByPk(id);
        if (!specie) {
            return res.status(404).json({ message: 'Specie not found' });
        }

        if (name && name !== specie.name) {
            const existingSpecie = await Specie.findOne({ where: { name } });
            if (existingSpecie) {
                return res.status(400).json({ message: 'Specie name already exists' });
            }
        }

        await specie.update({ name, description });
        res.status(200).json({ message: 'Specie updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createSpecie, deleteSpecie, updateSpecie };