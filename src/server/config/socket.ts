import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { handleQuizEvents } from '../controllers/quizController';

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    handleQuizEvents(socket, io);
    
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};