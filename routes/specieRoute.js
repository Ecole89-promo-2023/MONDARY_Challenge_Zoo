const express = require('express');
const { createSpecie, deleteSpecie, updateSpecie, getOne, getAll, getAllAnimals } = require('../controllers/specieController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', auth, createSpecie);
router.delete('/delete/:specieId', auth, admin, deleteSpecie);
router.put('/update/:specieId', auth, admin, updateSpecie);
router.get('/get/:specieId', auth, getOne);
router.get('/getall', auth, getAll);
router.get('/getall/animals/:specieId', auth, getAllAnimals);

module.exports = router;