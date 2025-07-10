import { db } from '../../db';
import { contacts, events, InsertContact, ContactWithEvent } from '@new-era-connect/shared';
import { eq, and, or, ilike } from 'drizzle-orm';

export async function getContacts(userId: string): Promise<ContactWithEvent[]> {
  const result = await db
    .select({
      id: contacts.id,
      firstName: contacts.firstName,
      lastName: contacts.lastName,
      email: contacts.email,
      phone: contacts.phone,
      company: contacts.company,
      title: contacts.title,
      notes: contacts.notes,
      linkedInUrl: contacts.linkedInUrl,
      website: contacts.website,
      eventId: contacts.eventId,
      userId: contacts.userId,
      createdAt: contacts.createdAt,
      updatedAt: contacts.updatedAt,
      event: {
        id: events.id,
        name: events.name,
        description: events.description,
        startDate: events.startDate,
        endDate: events.endDate,
        location: events.location,
        userId: events.userId,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      }
    })
    .from(contacts)
    .leftJoin(events, eq(contacts.eventId, events.id))
    .where(eq(contacts.userId, userId))
    .orderBy(contacts.createdAt);

  return result;
}

export async function searchContacts(userId: string, query: string): Promise<ContactWithEvent[]> {
  // Simple search implementation - can be enhanced with AI-powered search later
  const result = await db
    .select({
      id: contacts.id,
      firstName: contacts.firstName,
      lastName: contacts.lastName,
      email: contacts.email,
      phone: contacts.phone,
      company: contacts.company,
      title: contacts.title,
      notes: contacts.notes,
      linkedInUrl: contacts.linkedInUrl,
      website: contacts.website,
      eventId: contacts.eventId,
      userId: contacts.userId,
      createdAt: contacts.createdAt,
      updatedAt: contacts.updatedAt,
      event: {
        id: events.id,
        name: events.name,
        description: events.description,
        startDate: events.startDate,
        endDate: events.endDate,
        location: events.location,
        userId: events.userId,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      }
    })
    .from(contacts)
    .leftJoin(events, eq(contacts.eventId, events.id))
    .where(
      and(
        eq(contacts.userId, userId),
        or(
          ilike(contacts.firstName, `%${query}%`),
          ilike(contacts.lastName, `%${query}%`),
          ilike(contacts.email, `%${query}%`),
          ilike(contacts.company, `%${query}%`),
          ilike(contacts.title, `%${query}%`),
          ilike(contacts.notes, `%${query}%`)
        )
      )
    )
    .orderBy(contacts.createdAt);

  return result;
}

export async function getContact(userId: string, contactId: number): Promise<ContactWithEvent | null> {
  const result = await db
    .select({
      id: contacts.id,
      firstName: contacts.firstName,
      lastName: contacts.lastName,
      email: contacts.email,
      phone: contacts.phone,
      company: contacts.company,
      title: contacts.title,
      notes: contacts.notes,
      linkedInUrl: contacts.linkedInUrl,
      website: contacts.website,
      eventId: contacts.eventId,
      userId: contacts.userId,
      createdAt: contacts.createdAt,
      updatedAt: contacts.updatedAt,
      event: {
        id: events.id,
        name: events.name,
        description: events.description,
        startDate: events.startDate,
        endDate: events.endDate,
        location: events.location,
        userId: events.userId,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      }
    })
    .from(contacts)
    .leftJoin(events, eq(contacts.eventId, events.id))
    .where(and(eq(contacts.userId, userId), eq(contacts.id, contactId)))
    .limit(1);

  return result[0] || null;
}

export async function createContact(data: InsertContact): Promise<ContactWithEvent> {
  const result = await db
    .insert(contacts)
    .values(data)
    .returning();

  const newContact = result[0];
  
  // Fetch the complete contact with event data
  const contactWithEvent = await getContact(data.userId, newContact.id);
  return contactWithEvent!;
}

export async function updateContact(
  userId: string,
  contactId: number,
  data: Partial<InsertContact>
): Promise<ContactWithEvent | null> {
  const result = await db
    .update(contacts)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(contacts.userId, userId), eq(contacts.id, contactId)))
    .returning();

  if (result.length === 0) {
    return null;
  }

  // Fetch the complete contact with event data
  const contactWithEvent = await getContact(userId, contactId);
  return contactWithEvent;
}

export async function deleteContact(userId: string, contactId: number): Promise<boolean> {
  const result = await db
    .delete(contacts)
    .where(and(eq(contacts.userId, userId), eq(contacts.id, contactId)))
    .returning();

  return result.length > 0;
} 