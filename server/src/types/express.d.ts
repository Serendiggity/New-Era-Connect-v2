import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionClaims?: {
          email?: string;
          firstName?: string;
          lastName?: string;
          imageUrl?: string;
        };
      };
    }
  }
}