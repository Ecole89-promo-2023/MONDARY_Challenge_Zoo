const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { firstName, lastName, jobTitle, email, password, isAdmin } = req.body;

        const existingEmployee = await Employee.findOne({ where: { email } });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newEmployee = new Employee({ firstName, lastName, jobTitle, email, password: hashedPassword, isAdmin });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorect Password' });
        }

        const token = jwt.sign({ id: employee.id }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Client connected successfully', token });
    } catch (error) {
        console.error('Error logging in employee: ', error);
        res.status(500).json({ message: '500: Error logging in employee' });
    }
};

module.exports = { register, login };