import { Request, Response, NextFunction } from 'express';

// Simple middleware to set current user for single-user system
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  // For single-user system, always use the default user
  req.user = { 
    id: 1, 
    email: 'user@newera-connect.com',
    firstName: 'Default',
    lastName: 'User'
  };
  
  // Optional: Add request logging for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - User ID: ${req.user.id}`);
  }
  
  next();
};