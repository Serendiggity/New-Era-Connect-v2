import { Router } from 'express';

const router = Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    // TODO: Implement events service
    res.json({ data: [] });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create event
router.post('/', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    // TODO: Implement create event
    res.status(201).json({ data: { id: 1, ...req.body, userId } });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

export default router; 