import {
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data'; 

const iconMap = {
  totalCalls: PhoneIcon,
  successCalls: CheckCircleIcon,
  failureCalls: XCircleIcon,
  mostUsedApi: StarIcon,
  leastUsedApi: ArrowDownIcon,
};

export default async function ApiCallsCards() {
  const {
    dailyApiCalls,
    successes,
    failures,
    mostUsedApis,
    leastUsedApis,
  } = await fetchCardData();

  return (
    <>
      <Card title="Total API Calls" value={dailyApiCalls} type="totalCalls" />
      <Card title="Successful Calls" value={successes} type="successCalls" />
      <Card title="Failed Calls" value={failures} type="failureCalls" />
      <Card title="Most Used API" value={mostUsedApis} type="mostUsedApi" />
      <Card title="Least Used API" value={mostUsedApis} type="leastUsedApi" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'totalCalls' | 'successCalls' | 'failureCalls' | 'mostUsedApi' | 'leastUsedApi';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
