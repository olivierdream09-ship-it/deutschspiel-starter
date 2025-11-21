import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { config } from 'dotenv';

// Routes
import userRoutes from './routes/users';
import gameRoutes from './routes/games';
import vocabularyRoutes from './routes/vocabulary';
import adminRoutes from './routes/admin';
import contentRoutes from './routes/contentUpdates';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DeutschSpiel API is running',
    timestamp: new Date().toISOString()
  });
});

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 DeutschSpiel backend running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
});

export default app;
