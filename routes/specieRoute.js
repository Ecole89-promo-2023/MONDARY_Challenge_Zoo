const express = require('express');
const { create } = require('../controllers/specieController');
const router = express.Router();

router.post('/new', create);

module.exports = router;