import express from 'express';
import { createCourse, getCourses, getRemainingCreations } from '../controllers/CourseController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/remaining', auth, getRemainingCreations); 
router.get('/', auth, getCourses);
router.post('/', auth, createCourse);

export default router;