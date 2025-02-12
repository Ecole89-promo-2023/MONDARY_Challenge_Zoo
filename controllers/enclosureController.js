const Enclosure = require('../models/Enclosure');
const Animal = require('../models/Animal');
require('dotenv').config();

const createEnclosure = async (req, res) => {
    try {
        const { location, surface } = req.body;

        const existingEnclosure = await Enclosure.findOne({ where: { location } });
        if (existingEnclosure) {
            return res.status(400).json({ message: 'Enclosure already exists' });
        }

        const newEnclosure = new Enclosure({ location, surface });
        await newEnclosure.save();
        res.status(201).json({ message: 'Enclosure created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteEnclosure = async (req, res) => {
    try {
        const { id } = req.params;

        const enclosure = await Enclosure.findByPk(id);
        if (!enclosure) {
            return res.status(404).json({ message: 'Enclosure not found' });
        }

        await enclosure.destroy();
        res.status(200).json({ message: 'Enclosure deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateEnclosure = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, surface } = req.body;

        const enclosure = await Enclosure.findByPk(id);
        if (!enclosure) {
            return res.status(404).json({ message: 'Enclosure not found' });
        }

        if (location && location !== enclosure.location) {
            const existingEnclosure = await Enclosure.findOne({ where: { location } });
            if (existingEnclosure) {
                return res.status(400).json({ message: 'Enclosure location already exists' });
            }
        }

        await enclosure.update({ location, surface });
        res.status(200).json({ message: 'Enclosure updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;

        const enclosure = await Enclosure.findByPk(id);
        if (!enclosure) {
            return res.status(404).json({ message: 'Enclosure not found' });
        }

        res.status(200).json(enclosure);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAll = async (_, res) => {
    try {
        const enclosures = await Enclosure.findAll();
        res.status(200).json(enclosures);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllAnimals = async (req, res) => {
    try {
        const { enclosureId } = req.params;

        const enclosure = await Enclosure.findByPk(enclosureId);
        if (!enclosure) {
            return res.status(404).json({ message: 'Enclosure not found' });
        }

        const animals = await Animal.findAll({ where: { enclosureId } });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { createEnclosure, deleteEnclosure, updateEnclosure, getOne, getAll, getAllAnimals };