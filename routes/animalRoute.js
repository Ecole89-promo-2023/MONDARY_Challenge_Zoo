const express = require('express');
const { createAnimal, deleteAnimal, updateAnimal } = require('../controllers/animalController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', createAnimal);
router.delete('/delete/:id', auth, admin, deleteAnimal);
router.put('/update/:id', auth, admin, updateAnimal);

module.exports = router;