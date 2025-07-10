import { Router } from 'express';

const router = Router();

// Upload business card
router.post('/business-card', async (req, res) => {
  try {
    const userId = req.auth!.userId;
    // TODO: Implement file upload and OCR processing
    res.status(201).json({ data: { id: 1, status: 'processing' } });
  } catch (error) {
    console.error('Error uploading business card:', error);
    res.status(500).json({ error: 'Failed to upload business card' });
  }
});

export default router; 