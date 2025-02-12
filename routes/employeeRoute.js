const express = require('express');
const { registerEmployee, loginEmployee, deleteEmployee, updateEmployee } = require('../controllers/employeeController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', registerEmployee);
router.post('/login', loginEmployee);
router.delete('/delete/:id', auth, admin, deleteEmployee);
router.put('/update/:id', auth, admin, updateEmployee);

module.exports = router;