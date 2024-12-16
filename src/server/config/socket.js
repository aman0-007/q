import { Server } from 'socket.io';
import { handleQuizEvents } from '../controllers/quiz/socket.js';

export const initializeSocket = (httpServer, corsOptions) => {
  const io = new Server(httpServer, {
    cors: {
      origin: corsOptions.origin,
      methods: corsOptions.methods,
      credentials: corsOptions.credentials,
      allowedHeaders: corsOptions.allowedHeaders
    },
    allowEIO3: true, // Allow Engine.IO version 3
    transports: ['websocket', 'polling'] // Enable both WebSocket and polling
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