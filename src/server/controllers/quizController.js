import { Quiz } from '../models/Quiz.js';
import { quizService } from '../services/QuizService.js';

export const handleQuizEvents = (socket, io) => {
  socket.on('admin-join', (pin) => {
    console.log('Admin joined quiz:', pin);
    socket.join(pin);
    quizService.setAdminSocket(pin, socket);
    
    // Send current users list to admin
    const users = quizService.getQuizUsers(pin);
    socket.emit('users-list', users);
  });

  socket.on('join-quiz', async (pin, userData) => {
    console.log('User joining quiz:', pin, userData);
    
    const user = quizService.addUser(pin, socket, userData);
    socket.join(pin);
    
    // Notify all clients in the room about the new user
    io.to(pin).emit('user-joined', user);
  });

  socket.on('disconnect', () => {
    const pin = quizService.removeUser(socket.id);
    if (pin) {
      io.to(pin).emit('user-left', socket.id);
    }
    quizService.removeAdminSocket(socket.id);
  });

  socket.on('start-quiz', (pin) => {
    console.log('Starting quiz:', pin);
    io.to(pin).emit('quiz-started');
  });

  socket.on('submit-answer', (data) => {
    const { pin, answer, timeLeft } = data;
    const score = Math.floor(timeLeft * 10);
    
    const updatedUser = quizService.updateUserScore(pin, socket.id, score);
    if (updatedUser) {
      io.to(pin).emit('answer-submitted', {
        userId: socket.id,
        answer,
        score: updatedUser.score
      });
    }
  });

  socket.on('next-question', (data) => {
    const { pin, questionIndex } = data;
    io.to(pin).emit('question-changed', questionIndex);
  });

  socket.on('end-quiz', (pin) => {
    const users = quizService.getQuizUsers(pin);
    const results = [...users].sort((a, b) => b.score - a.score);
    io.to(pin).emit('quiz-ended', results);
  });
};

// ... rest of the controller code remains the same