import { APICall, DailyApiCalls, ApiCallStatuses, MostUsedApi, LeastUsedApi, APICallSummary } from './definitions';

// Format date to local string
export const formatDateToLocal = (dateStr: string, locale: string = 'en-US') => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

// Generate Y-axis labels for charts
export const generateYAxis = (data: { value: number }[] = []) => {
  const yAxisLabels: string[] = [];

  // Ensure data is an array and not empty
  if (Array.isArray(data) && data.length > 0) {
    const highestRecord = Math.max(...data.map(item => item.value));
    const topLabel = Math.ceil(highestRecord / 1000) * 1000;

    for (let i = topLabel; i >= 0; i -= 1000) {
      yAxisLabels.push(`$${i / 1000}K`);
    }
  } else {
    // Handle cases where data is empty or not an array
    yAxisLabels.push('$0K');
  }

  return { yAxisLabels, topLabel: yAxisLabels.length ? parseInt(yAxisLabels[0].replace('$', '').replace('K', '')) * 1000 : 0 };
};

// Generate pagination numbers
export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

// Calculate daily API calls
export const calculateDailyApiCalls = (apiCalls: APICall[]): DailyApiCalls => {
  const dailyCalls: DailyApiCalls = {};

  apiCalls.forEach(call => {
    const date = new Date(call.created_at).toISOString().split('T')[0];
    if (dailyCalls[date]) {
      dailyCalls[date]++;
    } else {
      dailyCalls[date] = 1;
    }
  });

  return dailyCalls;
};

// Calculate API call statuses
export const calculateApiCallStatuses = (apiCalls: APICall[]): ApiCallStatuses => {
  const statuses: ApiCallStatuses = { success: 0, failure: 0 };

  apiCalls.forEach(call => {
    if (call.status === 'success') {
      statuses.success++;
    } else if (call.status === 'failure') {
      statuses.failure++;
    }
  });

  return statuses;
};

// Calculate most used APIs
export const calculateMostUsedApis = (apiCalls: APICall[]): MostUsedApi[] => {
  const apiUsage: { [key: string]: number } = {};

  apiCalls.forEach(call => {
    if (apiUsage[call.api_name]) {
      apiUsage[call.api_name]++;
    } else {
      apiUsage[call.api_name] = 1;
    }
  });

  return Object.entries(apiUsage).map(([api_name, callCount]) => ({
    api_name,
    callCount
  })).sort((a, b) => b.callCount - a.callCount);
};

// Calculate least used APIs
export const calculateLeastUsedApis = (apiCalls: APICall[]): LeastUsedApi[] => {
  const apiUsage: { [key: string]: number } = {};

  apiCalls.forEach(call => {
    if (apiUsage[call.api_name]) {
      apiUsage[call.api_name]++;
    } else {
      apiUsage[call.api_name] = 1;
    }
  });

  return Object.entries(apiUsage).map(([api_name, callCount]) => ({
    api_name,
    callCount
  })).sort((a, b) => a.callCount - b.callCount);
};

// Calculate API call summary for a specific date
export const calculateApiCallSummary = (apiCalls: APICall[], date: string): APICallSummary => {
  const filteredCalls = apiCalls.filter(call => {
    const callDate = new Date(call.created_at).toISOString().split('T')[0];
    return callDate === date;
  });

  const totalCalls = filteredCalls.length;
  const successCalls = filteredCalls.filter(call => call.status === 'success').length;
  const failureCalls = filteredCalls.filter(call => call.status === 'failure').length;

  return {
    date,
    totalCalls,
    successCalls,
    failureCalls
  };
};
