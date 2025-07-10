import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { organizations } from '@new-era-connect/shared';
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
    schema: { organizations } 
  });

  try {
    // Create default organization
    const result = await db.insert(organizations).values({
      id: 1,
      name: 'Default Organization'
    }).onConflictDoNothing().returning();

    if (result.length > 0) {
      console.log('✅ Default organization created');
    } else {
      console.log('ℹ️  Default organization already exists');
    }

    // This is the fix:
    // Manually update the sequence for the organizations table's ID.
    // This prevents primary key conflicts when the next organization is created automatically.
    await sql`SELECT setval('organizations_id_seq', COALESCE((SELECT MAX(id) FROM organizations), 1))`;
    console.log('✅ Organization ID sequence updated.');

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