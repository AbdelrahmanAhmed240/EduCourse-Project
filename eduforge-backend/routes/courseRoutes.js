import express from 'express';
import { createCourse, getCourses } from '../controllers/CourseController.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.get('/', auth, getCourses);
router.post('/', auth, createCourse);

export default router;