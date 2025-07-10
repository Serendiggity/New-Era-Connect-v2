# Database Documentation

This directory contains all documentation related to the New Era Connect database implementation.

## Quick Links

- [Database Setup Guide](../../DATABASE_SETUP.md) - How to set up the database
- [Migration Strategy](../../MIGRATION_STRATEGY.md) - Path from single-user to multi-tenant
- [Implementation Summary](../../DATABASE_IMPLEMENTATION_SUMMARY.md) - Overview of what was implemented
- [SQL Schema](../../database-schema.sql) - Direct SQL for Supabase setup

## Key Concepts

### Multi-Tenancy
The database is designed for multi-tenancy from the start, but operates in single-tenant mode initially with all users assigned to a default organization (ID: 1).

### Schema Location
The actual schema definitions are in `shared/schema.ts` using Drizzle ORM.

### Status Tracking
Business cards and emails use proper enums for workflow status tracking:
- Card Status: `processing`, `completed`, `failed`, `pending_review`, `user_verified`
- Email Status: `draft`, `sent_to_gmail`, `sent`, `failed`

### Analytics
Built-in analytics tables track daily statistics and detailed activity logs for comprehensive reporting.