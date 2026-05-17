import express from 'express';
import { login, register, getUserProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js'; 

const router = express.Router();

router.post('/login', login);
router.post('/signup', register);

// Dynamic path parameter routing configuration
router.get('/profile/:id', auth, getUserProfile);

export default router;