const express = require('express');
const { create } = require('../controllers/animalController');
const router = express.Router();

router.post('/new', create);

module.exports = router;