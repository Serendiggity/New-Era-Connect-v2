import { eq, and, desc } from 'drizzle-orm';
import { db } from '../../db';
import { events, type Event, type InsertEvent } from '../../../../shared/schema';

export class EventsService {
  async getEvents(userId: number): Promise<Event[]> {
    const userEvents = await db
      .select()
      .from(events)
      .where(eq(events.userId, userId))
      .orderBy(desc(events.startDate), desc(events.createdAt));
    
    return userEvents;
  }

  async getEventById(userId: number, eventId: number): Promise<Event | null> {
    const event = await db
      .select()
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.userId, userId)))
      .limit(1);
    
    return event[0] || null;
  }

  async createEvent(userId: number, eventData: Omit<InsertEvent, 'userId'>): Promise<Event> {
    const newEvent = await db
      .insert(events)
      .values({
        ...eventData,
        userId,
      })
      .returning();

    return newEvent[0];
  }

  async updateEvent(
    userId: number, 
    eventId: number, 
    eventData: Partial<Omit<InsertEvent, 'userId'>>
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

  async deleteEvent(userId: number, eventId: number): Promise<boolean> {
    const result = await db
      .delete(events)
      .where(and(eq(events.id, eventId), eq(events.userId, userId)))
      .returning();

    return result.length > 0;
  }
}

export const eventsService = new EventsService();