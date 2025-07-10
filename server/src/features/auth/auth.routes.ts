import { Router } from 'express';

const router = Router();

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    // Return user profile data
    res.json({ 
      data: {
        userId,
        email: req.auth!.sessionClaims?.email,
        firstName: req.auth!.sessionClaims?.firstName,
        lastName: req.auth!.sessionClaims?.lastName,
        imageUrl: req.auth!.sessionClaims?.imageUrl,
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router; 