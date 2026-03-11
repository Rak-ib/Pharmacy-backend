const Employee = require("../models/Employee");






const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (req, res) => {
    try {
        const { name, email, phone, role, salary, joiningDate, status, avatar, password } = req.body;   
        // Validate input
        if (!name || !email || !phone || !role || !salary || !joiningDate || !status || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user already exists
        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }   

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);   
        // Create new user      
        const newUser = new Employee({
            name,
            email,
            phone,
            role,
            salary,
            joiningDate,
            status,
            avatar,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;    
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }   
        // Find user by username
        const user = await Employee.findOne({ email: username }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }   
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Update last login time
        user.lastLogin = new Date();
        await user.save();  
        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};





module.exports = {
    login,register
};