import { Router } from 'express';
import * as service from './contacts.service';
import { insertContactSchema } from '@new-era-connect/shared';

const router = Router();

// Get all contacts for the authenticated user
router.get('/', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const contacts = await service.getContacts(userId);
    res.json({ data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Search contacts with natural language query
router.get('/search', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const query = req.query.q as string;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const contacts = await service.searchContacts(userId, query);
    res.json({ data: contacts });
  } catch (error) {
    console.error('Error searching contacts:', error);
    res.status(500).json({ error: 'Failed to search contacts' });
  }
});

// Get a specific contact
router.get('/:id', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const contactId = parseInt(req.params.id);
    
    const contact = await service.getContact(userId, contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ data: contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const validated = insertContactSchema.parse({
      ...req.body,
      userId,
    });
    
    const contact = await service.createContact(validated);
    res.status(201).json({ data: contact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// Update a contact
router.put('/:id', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const contactId = parseInt(req.params.id);
    const validated = insertContactSchema.partial().parse(req.body);
    
    const contact = await service.updateContact(userId, contactId, validated);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ data: contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const contactId = parseInt(req.params.id);
    
    const success = await service.deleteContact(userId, contactId);
    if (!success) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

export default router; 