import { eq, and, desc } from 'drizzle-orm';
import { db } from '../../db';
import { events, type Event, type InsertEvent } from '../../../../shared/schema';

export class EventsService {
  async getEvents(userId: string): Promise<Event[]> {
    const userEvents = await db
      .select()
      .from(events)
      .where(eq(events.userId, userId))
      .orderBy(desc(events.startDate), desc(events.createdAt));
    
    return userEvents;
  }

  async getEventById(userId: string, eventId: number): Promise<Event | null> {
    const event = await db
      .select()
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.userId, userId)))
      .limit(1);
    
    return event[0] || null;
  }

  async createEvent(userId: string, eventData: Omit<InsertEvent, 'userId' | 'orgId'>): Promise<Event> {
    // Get user's orgId from the auth context
    // For now, we'll use orgId: 1 as default (matching the ensureUserExists middleware)
    const orgId = 1;

    const newEvent = await db
      .insert(events)
      .values({
        ...eventData,
        userId,
        orgId,
      })
      .returning();

    return newEvent[0];
  }

  async updateEvent(
    userId: string, 
    eventId: number, 
    eventData: Partial<Omit<InsertEvent, 'userId' | 'orgId'>>
  ): Promise<Event | null> {
    const updatedEvent = await db
      .update(events)
      .set({
        ...eventData,
        updatedAt: new Date(),
      })
      .where(and(eq(events.id, eventId), eq(events.userId, userId)))
      .returning();

    return updatedEvent[0] || null;
  }

  async deleteEvent(userId: string, eventId: number): Promise<boolean> {
    const result = await db
      .delete(events)
      .where(and(eq(events.id, eventId), eq(events.userId, userId)))
      .returning();

    return result.length > 0;
  }
}

export const eventsService = new EventsService();