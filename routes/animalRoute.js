const express = require('express');
const { createAnimal, deleteAnimal, updateAnimal, linkAnimalToEmployee, getOne, getAll, getAllByEnclosure, getAllbySpecie, getAllByEmployee } = require('../controllers/animalController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', auth, createAnimal);
router.delete('/delete/:animalid', auth, admin, deleteAnimal);
router.put('/update/:animalid', auth, admin, updateAnimal);
router.post('/link/:animalId/:employeeId', auth, admin, linkAnimalToEmployee);
router.get('/get/:animalId', auth, getOne);
router.get('/getall', auth, getAll);
router.get('/getall/byenclosure/:enclosureId', auth, getAllByEnclosure);
router.get('/getall/byspecie/:specieId', auth, getAllbySpecie);
router.get('/getall/byemployee/:employeeId', auth, getAllByEmployee);

module.exports = router;