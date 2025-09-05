// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const users = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    password: 'password123',
    isActive: false,
    isAdmin: false,
    isValidated: false,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '987-654-3210',
    password: 'password456',
    isActive: false,
    isAdmin: false,
    isValidated: false,
  },
  
];

const apiCalls = [
  {
    id: '1',
    apiName: 'User Registration',
    status: 'success',
    createdAt: '2024-08-06T10:00:00Z',
  },
  {
    id: '2',
    apiName: 'User Validation',
    status: 'failure',
    createdAt: '2024-08-06T10:05:00Z',
  },

];


const dashboardMetrics = {
  dailyApiCalls: {
    '2024-08-05': 120,
    '2024-08-06': 95,
   
  },
  apiCallStatuses: {
    success: 80,
    failure: 15,
    
  },
  mostUsedApis: [
    { apiName: 'User Registration', count: 60 },
    { apiName: 'User Validation', count: 45 },
   
  ],
  leastUsedApis: [
    { apiName: 'Password Reset', count: 10 },
    { apiName: 'Account Deletion', count: 5 },
   
  ],
};

export { users, apiCalls, dashboardMetrics };
