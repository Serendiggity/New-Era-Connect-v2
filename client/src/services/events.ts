import { Event, InsertEvent } from '@new-era-connect/shared/schema';

const API_BASE_URL = '/api';

export const eventsService = {
  // Get all events for the authenticated user
  async getEvents(): Promise<Event[]> {
    const response = await fetch(`${API_BASE_URL}/events`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const { data } = await response.json();
    return data;
  },

  // Get a specific event by ID
  async getEventById(id: number): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Event not found');
      }
      throw new Error('Failed to fetch event');
    }
    
    const { data } = await response.json();
    return data;
  },

  // Create a new event
  async createEvent(event: Omit<InsertEvent, 'id' | 'userId' | 'orgId' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(event),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create event');
    }
    
    const { data } = await response.json();
    return data;
  },

  // Update an existing event
  async updateEvent(id: number, event: Partial<Omit<InsertEvent, 'id' | 'userId' | 'orgId' | 'createdAt' | 'updatedAt'>>): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(event),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Event not found');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to update event');
    }
    
    const { data } = await response.json();
    return data;
  },

  // Delete an event
  async deleteEvent(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Event not found');
      }
      throw new Error('Failed to delete event');
    }
  },
};