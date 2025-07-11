import { Router } from 'express';
import { eventsService } from './events.service';
import { insertEventSchema } from '../../../../shared/schema';

const router = Router();

// GET /api/events - Get all events for the authenticated user
router.get('/', async (req, res) => {
  try {
    const userId = req.user!.id;
    const events = await eventsService.getEvents(userId);
    res.json({ data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - Get a specific event
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user!.id;
    const eventId = parseInt(req.params.id);
    
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const event = await eventsService.getEventById(userId, eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events - Create a new event
router.post('/', async (req, res) => {
  try {
    const userId = req.user!.id;
    
    // Validate request body
    const validation = insertEventSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid event data', 
        details: validation.error.errors 
      });
    }

    const { userId: _, ...eventData } = validation.data;
    const event = await eventsService.createEvent(userId, eventData);
    
    res.status(201).json({ data: event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT /api/events/:id - Update an existing event
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user!.id;
    const eventId = parseInt(req.params.id);
    
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    // Validate request body (partial update)
    const validation = insertEventSchema.partial().safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid event data', 
        details: validation.error.errors 
      });
    }

    const { userId: _, ...eventData } = validation.data;
    const event = await eventsService.updateEvent(userId, eventId, eventData);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ data: event });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE /api/events/:id - Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user!.id;
    const eventId = parseInt(req.params.id);
    
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const success = await eventsService.deleteEvent(userId, eventId);
    
    if (!success) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router; 