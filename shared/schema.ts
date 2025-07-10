import { z } from 'zod';
import { 
  pgTable, 
  text, 
  integer, 
  timestamp, 
  boolean, 
  date, 
  serial,
  pgEnum,
  numeric,
  jsonb,
  primaryKey,
  unique,
  index
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// =====================================================
// ENUMS
// =====================================================

export const cardStatusEnum = pgEnum('card_status', [
  'processing', 
  'completed', 
  'failed', 
  'pending_review', 
  'user_verified'
]);

export const emailStatusEnum = pgEnum('email_status', [
  'draft', 
  'sent_to_gmail', 
  'sent', 
  'failed'
]);

// =====================================================
// TABLES
// =====================================================

// Organizations table
export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Users table (synced from Clerk)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk User ID
  orgId: integer('org_id').references(() => organizations.id),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Events table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  industry: text('industry'),
  location: text('location'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdIdx: index('idx_events_org_id').on(table.orgId),
  userIdIdx: index('idx_events_user_id').on(table.userId),
}));

// Business Cards table
export const businessCards = pgTable('business_cards', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  userId: text('user_id').notNull().references(() => users.id),
  eventId: integer('event_id').references(() => events.id),
  storagePath: text('storage_path').notNull(),
  status: cardStatusEnum('status').default('processing').notNull(),
  ocrData: jsonb('ocr_data'),
  confidenceScore: numeric('confidence_score', { precision: 5, scale: 2 }),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
}, (table) => ({
  statusIdx: index('idx_business_cards_status').on(table.status),
}));

// Contacts table
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  userId: text('user_id').notNull().references(() => users.id),
  eventId: integer('event_id').references(() => events.id),
  cardId: integer('card_id').references(() => businessCards.id),
  // Contact details
  fullName: text('full_name').notNull(),
  company: text('company'),
  title: text('title'),
  phone: text('phone'),
  email: text('email'),
  // Verification tracking
  ocrConfidence: numeric('ocr_confidence', { precision: 5, scale: 2 }),
  isVerified: boolean('is_verified').default(false),
  verifiedAt: timestamp('verified_at'),
  verifiedBy: text('verified_by').references(() => users.id),
  // Additional fields
  linkedinUrl: text('linkedin_url'),
  website: text('website'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgEmailUnique: unique('unique_org_email').on(table.orgId, table.email),
  orgIdIdx: index('idx_contacts_org_id').on(table.orgId),
  userIdIdx: index('idx_contacts_user_id').on(table.userId),
  emailIdx: index('idx_contacts_email').on(table.email),
  companyIdx: index('idx_contacts_company').on(table.company),
  fullNameIdx: index('idx_contacts_full_name').on(table.fullName),
}));

// Lead Groups table
export const leadGroups = pgTable('lead_groups', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color').default('#3B82F6'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgIdIdx: index('idx_lead_groups_org_id').on(table.orgId),
}));

// Lead Group Contacts junction table
export const leadGroupContacts = pgTable('lead_group_contacts', {
  leadGroupId: integer('lead_group_id').notNull().references(() => leadGroups.id, { onDelete: 'cascade' }),
  contactId: integer('contact_id').notNull().references(() => contacts.id, { onDelete: 'cascade' }),
  addedAt: timestamp('added_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.leadGroupId, table.contactId] }),
}));

// Email Templates table
export const emailTemplates = pgTable('email_templates', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  orgNameUnique: unique('unique_org_template_name').on(table.orgId, table.name),
}));

// Gmail Connections table
export const gmailConnections = pgTable('gmail_connections', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id).unique(),
  email: text('email').notNull(),
  accessToken: text('access_token'), // encrypted at app level
  refreshToken: text('refresh_token'), // encrypted at app level
  tokenExpiry: timestamp('token_expiry'),
  isActive: boolean('is_active').default(true),
  connectedAt: timestamp('connected_at').defaultNow().notNull(),
  lastSyncAt: timestamp('last_sync_at'),
});

// Email Drafts table
export const emailDrafts = pgTable('email_drafts', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  userId: text('user_id').notNull().references(() => users.id),
  contactId: integer('contact_id').notNull().references(() => contacts.id),
  templateId: integer('template_id').references(() => emailTemplates.id),
  leadGroupId: integer('lead_group_id').references(() => leadGroups.id),
  subject: text('subject').notNull(),
  body: text('body').notNull(),
  status: emailStatusEnum('status').default('draft').notNull(),
  gmailDraftId: text('gmail_draft_id'),
  sentToGmailAt: timestamp('sent_to_gmail_at'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  statusIdx: index('idx_email_drafts_status').on(table.status),
}));

// Daily Stats table (for analytics)
export const dailyStats = pgTable('daily_stats', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  date: date('date').notNull(),
  cardsUploaded: integer('cards_uploaded').default(0),
  contactsCreated: integer('contacts_created').default(0),
  contactsVerified: integer('contacts_verified').default(0),
  draftsGenerated: integer('drafts_generated').default(0),
  draftsSentToGmail: integer('drafts_sent_to_gmail').default(0),
  emailsSent: integer('emails_sent').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  orgDateUnique: unique('unique_org_date').on(table.orgId, table.date),
  orgDateIdx: index('idx_daily_stats_org_date').on(table.orgId, table.date),
}));

// Activity Logs table
export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  orgId: integer('org_id').notNull().references(() => organizations.id),
  userId: text('user_id').notNull().references(() => users.id),
  action: text('action').notNull(), // 'card_uploaded', 'contact_verified', etc.
  entityType: text('entity_type'), // 'contact', 'event', 'email_draft', etc.
  entityId: integer('entity_id'),
  metadata: jsonb('metadata'), // additional context
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  orgUserIdx: index('idx_activity_logs_org_user').on(table.orgId, table.userId, table.createdAt),
}));

// =====================================================
// ZOD SCHEMAS
// =====================================================

// Organization schemas
export const insertOrganizationSchema = createInsertSchema(organizations);
export const selectOrganizationSchema = createSelectSchema(organizations);

// User schemas
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
});
export const selectUserSchema = createSelectSchema(users);

// Event schemas
export const insertEventSchema = createInsertSchema(events, {
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
export const selectEventSchema = createSelectSchema(events);

// Business Card schemas
export const insertBusinessCardSchema = createInsertSchema(businessCards);
export const selectBusinessCardSchema = createSelectSchema(businessCards);

// Contact schemas
export const insertContactSchema = createInsertSchema(contacts, {
  email: z.string().email().optional(),
  fullName: z.string().min(1, "Full name is required"),
});
export const selectContactSchema = createSelectSchema(contacts);

// Lead Group schemas
export const insertLeadGroupSchema = createInsertSchema(leadGroups, {
  color: z.string().regex(/^#[0-9A-F]{6}$/i).default('#3B82F6'),
});
export const selectLeadGroupSchema = createSelectSchema(leadGroups);

// Email Template schemas
export const insertEmailTemplateSchema = createInsertSchema(emailTemplates);
export const selectEmailTemplateSchema = createSelectSchema(emailTemplates);

// Email Draft schemas
export const insertEmailDraftSchema = createInsertSchema(emailDrafts);
export const selectEmailDraftSchema = createSelectSchema(emailDrafts);

// Gmail Connection schemas
export const insertGmailConnectionSchema = createInsertSchema(gmailConnections);
export const selectGmailConnectionSchema = createSelectSchema(gmailConnections);

// =====================================================
// TYPESCRIPT TYPES
// =====================================================

// Base types
export type Organization = z.infer<typeof selectOrganizationSchema>;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = z.infer<typeof selectEventSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type BusinessCard = z.infer<typeof selectBusinessCardSchema>;
export type InsertBusinessCard = z.infer<typeof insertBusinessCardSchema>;

export type Contact = z.infer<typeof selectContactSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type LeadGroup = z.infer<typeof selectLeadGroupSchema>;
export type InsertLeadGroup = z.infer<typeof insertLeadGroupSchema>;

export type EmailTemplate = z.infer<typeof selectEmailTemplateSchema>;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;

export type EmailDraft = z.infer<typeof selectEmailDraftSchema>;
export type InsertEmailDraft = z.infer<typeof insertEmailDraftSchema>;

export type GmailConnection = z.infer<typeof selectGmailConnectionSchema>;
export type InsertGmailConnection = z.infer<typeof insertGmailConnectionSchema>;

// Composite types for API responses
export type ContactWithEvent = Contact & {
  event?: Event | null;
};

export type EventWithContacts = Event & {
  contacts: Contact[];
  _count: {
    contacts: number;
  };
};

export type LeadGroupWithContacts = LeadGroup & {
  contacts: Contact[];
  _count: {
    contacts: number;
  };
};

export type BusinessCardWithContact = BusinessCard & {
  contact?: Contact | null;
};

export type EmailDraftWithDetails = EmailDraft & {
  contact: Contact;
  template?: EmailTemplate | null;
  leadGroup?: LeadGroup | null;
};

// Status types
export type CardStatus = 'processing' | 'completed' | 'failed' | 'pending_review' | 'user_verified';
export type EmailStatus = 'draft' | 'sent_to_gmail' | 'sent' | 'failed'; 