import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import { initializeSocket } from './config/socket.js';
import { errorHandler } from './middleware/errorHandler.js';
import quizRoutes from './routes/quiz.js';

const app = express();
const httpServer = createServer(app);

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://192.168.53.225:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Initialize Socket.IO with CORS
initializeSocket(httpServer, corsOptions);

// Middleware
app.use(express.json());

// Connect to Database
connectDatabase();

// Routes
app.use('/api', quizRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});