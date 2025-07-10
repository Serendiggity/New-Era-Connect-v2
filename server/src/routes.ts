import { Router } from 'express';
import authRoutes from './features/auth/auth.routes';
import contactsRoutes from './features/contacts/contacts.routes';
import eventsRoutes from './features/events/events.routes';
import uploadsRoutes from './features/uploads/uploads.routes';
import emailsRoutes from './features/emails/emails.routes';
import leadGroupsRoutes from './features/lead-groups/lead-groups.routes';

const router = Router();

// Mount feature routes
router.use('/auth', authRoutes);
router.use('/contacts', contactsRoutes);
router.use('/events', eventsRoutes);
router.use('/uploads', uploadsRoutes);
router.use('/emails', emailsRoutes);
router.use('/lead-groups', leadGroupsRoutes);

export default router; 