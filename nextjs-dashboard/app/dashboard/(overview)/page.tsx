import { Card } from '@/app/ui/dashboard/cards';
import ApiCallsChart from '@/app/ui/dashboard/apicallschart';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchApiCallsChartData } from '@/app/lib/data';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import Link from 'next/link';
import Breadcrumbs from '@/app/ui/users/breadcrumbs';

export default async function Page() {
  const apiCallsData = await fetchApiCallsChartData();

  const {
    dailyApiCalls,
    successes,
    failures,
    mostUsedApis,
    leastUsedApis,
  } = await fetchCardData();

  return (
    <main className="p-6 space-y-8">
      <header className="mb-8">
        <h1 className={`${lusitana.className} text-3xl font-bold`}>Dashboard</h1>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Dashboard', href: '/dashboard', active: true },
          ]}
        />
      </header>
      
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">API Call Statistics</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium mb-4">Most Used APIs</h3>
            <ul>
              {mostUsedApis.map(api => (
                <li key={api.id}>{api.api_name}: {api.callCount} calls</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-medium mb-4">Least Used APIs</h3>
            <ul>
              {leastUsedApis.map(api => (
                <li key={api.id}>{api.api_name}: {api.callCount} calls</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">API Calls Chart</h2>
        <Suspense fallback={<CardsSkeleton />}>
          <ApiCallsChart />
        </Suspense>
      </section>
      
      
    </main>
  );
}
