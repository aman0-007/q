import { Socket, Server } from 'socket.io';
import { Quiz } from '../models/Quiz';

export const handleQuizEvents = (socket: Socket, io: Server) => {
  socket.on('join-quiz', async (pin: string, userData: any) => {
    console.log('User joining quiz:', pin, userData);
    socket.join(pin);
    io.to(pin).emit('user-joined', userData);
  });

  socket.on('start-quiz', (pin: string) => {
    console.log('Starting quiz:', pin);
    io.to(pin).emit('quiz-started');
  });

  socket.on('submit-answer', (data: any) => {
    console.log('Answer submitted:', data);
    io.to(data.pin).emit('answer-received', data);
  });
};

export const createQuiz = async (req: any, res: any) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

export const getQuizzes = async (req: any, res: any) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

export const getQuizById = async (req: any, res: any) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};