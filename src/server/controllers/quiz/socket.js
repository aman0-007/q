import { quizService } from '../../services/quiz/QuizService.js';

export const handleQuizEvents = (socket, io) => {
  const handleAdminJoin = (pin) => {
    console.log('Admin joined quiz:', pin);
    socket.join(pin);
    quizService.setAdminSocket(pin, socket);
    
    const users = quizService.getQuizUsers(pin);
    socket.emit('users-list', users);
  };

  const handleUserJoin = (pin, userData) => {
    console.log('User joining quiz:', pin, userData);
    
    const user = quizService.addUser(pin, socket, userData);
    socket.join(pin);
    
    io.to(pin).emit('user-joined', user);
  };

  const handleDisconnect = () => {
    const pin = quizService.removeUser(socket.id);
    if (pin) {
      io.to(pin).emit('user-left', socket.id);
    }
    quizService.removeAdminSocket(socket.id);
  };

  const handleAnswerSubmission = (data) => {
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
  };

  // Socket event listeners
  socket.on('admin-join', handleAdminJoin);
  socket.on('join-quiz', handleUserJoin);
  socket.on('disconnect', handleDisconnect);
  socket.on('start-quiz', (pin) => io.to(pin).emit('quiz-started'));
  socket.on('submit-answer', handleAnswerSubmission);
  socket.on('next-question', ({ pin, questionIndex }) => {
    io.to(pin).emit('question-changed', questionIndex);
  });
  socket.on('end-quiz', (pin) => {
    const users = quizService.getQuizUsers(pin);
    const results = [...users].sort((a, b) => b.score - a.score);
    io.to(pin).emit('quiz-ended', results);
  });
};