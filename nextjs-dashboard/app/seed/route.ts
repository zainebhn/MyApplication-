import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users } from '../lib/placeholder-data'; // Import users data only
import { DailyApiCalls, ApiCallStatuses, MostUsedApi, LeastUsedApi } from '../lib/definitions';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone_number VARCHAR(20) NOT NULL,
      password_hash TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT false,
      is_admin BOOLEAN NOT NULL DEFAULT false,
      is_validated BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, first_name, last_name, email, phone_number, password_hash, is_active, is_admin, is_validated)
        VALUES (${user.id}, ${user.first_name}, ${user.last_name}, ${user.email}, ${user.phone_number}, ${hashedPassword}, ${user.is_active}, ${user.is_admin}, ${user.is_validated})
        ON CONFLICT (email) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedApiMetrics() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS api_calls (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      api_name VARCHAR(255) NOT NULL,
      status VARCHAR(10) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await client.sql`
    CREATE TABLE IF NOT EXISTS daily_api_calls (
      date DATE PRIMARY KEY,
      total_calls INT NOT NULL
    );
  `;

  await client.sql`
    CREATE TABLE IF NOT EXISTS api_call_statuses (
      status VARCHAR(10) PRIMARY KEY,
      count INT NOT NULL
    );
  `;

  await client.sql`
    CREATE TABLE IF NOT EXISTS most_used_apis (
      api_name VARCHAR(255) PRIMARY KEY,
      call_count INT NOT NULL
    );
  `;

  await client.sql`
    CREATE TABLE IF NOT EXISTS least_used_apis (
      api_name VARCHAR(255) PRIMARY KEY,
      call_count INT NOT NULL
    );
  `;

  // Optionally, you can insert some initial data here if needed.

  return {
    apiCalls: 'API calls table seeded',
    dailyApiCalls: 'Daily API calls table seeded',
    apiCallStatuses: 'API call statuses table seeded',
    mostUsedApis: 'Most used APIs table seeded',
    leastUsedApis: 'Least used APIs table seeded',
  };
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedApiMetrics();
    await client.sql`COMMIT`;

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }));
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error('Seeding Error:', error);
    return new Response(JSON.stringify({ error: 'Database seeding failed' }), { status: 500 });
  } finally {
    client.release(); // Ensure the client is released after the transaction.
  }
}
