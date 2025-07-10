-- ==============================================
-- New Era Connect Database Schema
-- Run this in your Supabase SQL Editor
-- ==============================================

-- Create ENUMs
CREATE TYPE card_status AS ENUM ('processing', 'completed', 'failed', 'pending_review', 'user_verified');
CREATE TYPE email_status AS ENUM ('draft', 'sent_to_gmail', 'sent', 'failed');

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Users table (synced from Clerk)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    org_id INTEGER REFERENCES organizations(id),
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    description TEXT,
    industry TEXT,
    location TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Business Cards table
CREATE TABLE IF NOT EXISTS business_cards (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    event_id INTEGER REFERENCES events(id),
    storage_path TEXT NOT NULL,
    status card_status DEFAULT 'processing' NOT NULL,
    ocr_data JSONB,
    confidence_score NUMERIC(5, 2),
    uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    processed_at TIMESTAMPTZ
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    event_id INTEGER REFERENCES events(id),
    card_id INTEGER REFERENCES business_cards(id),
    full_name TEXT NOT NULL,
    company TEXT,
    title TEXT,
    phone TEXT,
    email TEXT,
    ocr_confidence NUMERIC(5, 2),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    verified_by TEXT REFERENCES users(id),
    linkedin_url TEXT,
    website TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_org_email UNIQUE(org_id, email)
);

-- Lead Groups table
CREATE TABLE IF NOT EXISTS lead_groups (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Lead Group Contacts junction table
CREATE TABLE IF NOT EXISTS lead_group_contacts (
    lead_group_id INTEGER NOT NULL REFERENCES lead_groups(id) ON DELETE CASCADE,
    contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    PRIMARY KEY (lead_group_id, contact_id)
);

-- Email Templates table
CREATE TABLE IF NOT EXISTS email_templates (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_org_template_name UNIQUE(org_id, name)
);

-- Gmail Connections table
CREATE TABLE IF NOT EXISTS gmail_connections (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) UNIQUE,
    email TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    token_expiry TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    connected_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    last_sync_at TIMESTAMPTZ
);

-- Email Drafts table
CREATE TABLE IF NOT EXISTS email_drafts (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    contact_id INTEGER NOT NULL REFERENCES contacts(id),
    template_id INTEGER REFERENCES email_templates(id),
    lead_group_id INTEGER REFERENCES lead_groups(id),
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    status email_status DEFAULT 'draft' NOT NULL,
    gmail_draft_id TEXT,
    sent_to_gmail_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Daily Stats table (for analytics)
CREATE TABLE IF NOT EXISTS daily_stats (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    date DATE NOT NULL,
    cards_uploaded INTEGER DEFAULT 0,
    contacts_created INTEGER DEFAULT 0,
    contacts_verified INTEGER DEFAULT 0,
    drafts_generated INTEGER DEFAULT 0,
    drafts_sent_to_gmail INTEGER DEFAULT 0,
    emails_sent INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_org_date UNIQUE(org_id, date)
);

-- Activity Logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id INTEGER,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_org_id ON events(org_id);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_business_cards_status ON business_cards(status);
CREATE INDEX IF NOT EXISTS idx_contacts_org_id ON contacts(org_id);
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_company ON contacts(company);
CREATE INDEX IF NOT EXISTS idx_contacts_full_name ON contacts(full_name);
CREATE INDEX IF NOT EXISTS idx_lead_groups_org_id ON lead_groups(org_id);
CREATE INDEX IF NOT EXISTS idx_email_drafts_status ON email_drafts(status);
CREATE INDEX IF NOT EXISTS idx_daily_stats_org_date ON daily_stats(org_id, date);
CREATE INDEX IF NOT EXISTS idx_activity_logs_org_user ON activity_logs(org_id, user_id, created_at);

-- Insert default organization
INSERT INTO organizations (id, name) 
VALUES (1, 'Default Organization')
ON CONFLICT (id) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Default organization (ID: 1) has been created.';
  RAISE NOTICE 'All new users will be automatically assigned to this organization.';
END $$;