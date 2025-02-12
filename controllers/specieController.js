const Specie = require('../models/Specie');
require('dotenv').config();

const create = async (req, res) => {
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

module.exports = { create };