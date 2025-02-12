const express = require('express');
const { createEnclosure, deleteEnclosure, updateEnclosure } = require('../controllers/enclosureController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', auth, createEnclosure);
router.delete('/delete/:id', auth, admin, deleteEnclosure);
router.put('/update/:id', auth, admin, updateEnclosure);

module.exports = router;