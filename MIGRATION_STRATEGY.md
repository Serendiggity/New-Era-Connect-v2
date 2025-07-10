# Migration Strategy: Single-User to Multi-Tenant

## Overview

This document outlines the strategy for implementing the multi-tenant database schema while maintaining compatibility with the current single-user implementation.

## Phased Approach

### Phase 1: Initial Implementation (Current)

For immediate development, we'll use a simplified approach:

1. **Default Organization**: Create a single default organization (ID: 1)
2. **Automatic Assignment**: All new users are automatically assigned to this organization
3. **Hidden Complexity**: The multi-tenant structure exists but is transparent to the application

### Phase 2: Multi-Tenant Activation (Future)

When ready to support multiple organizations:

1. **Organization Creation**: Add UI for creating new organizations
2. **User Invitations**: Implement invite system for organizations
3. **Data Isolation**: Activate org-based filtering in queries

## Implementation Details

### 1. Database Initialization

Create a seed script (`server/seed.ts`):

```typescript
import { db } from './src/db';
import { organizations } from '@new-era-connect/shared/schema';

async function seed() {
  // Create default organization
  await db.insert(organizations).values({
    name: 'Default Organization'
  }).onConflictDoNothing();
}

seed().catch(console.error);
```

### 2. User Creation Middleware Update

Update `server/src/middleware/ensure-user-exists.ts`:

```typescript
// Add orgId: 1 to all new users
const newUser = await db.insert(users).values({
  id: userId,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  imageUrl: user.imageUrl,
  orgId: 1 // Default organization
}).onConflictDoNothing();
```

### 3. Service Layer Updates

All services should include `orgId` in queries:

```typescript
// Example: contacts.service.ts
export async function getContacts(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  });
  
  return db.query.contacts.findMany({
    where: and(
      eq(contacts.orgId, user.orgId),
      eq(contacts.userId, userId)
    )
  });
}
```

### 4. Data Creation Updates

When creating new records, always include `orgId`:

```typescript
// Example: creating a contact
export async function createContact(userId: string, data: InsertContact) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  });
  
  return db.insert(contacts).values({
    ...data,
    userId,
    orgId: user.orgId
  });
}
```

## Benefits of This Approach

1. **Future-Proof**: Database is ready for multi-tenancy from day one
2. **No Refactoring**: When adding multi-tenant features, only UI changes needed
3. **Data Integrity**: All data properly associated with organizations
4. **Simple Migration**: Moving to true multi-tenancy requires minimal code changes

## Quick Start Checklist

- [ ] Run `npm run db:push` to create all tables
- [ ] Run seed script to create default organization
- [ ] Update `ensure-user-exists.ts` to assign orgId: 1
- [ ] Update all INSERT queries to include orgId
- [ ] Update all SELECT queries to filter by orgId

## Testing Multi-Tenancy

Even in single-tenant mode, test that:

1. All new users get `orgId: 1`
2. All created records have `orgId: 1`
3. Queries properly filter by organization
4. No cross-organization data leakage

## Future Considerations

When implementing true multi-tenancy:

1. Add organization switcher UI
2. Implement organization creation flow
3. Add user invitation system
4. Update billing to be organization-based
5. Add organization-level settings and permissions