import express from 'express';
import { createServer } from 'http';
import { connectDatabase } from './config/database';
import { initializeSocket } from './config/socket';
import { errorHandler } from './middleware/errorHandler';
import quizRoutes from './routes/quiz';

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

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