const Enclosure = require('../models/Enclosure');
require('dotenv').config();

const create = async (req, res) => {
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

module.exports = { create };