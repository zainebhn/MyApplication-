// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function APICallsChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// Combine the components you want to export as default
export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <APICallsChartSkeleton />
      </div>
    </>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-4`}>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="py-3 px-6">
              <div className="h-4 w-24 rounded-md bg-gray-300"></div>
            </th>
            <th className="py-3 px-6">
              <div className="h-4 w-32 rounded-md bg-gray-300"></div>
            </th>
            <th className="py-3 px-6">
              <div className="h-4 w-32 rounded-md bg-gray-300"></div>
            </th>
            <th className="py-3 px-6">
              <div className="h-4 w-32 rounded-md bg-gray-300"></div>
            </th>
            <th className="py-3 px-6">
              <div className="h-4 w-32 rounded-md bg-gray-300"></div>
            </th>
            <th className="py-3 px-6">
              <div className="h-4 w-16 rounded-md bg-gray-300"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-6">
                <div className="h-4 w-24 rounded-md bg-gray-200"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-32 rounded-md bg-gray-200"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-32 rounded-md bg-gray-200"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-32 rounded-md bg-gray-200"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-32 rounded-md bg-gray-200"></div>
              </td>
              <td className="py-3 px-6">
                <div className="h-4 w-16 rounded-md bg-gray-200"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
