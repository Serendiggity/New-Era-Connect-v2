import { z } from 'zod';

// User schemas
export const insertUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const userSchema = insertUserSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Event schemas
export const insertEventSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  location: z.string().optional(),
  userId: z.string(),
});

export const eventSchema = insertEventSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Contact schemas
export const insertContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  notes: z.string().optional(),
  linkedInUrl: z.string().optional(),
  website: z.string().optional(),
  eventId: z.number().optional(),
  userId: z.string(),
});

export const contactSchema = insertContactSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Lead Group schemas
export const insertLeadGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  color: z.string().default('#3B82F6'),
  userId: z.string(),
});

export const leadGroupSchema = insertLeadGroupSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Email Template schemas
export const insertEmailTemplateSchema = z.object({
  name: z.string(),
  subject: z.string(),
  body: z.string(),
  isDefault: z.boolean().default(false),
  userId: z.string(),
});

export const emailTemplateSchema = insertEmailTemplateSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// TypeScript types
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Event = z.infer<typeof eventSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Contact = z.infer<typeof contactSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type LeadGroup = z.infer<typeof leadGroupSchema>;
export type InsertLeadGroup = z.infer<typeof insertLeadGroupSchema>;

export type EmailTemplate = z.infer<typeof emailTemplateSchema>;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;

// Additional types for API responses
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