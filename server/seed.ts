import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '@new-era-connect/shared';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  console.log('Seeding database...');
  
  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql, { 
    schema: { users } 
  });

  try {
    // Create default user
    const result = await db.insert(users).values({
      id: 1,
      email: 'user@newera-connect.com',
      firstName: 'Default',
      lastName: 'User',
      imageUrl: null,
    }).onConflictDoNothing().returning();

    if (result.length > 0) {
      console.log('✅ Default user created');
    } else {
      console.log('ℹ️  Default user already exists');
    }

    // Update the sequence for the users table's ID
    await sql`SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1))`;
    console.log('✅ User ID sequence updated.');

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

seed().catch((err) => {
  console.error('Seed script failed!');
  console.error(err);
  process.exit(1);
});