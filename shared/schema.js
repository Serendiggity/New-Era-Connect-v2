"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectGmailConnectionSchema = exports.insertGmailConnectionSchema = exports.selectEmailDraftSchema = exports.insertEmailDraftSchema = exports.selectEmailTemplateSchema = exports.insertEmailTemplateSchema = exports.selectLeadGroupSchema = exports.insertLeadGroupSchema = exports.selectContactSchema = exports.insertContactSchema = exports.selectBusinessCardSchema = exports.insertBusinessCardSchema = exports.selectEventSchema = exports.insertEventSchema = exports.selectUserSchema = exports.insertUserSchema = exports.selectOrganizationSchema = exports.insertOrganizationSchema = exports.activityLogs = exports.dailyStats = exports.emailDrafts = exports.gmailConnections = exports.emailTemplates = exports.leadGroupContacts = exports.leadGroups = exports.contacts = exports.businessCards = exports.events = exports.users = exports.organizations = exports.emailStatusEnum = exports.cardStatusEnum = void 0;
const zod_1 = require("zod");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
// =====================================================
// ENUMS
// =====================================================
exports.cardStatusEnum = (0, pg_core_1.pgEnum)('card_status', [
    'processing',
    'completed',
    'failed',
    'pending_review',
    'user_verified'
]);
exports.emailStatusEnum = (0, pg_core_1.pgEnum)('email_status', [
    'draft',
    'sent_to_gmail',
    'sent',
    'failed'
]);
// =====================================================
// TABLES
// =====================================================
// Organizations table
exports.organizations = (0, pg_core_1.pgTable)('organizations', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
// Users table (synced from Clerk)
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.text)('id').primaryKey(), // Clerk User ID
    orgId: (0, pg_core_1.integer)('org_id').references(() => exports.organizations.id),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    firstName: (0, pg_core_1.text)('first_name'),
    lastName: (0, pg_core_1.text)('last_name'),
    imageUrl: (0, pg_core_1.text)('image_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
// Events table
exports.events = (0, pg_core_1.pgTable)('events', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    industry: (0, pg_core_1.text)('industry'),
    location: (0, pg_core_1.text)('location'),
    startDate: (0, pg_core_1.date)('start_date'),
    endDate: (0, pg_core_1.date)('end_date'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (table) => ({
    orgIdIdx: (0, pg_core_1.index)('idx_events_org_id').on(table.orgId),
    userIdIdx: (0, pg_core_1.index)('idx_events_user_id').on(table.userId),
}));
// Business Cards table
exports.businessCards = (0, pg_core_1.pgTable)('business_cards', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id),
    eventId: (0, pg_core_1.integer)('event_id').references(() => exports.events.id),
    storagePath: (0, pg_core_1.text)('storage_path').notNull(),
    status: (0, exports.cardStatusEnum)('status').default('processing').notNull(),
    ocrData: (0, pg_core_1.jsonb)('ocr_data'),
    confidenceScore: (0, pg_core_1.numeric)('confidence_score', { precision: 5, scale: 2 }),
    uploadedAt: (0, pg_core_1.timestamp)('uploaded_at').defaultNow().notNull(),
    processedAt: (0, pg_core_1.timestamp)('processed_at'),
}, (table) => ({
    statusIdx: (0, pg_core_1.index)('idx_business_cards_status').on(table.status),
}));
// Contacts table
exports.contacts = (0, pg_core_1.pgTable)('contacts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id),
    eventId: (0, pg_core_1.integer)('event_id').references(() => exports.events.id),
    cardId: (0, pg_core_1.integer)('card_id').references(() => exports.businessCards.id),
    // Contact details
    fullName: (0, pg_core_1.text)('full_name').notNull(),
    company: (0, pg_core_1.text)('company'),
    title: (0, pg_core_1.text)('title'),
    phone: (0, pg_core_1.text)('phone'),
    email: (0, pg_core_1.text)('email'),
    // Verification tracking
    ocrConfidence: (0, pg_core_1.numeric)('ocr_confidence', { precision: 5, scale: 2 }),
    isVerified: (0, pg_core_1.boolean)('is_verified').default(false),
    verifiedAt: (0, pg_core_1.timestamp)('verified_at'),
    verifiedBy: (0, pg_core_1.text)('verified_by').references(() => exports.users.id),
    // Additional fields
    linkedinUrl: (0, pg_core_1.text)('linkedin_url'),
    website: (0, pg_core_1.text)('website'),
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (table) => ({
    orgEmailUnique: (0, pg_core_1.unique)('unique_org_email').on(table.orgId, table.email),
    orgIdIdx: (0, pg_core_1.index)('idx_contacts_org_id').on(table.orgId),
    userIdIdx: (0, pg_core_1.index)('idx_contacts_user_id').on(table.userId),
    emailIdx: (0, pg_core_1.index)('idx_contacts_email').on(table.email),
    companyIdx: (0, pg_core_1.index)('idx_contacts_company').on(table.company),
    fullNameIdx: (0, pg_core_1.index)('idx_contacts_full_name').on(table.fullName),
}));
// Lead Groups table
exports.leadGroups = (0, pg_core_1.pgTable)('lead_groups', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description'),
    color: (0, pg_core_1.text)('color').default('#3B82F6'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (table) => ({
    orgIdIdx: (0, pg_core_1.index)('idx_lead_groups_org_id').on(table.orgId),
}));
// Lead Group Contacts junction table
exports.leadGroupContacts = (0, pg_core_1.pgTable)('lead_group_contacts', {
    leadGroupId: (0, pg_core_1.integer)('lead_group_id').notNull().references(() => exports.leadGroups.id, { onDelete: 'cascade' }),
    contactId: (0, pg_core_1.integer)('contact_id').notNull().references(() => exports.contacts.id, { onDelete: 'cascade' }),
    addedAt: (0, pg_core_1.timestamp)('added_at').defaultNow().notNull(),
}, (table) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.leadGroupId, table.contactId] }),
}));
// Email Templates table
exports.emailTemplates = (0, pg_core_1.pgTable)('email_templates', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id),
    name: (0, pg_core_1.text)('name').notNull(),
    subject: (0, pg_core_1.text)('subject').notNull(),
    body: (0, pg_core_1.text)('body').notNull(),
    isDefault: (0, pg_core_1.boolean)('is_default').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (table) => ({
    orgNameUnique: (0, pg_core_1.unique)('unique_org_template_name').on(table.orgId, table.name),
}));
// Gmail Connections table
exports.gmailConnections = (0, pg_core_1.pgTable)('gmail_connections', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id).unique(),
    email: (0, pg_core_1.text)('email').notNull(),
    accessToken: (0, pg_core_1.text)('access_token'), // encrypted at app level
    refreshToken: (0, pg_core_1.text)('refresh_token'), // encrypted at app level
    tokenExpiry: (0, pg_core_1.timestamp)('token_expiry'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    connectedAt: (0, pg_core_1.timestamp)('connected_at').defaultNow().notNull(),
    lastSyncAt: (0, pg_core_1.timestamp)('last_sync_at'),
});
// Email Drafts table
exports.emailDrafts = (0, pg_core_1.pgTable)('email_drafts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id),
    contactId: (0, pg_core_1.integer)('contact_id').notNull().references(() => exports.contacts.id),
    templateId: (0, pg_core_1.integer)('template_id').references(() => exports.emailTemplates.id),
    leadGroupId: (0, pg_core_1.integer)('lead_group_id').references(() => exports.leadGroups.id),
    subject: (0, pg_core_1.text)('subject').notNull(),
    body: (0, pg_core_1.text)('body').notNull(),
    status: (0, exports.emailStatusEnum)('status').default('draft').notNull(),
    gmailDraftId: (0, pg_core_1.text)('gmail_draft_id'),
    sentToGmailAt: (0, pg_core_1.timestamp)('sent_to_gmail_at'),
    sentAt: (0, pg_core_1.timestamp)('sent_at'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (table) => ({
    statusIdx: (0, pg_core_1.index)('idx_email_drafts_status').on(table.status),
}));
// Daily Stats table (for analytics)
exports.dailyStats = (0, pg_core_1.pgTable)('daily_stats', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    date: (0, pg_core_1.date)('date').notNull(),
    cardsUploaded: (0, pg_core_1.integer)('cards_uploaded').default(0),
    contactsCreated: (0, pg_core_1.integer)('contacts_created').default(0),
    contactsVerified: (0, pg_core_1.integer)('contacts_verified').default(0),
    draftsGenerated: (0, pg_core_1.integer)('drafts_generated').default(0),
    draftsSentToGmail: (0, pg_core_1.integer)('drafts_sent_to_gmail').default(0),
    emailsSent: (0, pg_core_1.integer)('emails_sent').default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (table) => ({
    orgDateUnique: (0, pg_core_1.unique)('unique_org_date').on(table.orgId, table.date),
    orgDateIdx: (0, pg_core_1.index)('idx_daily_stats_org_date').on(table.orgId, table.date),
}));
// Activity Logs table
exports.activityLogs = (0, pg_core_1.pgTable)('activity_logs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    orgId: (0, pg_core_1.integer)('org_id').notNull().references(() => exports.organizations.id),
    userId: (0, pg_core_1.text)('user_id').notNull().references(() => exports.users.id),
    action: (0, pg_core_1.text)('action').notNull(), // 'card_uploaded', 'contact_verified', etc.
    entityType: (0, pg_core_1.text)('entity_type'), // 'contact', 'event', 'email_draft', etc.
    entityId: (0, pg_core_1.integer)('entity_id'),
    metadata: (0, pg_core_1.jsonb)('metadata'), // additional context
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (table) => ({
    orgUserIdx: (0, pg_core_1.index)('idx_activity_logs_org_user').on(table.orgId, table.userId, table.createdAt),
}));
// =====================================================
// ZOD SCHEMAS
// =====================================================
// Organization schemas
exports.insertOrganizationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.organizations);
exports.selectOrganizationSchema = (0, drizzle_zod_1.createSelectSchema)(exports.organizations);
// User schemas
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users, {
    email: zod_1.z.string().email(),
});
exports.selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users);
// Event schemas
exports.insertEventSchema = (0, drizzle_zod_1.createInsertSchema)(exports.events, {
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
});
exports.selectEventSchema = (0, drizzle_zod_1.createSelectSchema)(exports.events);
// Business Card schemas
exports.insertBusinessCardSchema = (0, drizzle_zod_1.createInsertSchema)(exports.businessCards);
exports.selectBusinessCardSchema = (0, drizzle_zod_1.createSelectSchema)(exports.businessCards);
// Contact schemas
exports.insertContactSchema = (0, drizzle_zod_1.createInsertSchema)(exports.contacts, {
    email: zod_1.z.string().email().optional(),
    fullName: zod_1.z.string().min(1, "Full name is required"),
});
exports.selectContactSchema = (0, drizzle_zod_1.createSelectSchema)(exports.contacts);
// Lead Group schemas
exports.insertLeadGroupSchema = (0, drizzle_zod_1.createInsertSchema)(exports.leadGroups, {
    color: zod_1.z.string().regex(/^#[0-9A-F]{6}$/i).default('#3B82F6'),
});
exports.selectLeadGroupSchema = (0, drizzle_zod_1.createSelectSchema)(exports.leadGroups);
// Email Template schemas
exports.insertEmailTemplateSchema = (0, drizzle_zod_1.createInsertSchema)(exports.emailTemplates);
exports.selectEmailTemplateSchema = (0, drizzle_zod_1.createSelectSchema)(exports.emailTemplates);
// Email Draft schemas
exports.insertEmailDraftSchema = (0, drizzle_zod_1.createInsertSchema)(exports.emailDrafts);
exports.selectEmailDraftSchema = (0, drizzle_zod_1.createSelectSchema)(exports.emailDrafts);
// Gmail Connection schemas
exports.insertGmailConnectionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.gmailConnections);
exports.selectGmailConnectionSchema = (0, drizzle_zod_1.createSelectSchema)(exports.gmailConnections);
