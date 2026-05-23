import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        // 🌟 Save user and hold reference to the document so we can read its generated createdAt timestamp!
        const newUser = await User.create({ 
            name, 
            email: normalizedEmail, 
            password: hashedPassword, 
            plan: 'Student' 
        });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            plan: newUser.plan,
            createdAt: newUser.createdAt
        };

        res.status(201).json({ result: userResponse, token });
    } catch (error) {
        res.status(500).json({ message: "Signup failed, please try again." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            createdAt: user.createdAt
        };

        res.status(200).json({ result: userResponse, token });
    } catch (error) {
        // Logging the actual runtime error down here helps trace variable name typos instantly
        console.error("Login route failure:", error);
        res.status(500).json({ message: "Login failed" });
    }
};