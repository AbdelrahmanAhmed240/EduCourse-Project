import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();
const app = express();

app.use(helmet());

// Production Domain Access Rules
const allowedOrigins = ['https://yourfrontenddomain.com', 'http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS policy rules'));
        }
    },
    credentials: true
}));

// Payload safety limitation rules
app.use(express.json({ limit: '10kb' }));

// Global application firewall rate limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // Maximum requests per client IP
    message: { message: "Too many requests from this device, please try later." }
});
app.use('/api/', globalLimiter);

// System Endpoint Mappings
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`🚀 Production server secure on port ${PORT}`)))
    .catch((err) => console.error("Database connection failure:", err));