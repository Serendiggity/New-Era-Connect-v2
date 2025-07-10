import type { Event, InsertEvent } from "../../../shared/schema";

export async function getEvents(): Promise<Event[]> {
  const response = await fetch('/api/events');
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error || 'Failed to fetch events');
  }
  const result = await response.json();
  return result.data;
}

export async function createEvent(eventData: Omit<InsertEvent, 'id' | 'userId' | 'orgId' | 'createdAt' | 'updatedAt'>): Promise<Event> {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error || 'Failed to create event');
  }

  const result = await response.json();
  return result.data;
}

export async function updateEvent(eventId: number, eventData: Partial<InsertEvent>): Promise<Event> {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error || 'Failed to update event');
  }

  const result = await response.json();
  return result.data;
}

export async function deleteEvent(eventId: number): Promise<{ success: boolean }> {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error || 'Failed to delete event');
  }

  return { success: true };
}

export async function getEventById(eventId: string): Promise<Event> {
  const response = await fetch(`/api/events/${eventId}`);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.error || 'Failed to fetch event');
  }

  const result = await response.json();
  return result.data;
} 