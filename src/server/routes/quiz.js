import express from 'express';
import { createQuiz, getQuizzes, getQuizById } from '../controllers/quiz/index.js';

const router = express.Router();

router.post('/quizzes', createQuiz);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);

export default router;