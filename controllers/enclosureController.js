const Enclosure = require('../models/Enclosure');
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

module.exports = { createEnclosure, deleteEnclosure, updateEnclosure };