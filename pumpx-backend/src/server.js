import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import tokenRoutes from './routes/tokens.js';
import swapRoutes from './routes/swap.js';
import aiRoutes from './routes/ai.js';
import userRoutes from './routes/user.js';
import statsRoutes from './routes/stats.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'PumpX Backend API',
    version: '1.0.0',
    endpoints: [
      '/api/v1/auth',
      '/api/v1/tokens', 
      '/api/v1/swap',
      '/api/v1/ai',
      '/api/v1/user',
      '/api/v1/stats'
    ]
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tokens', tokenRoutes);
app.use('/api/v1/swap', swapRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/stats', statsRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// For Vercel serverless function
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 PumpX Backend running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
}
