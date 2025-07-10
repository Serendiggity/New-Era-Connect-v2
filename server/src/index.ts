import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requireAuth } from '@clerk/express';
import routes from './routes';
import { ensureUserExists } from './middleware/ensure-user-exists';

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'New Era Connect API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/*'
    }
  });
});

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'New Era Connect Server is running' });
});

// Apply Clerk authentication to all /api routes
app.use('/api', requireAuth());

// Apply ensureUserExists middleware after authentication
app.use('/api', ensureUserExists);

// Mount API routes
app.use('/api', routes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err.status === 401) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 API routes protected at: http://localhost:${PORT}/api/*`);
}); 