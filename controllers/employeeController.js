const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const EmployeeAnimal = require('../models/EmployeeAnimal');
require('dotenv').config();

const registerEmployee = async (req, res) => {
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

const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        const token = jwt.sign({ id: employee.id, isAdmin: employee.isAdmin }, process.env.PRIVATE_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Client connected successfully', token });
    } catch (error) {
        console.error('Error logging in employee: ', error);
        res.status(500).json({ message: '500: Error logging in employee' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.destroy();
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, jobTitle, isAdmin } = req.body;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.update({ firstName, lastName, jobTitle, isAdmin });
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const employees = await Employee.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllAnimals = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const employeeAnimals = await EmployeeAnimal.findAll({ where: { employeeId } });
        res.status(200).json(employeeAnimals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { registerEmployee, loginEmployee, deleteEmployee, updateEmployee, getOne, getAll, getAllAnimals };