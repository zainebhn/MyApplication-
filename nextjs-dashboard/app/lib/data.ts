import { sql } from '@vercel/postgres';
import {
  DailyApiCalls,
  ApiCallStatuses,
  MostUsedApi,
  LeastUsedApi,
  APICallSummary,
  User,
} from './definitions';
import { formatDateToLocal } from './utils';
import { ApiCallData, UserData } from './definitions';

// Fetch API call summary for the dashboard
export async function fetchApiCallSummary() {
  try {
    const data = await sql<APICallSummary[]>`
      SELECT
        DATE(created_at) AS date,
        COUNT(*) AS total_calls,
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS success_calls,
        SUM(CASE WHEN status = 'failure' THEN 1 ELSE 0 END) AS failure_calls
      FROM api_calls
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch API call summary.');
  }
}

// Fetch daily API call counts
export async function fetchDailyApiCalls() {
  try {
    const data = await sql<DailyApiCalls[]>`
      SELECT
        DATE(created_at) AS date,
        COUNT(*) AS call_count
      FROM api_calls
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
    `;

    const dailyApiCalls: DailyApiCalls = {};
    data.rows.forEach(row => {
      dailyApiCalls[formatDateToLocal(row.date)] = row.call_count;
    });

    return dailyApiCalls;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch daily API calls.');
  }
}

// Fetch API call statuses
export async function fetchApiCallStatuses() {
  try {
    const data = await sql<ApiCallStatuses[]>`
      SELECT
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS success,
        SUM(CASE WHEN status = 'failure' THEN 1 ELSE 0 END) AS failure
      FROM api_calls
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch API call statuses.');
  }
}

// Fetch most used APIs
export async function fetchMostUsedApis() {
  try {
    const data = await sql<MostUsedApi[]>`
      SELECT
        api_name AS api_name,
        COUNT(*) AS call_count
      FROM api_calls
      GROUP BY api_name
      ORDER BY call_count DESC
      LIMIT 10
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch most used APIs.');
  }
}

// Fetch least used APIs
export async function fetchLeastUsedApis() {
  try {
    const data = await sql<LeastUsedApi[]>`
      SELECT
        api_name AS api_name,
        COUNT(*) AS call_count
      FROM api_calls
      GROUP BY api_name
      ORDER BY call_count ASC
      LIMIT 10
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch least used APIs.');
  }
}

// Fetch users
export async function fetchUsers() {
  try {
    // Assume this is your data fetching logic
    const response = await fetch('/api/users');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Database Error:', error);
    return null; // Instead of throwing an error, return null
  }
}

// Fetch users with pagination
export async function fetchUsersPages(query: string, page: number, pageSize: number = 10): Promise<User[]> {
  try {
    const offset = (page - 1) * pageSize;
    const data = await sql<User[]>`
      SELECT
        id,
        first_name,
        last_name,
        email,
        phone_number,
        is_active,
        is_admin,
        is_validated,
        created_at
      FROM users
      WHERE first_name ILIKE ${'%' + query + '%'} OR last_name ILIKE ${'%' + query + '%'}
      ORDER BY created_at DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users with pagination.');
  }
}

// Dummy data for card components (example purposes)
export async function fetchCardData() {
  return {
    dailyApiCalls: 100,
    successes: 80,
    failures: 20,
    mostUsedApis: ['API 1', 'API 2'],
    leastUsedApis: ['API 66', 'API 80'],
  };
}

// Fetch API calls data for chart
export async function fetchApiCallsChartData(): Promise<{ labels: string[], counts: number[] }> {
  const rawData: ApiCallData[] = [
    { date: '2024-01-01', count: 10 },
    { date: '2024-02-01', count: 20 },
  ];

  const labels = rawData.map(item => item.date);
  const counts = rawData.map(item => item.count);

  return { labels, counts };
}
