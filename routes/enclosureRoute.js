const express = require('express');
const { createEnclosure, deleteEnclosure, updateEnclosure, getOne, getAll, getAllAnimals } = require('../controllers/enclosureController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', auth, createEnclosure);
router.delete('/delete/:id', auth, admin, deleteEnclosure);
router.put('/update/:id', auth, admin, updateEnclosure);
router.get('/get/:id', auth, getOne);
router.get('/getall', auth, getAll);
router.get('/getall/animals/:enclosureId', auth, getAllAnimals);

module.exports = router;