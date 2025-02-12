const express = require('express');
const { createSpecie, deleteSpecie, updateSpecie } = require('../controllers/specieController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', auth, createSpecie);
router.delete('/delete/:id', auth, admin, deleteSpecie);
router.put('/update/:id', auth, admin, updateSpecie);

module.exports = router;