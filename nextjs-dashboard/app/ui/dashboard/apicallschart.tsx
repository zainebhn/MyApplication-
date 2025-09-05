
"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { ApiCallData } from '@/app/lib/definitions';
import { fetchApiCallsChartData } from '@/app/lib/data';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const ApiCallsChart: React.FC = () => {
  const [apiCallsData, setApiCallsData] = useState<ApiCallData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApiCallsChartData();
        if (Array.isArray(data)) {
          setApiCallsData(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching API calls data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="mt-4 text-gray-400">Loading...</p>;
  }

  if (!Array.isArray(apiCallsData) || apiCallsData.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const { yAxisLabels, topLabel } = generateYAxis(apiCallsData);

  const chartData = {
    labels: apiCallsData.map((data) => data.date),
    datasets: [
      {
        label: 'API Calls',
        data: apiCallsData.map((data) => data.count),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        API Calls Over Time
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <Line data={chartData} />
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
};

export default ApiCallsChart;
