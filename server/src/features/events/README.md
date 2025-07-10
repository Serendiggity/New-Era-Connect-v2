# Events Feature

## Purpose
The Events feature allows users to create and manage networking events that serve as containers for business card contacts and lead generation activities. This is a foundational feature that enables organizing contacts by the events where they were met.

## API Endpoints

### GET /api/events
- **Description:** List all events for the authenticated user
- **Auth Required:** Yes
- **Response:** Array of Event objects sorted by start date (newest first)
- **Error Codes:** 500 (server error)

### GET /api/events/:id
- **Description:** Get a specific event by ID
- **Auth Required:** Yes
- **Parameters:** 
  - `id` (path param) - Event ID
- **Response:** Single Event object
- **Error Codes:** 400 (invalid ID), 404 (not found), 500 (server error)

### POST /api/events
- **Description:** Create a new event
- **Auth Required:** Yes
- **Body:** 
  ```json
  {
    "name": "string (required)",
    "description": "string (optional)",
    "industry": "string (optional)", 
    "location": "string (optional)",
    "startDate": "date string (optional)",
    "endDate": "date string (optional)"
  }
  ```
- **Response:** Created Event object
- **Error Codes:** 400 (validation error), 500 (server error)

### PUT /api/events/:id
- **Description:** Update an existing event
- **Auth Required:** Yes
- **Parameters:**
  - `id` (path param) - Event ID
- **Body:** Partial event object (any fields from POST)
- **Response:** Updated Event object
- **Error Codes:** 400 (validation error), 404 (not found), 500 (server error)

### DELETE /api/events/:id
- **Description:** Delete an event
- **Auth Required:** Yes
- **Parameters:**
  - `id` (path param) - Event ID
- **Response:** Success message
- **Error Codes:** 400 (invalid ID), 404 (not found), 500 (server error)

## Database Tables

### events
- `id` - Auto-incrementing primary key
- `orgId` - Organization ID (foreign key)
- `userId` - User ID from Clerk (foreign key)
- `name` - Event name (required)
- `description` - Event description
- `industry` - Industry/sector of the event
- `location` - Event location
- `startDate` - Event start date
- `endDate` - Event end date
- `createdAt` - Timestamp of creation
- `updatedAt` - Timestamp of last update

## Service Methods

### eventsService.getEvents(userId: string)
Retrieves all events for a specific user, sorted by start date.

### eventsService.getEventById(userId: string, eventId: number)
Retrieves a specific event if it belongs to the user.

### eventsService.createEvent(userId: string, eventData: Partial<InsertEvent>)
Creates a new event with the provided data.

### eventsService.updateEvent(userId: string, eventId: number, eventData: Partial<InsertEvent>)
Updates an existing event if it belongs to the user.

### eventsService.deleteEvent(userId: string, eventId: number)
Deletes an event if it belongs to the user.

## Dependencies

### Internal
- `@/server/db` - Database connection
- `@new-era-connect/shared/schema` - Shared type definitions

### External
- `express` - Web framework
- `@clerk/express` - Authentication middleware
- `drizzle-orm` - Database ORM

## Error Handling
- All endpoints return appropriate HTTP status codes
- Validation errors include detailed error messages
- User isolation ensures users can only access their own events
- Invalid event IDs return 404 errors

## Testing

### Manual Testing with Thunder Client/Postman
1. **Create Event:** POST to `/api/events` with valid JSON body
2. **List Events:** GET `/api/events` to see all user events
3. **Get Single Event:** GET `/api/events/{id}` with valid ID
4. **Update Event:** PUT `/api/events/{id}` with partial update data
5. **Delete Event:** DELETE `/api/events/{id}` to remove event

### Key Test Scenarios
- Creating events with minimal data (only name)
- Creating events with full data
- Attempting to access another user's event (should fail)
- Updating non-existent events (should return 404)
- Invalid date formats (should return validation error)

## Performance Considerations
- Events are indexed by `orgId` and `userId` for fast queries
- Queries are limited to the authenticated user's data
- No pagination implemented yet (consider adding for users with many events)

## Security Notes
- All endpoints require authentication via Clerk
- User isolation is enforced at the service layer
- No sensitive data is exposed in event objects
- Input validation prevents SQL injection via Zod schemas

## Future Enhancements
- Add pagination for large event lists
- Add event search/filtering capabilities
- Add event categories or tags
- Add attendee count tracking
- Add event image upload support
- Add recurring event support
- Add event templates