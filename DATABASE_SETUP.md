# Database Setup Guide

## Overview

New Era Connect uses PostgreSQL (via Supabase) with Drizzle ORM for type-safe database operations. The schema supports multi-tenancy, comprehensive analytics tracking, and all features required for the business card management system.

## Prerequisites

1. Supabase account and project created
2. `.env` file with `DATABASE_URL` configured
3. Node.js and npm installed

## Initial Setup

### 1. Install Dependencies

The required dependencies should already be installed, but if not:

```bash
npm install
```

### 2. Configure Environment Variables

Ensure your `.env` file contains:

```env
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
```

For Supabase, this will look like:
```env
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### 3. Apply Database Schema

There are two ways to apply the schema:

#### Option A: Direct Push (Recommended for Development)

This directly applies the schema to your database:

```bash
npm run db:push
```

#### Option B: Generate Migrations (Recommended for Production)

Generate migration files first:

```bash
npm run db:generate
```

Then apply migrations:

```bash
npm run db:migrate
```

### 4. Verify Setup

Open Drizzle Studio to view your database:

```bash
npm run db:studio
```

## Schema Overview

### Core Tables

1. **organizations** - Multi-tenancy support
2. **users** - Synced from Clerk authentication
3. **events** - Conferences and networking events
4. **business_cards** - Uploaded card images with OCR data
5. **contacts** - Extracted contact information
6. **lead_groups** - Contact grouping for campaigns
7. **email_templates** - Email campaign templates
8. **email_drafts** - Generated email drafts
9. **gmail_connections** - OAuth tokens for Gmail integration

### Analytics Tables

1. **daily_stats** - Aggregated metrics for dashboard
2. **activity_logs** - Detailed activity tracking

### Key Features

- **Multi-tenancy**: All data is isolated by organization
- **Status Tracking**: Business cards and emails have detailed status enums
- **Verification Workflow**: Contacts can be marked as verified with OCR confidence scores
- **Audit Trail**: Created/updated timestamps and user tracking

## Working with the Schema

### Adding New Tables

1. Update `shared/schema.ts` with your new table definition
2. Add appropriate Zod schemas and TypeScript types
3. Run `npm run db:push` to apply changes

### Modifying Existing Tables

1. Update the table definition in `shared/schema.ts`
2. Generate a migration: `npm run db:generate`
3. Review the generated migration in `server/drizzle/`
4. Apply migration: `npm run db:migrate`

## Common Commands

```bash
# Push schema changes directly (dev)
npm run db:push

# Generate migration files
npm run db:generate

# Apply migrations
npm run db:migrate

# Open database browser
npm run db:studio
```

## Troubleshooting

### Connection Issues

- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Ensure your IP is whitelisted (if applicable)

### Schema Conflicts

- Use `db:push` with caution in production
- Always review generated migrations before applying
- Keep backups before major schema changes

### TypeScript Errors

- Ensure all packages are installed
- Run `npm install` in both root and shared directories
- Restart TypeScript language server in your editor

## Next Steps

1. Apply the schema using `npm run db:push`
2. Start developing features using the type-safe Drizzle queries
3. Use `db:studio` to inspect and manage data during development