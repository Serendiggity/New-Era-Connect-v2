import { Router } from 'express';

const router = Router();

// Get email templates
router.get('/templates', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    // TODO: Implement email templates service
    res.json({ data: [] });
  } catch (error) {
    console.error('Error fetching email templates:', error);
    res.status(500).json({ error: 'Failed to fetch email templates' });
  }
});

// Create email template
router.post('/templates', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    // TODO: Implement create email template
    res.status(201).json({ data: { id: 1, ...req.body, userId } });
  } catch (error) {
    console.error('Error creating email template:', error);
    res.status(500).json({ error: 'Failed to create email template' });
  }
});

export default router; 