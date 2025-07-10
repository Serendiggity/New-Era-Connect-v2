import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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
      apiTest: '/api/test'
    }
  });
});

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'New Era Connect Server is running' });
});

// API routes placeholder
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
}); 