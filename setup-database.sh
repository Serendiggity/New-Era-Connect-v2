#!/bin/bash

echo "🚀 Setting up New Era Connect Database..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your DATABASE_URL"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL" .env; then
    echo "❌ Error: DATABASE_URL not found in .env!"
    echo "Please add your Supabase DATABASE_URL to the .env file"
    exit 1
fi

echo "✅ Environment variables found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Push schema to database
echo "🔨 Creating database tables..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to create database tables"
    exit 1
fi

echo ""

# Seed the database
echo "🌱 Seeding database with default organization..."
npm run db:seed

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to seed database"
    exit 1
fi

echo ""
echo "✅ Database setup complete!"
echo ""
echo "You can now:"
echo "  - Run 'npm run dev' to start the development server"
echo "  - Run 'npm run db:studio' to view your database"
echo ""