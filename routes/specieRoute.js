const express = require('express');
const { create, deleteSpecie } = require('../controllers/specieController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', create);
router.delete('/delete/:id', auth, admin, deleteSpecie);

module.exports = router;