const express = require('express');
const { createAnimal, deleteAnimal, updateAnimal, linkAnimalToEmployee } = require('../controllers/animalController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', auth, createAnimal);
router.delete('/delete/:animalid', auth, admin, deleteAnimal);
router.put('/update/:animalid', auth, admin, updateAnimal);
router.post('/link/:animalId/:employeeId', auth, admin, linkAnimalToEmployee);

module.exports = router;