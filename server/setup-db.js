const { execSync } = require('child_process');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('🔍 Checking environment...');

// Check if DATABASE_URL exists
if (process.env.DATABASE_URL) {
  console.log('✅ DATABASE_URL found!');
  console.log('📍 Database URL starts with:', process.env.DATABASE_URL.substring(0, 30) + '...');
} else {
  console.error('❌ DATABASE_URL not found in environment variables!');
  console.error('Please ensure your .env file contains DATABASE_URL');
  process.exit(1);
}

console.log('\n🚀 Running database setup...\n');

try {
  // Run drizzle-kit push
  console.log('Creating database tables...');
  execSync('drizzle-kit push', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('\n✅ Database tables created successfully!');
  
  // Run seed script
  console.log('\n🌱 Seeding database...');
  execSync('tsx seed.ts', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('\n✅ Database setup complete!');
  console.log('\nYou can now run "npm run dev" to start the application');
  
} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}