'use server';

import { sql } from '@vercel/postgres';
import { User, APICall, APICallSummary } from './definitions';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function registerUser(user: User) {
  try {
    const data = await sql`
      INSERT INTO users (first_name, last_name, email, phone_number, password, is_active, is_admin, is_validated)
      VALUES (${user.first_name}, ${user.last_name}, ${user.email}, ${user.phone_number}, ${user.password}, false, false, false)
      RETURNING id
    `;
    return data.rows[0].id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to register user.');
  }
}

export async function validateUser(userId: string, isValid: boolean) {
  try {
    await sql`
      UPDATE users
      SET is_validated = ${isValid}
      WHERE id = ${userId}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to validate user.');
  }
}

export async function assignAdmin(userId: string, isAdmin: boolean) {
  try {
    await sql`
      UPDATE users
      SET is_admin = ${isAdmin}
      WHERE id = ${userId}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to assign admin role.');
  }
}

export async function deleteUser(userId: string) {
  try {
    await sql`
      DELETE FROM users
      WHERE id = ${userId}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete user.');
  }
}

export async function logApiCall(apiCall: APICall) {
  try {
    await sql`
      INSERT INTO api_calls (id, api_name, status, created_at)
      VALUES (${apiCall.id}, ${apiCall.api_name}, ${apiCall.status}, ${apiCall.created_at})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to log API call.');
  }
}

export async function fetchApiCallSummary(): Promise<APICallSummary[]> {
  try {
    const data = await sql`
      SELECT
        DATE(created_at) AS date,
        COUNT(*) AS totalCalls,
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS successCalls,
        SUM(CASE WHEN status = 'failure' THEN 1 ELSE 0 END) AS failureCalls
      FROM api_calls
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
    `;
    
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch API call summary.');
  }
}export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}