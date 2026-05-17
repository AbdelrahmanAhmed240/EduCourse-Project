import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

const app = express();
app.use(express.json());

// Enable cross-origin resource credentials handling perfectly
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                
}));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
    .catch((err) => console.log("DB Error:", err));