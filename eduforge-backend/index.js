import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Allows frontend to talk to backend
app.use(express.json()); // Allows server to read JSON data

// Test Route
app.get('/', (req, res) => {
  res.send('EduForge AI API is running... 🚀');
});

// Start Server & Connect DB
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🌍 Server on: http://localhost:${PORT}`));
  })
  .catch(err => console.log("❌ DB Error: ", err));