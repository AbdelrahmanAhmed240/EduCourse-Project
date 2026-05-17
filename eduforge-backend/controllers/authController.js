import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. User Registration Engine with Sequential Integer Auto-Generation
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Prevent duplicate emails manually to throw clean errors
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        // REAL-WORLD SCENARIO GENERATOR: 
        // Count existing records to calculate the next sequential integer (1, 2, 3...)
        const userCount = await User.countDocuments();
        const nextId = userCount + 1; 

        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            plan: 'Student',
            customId: nextId 
        });

        res.status(201).json({ message: `User created with ID: ${nextId}` });
    } catch (error) {
        res.status(500).json({ message: "Signup failed" });
    }
};

// 2. User Authentication Portal
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        // Return the entire user object ensuring frontend receives the customId property
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};

// 3. Dynamic Profile Endpoint (The Vulnerability Target)
export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params; // Grabs the clean integer string (e.g., "1" or "2")

        // 🛡️ THE ACCESS CONTROL LAYER (The Mitigation Goal)
        // -----------------------------------------------------------------
        // ❌ STATE 1 (Vulnerable): Leave this block commented out for your attack demonstration.
        // 🛡️ STATE 2 (Mitigated): Uncomment this block to show the live fix!
        /*
        const loggedInUser = await User.findById(req.userId);
        if (!loggedInUser || loggedInUser.customId !== parseInt(id)) {
            return res.status(403).json({ 
                message: "Access Denied: Security Violation. You do not have permission to view this profile." 
            });
        }
        */
        // -----------------------------------------------------------------

        // Developer Shortcut Flaw: Fetching data blindly based on the integer parameter input
        const user = await User.findOne({ customId: parseInt(id) });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile database records" });
    }
};