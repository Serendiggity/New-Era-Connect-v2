import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { users } from '@new-era-connect/shared';
import { eq } from 'drizzle-orm';

export const ensureUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Skip if no auth (public routes)
    if (!req.auth?.userId) {
      return next();
    }

    const userId = req.auth.userId;
    const email = req.auth.sessionClaims?.email as string;
    const firstName = req.auth.sessionClaims?.firstName as string;
    const lastName = req.auth.sessionClaims?.lastName as string;
    const imageUrl = req.auth.sessionClaims?.imageUrl as string;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (existingUser.length === 0) {
      // Create user with default organization
      await db.insert(users).values({
        id: userId,
        email,
        firstName,
        lastName,
        imageUrl,
        orgId: 1, // Default organization
      });
      
      console.log(`Created new user ${userId} in default organization`);
    }

    next();
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 