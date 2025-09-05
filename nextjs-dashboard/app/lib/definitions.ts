// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  is_active: boolean;
  is_admin: boolean;
  is_validated: boolean;
  created_at: string;
};

export type APICall = {
  id: string;
  api_name: string;
  status: 'success' | 'failure';
  created_at: string;
};

export type DailyApiCalls = {
  [date: string]: number;
};

export type ApiCallStatuses = {
  success: number;
  failure: number;
};

export type MostUsedApi = {
  api_name: string;
  callCount: number;
};

export type LeastUsedApi = {
  api_name: string;
  callCount: number;
};

export type APICallSummary = {
  date: string;
  totalCalls: number;
  successCalls: number;
  failureCalls: number;
};

// Define the type for API Call Data used in the chart
export type ApiCallData = {
  date: string;
  count: number;
};

