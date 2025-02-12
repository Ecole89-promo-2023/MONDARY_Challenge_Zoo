const express = require('express');
const { registerEmployee, loginEmployee, deleteEmployee, updateEmployee, getOne, getAll, getAllAnimals } = require('../controllers/employeeController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

router.post('/new', registerEmployee);
router.post('/login', loginEmployee);
router.delete('/delete/:employeeId', auth, admin, deleteEmployee);
router.put('/update/:employeeId', auth, admin, updateEmployee);
router.get('/get/:employeeId', auth, getOne);
router.get('/getall', auth, admin, getAll);
router.get('/getall/animals/:employeeId', auth, getAllAnimals);

module.exports = router;