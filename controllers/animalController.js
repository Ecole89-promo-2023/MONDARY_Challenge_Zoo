const Animal = require('../models/Animal');
const Specie = require('../models/Specie');
const Enclosure = require('../models/Enclosure');
require('dotenv').config();

const create = async (req, res) => {
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

module.exports = { create };