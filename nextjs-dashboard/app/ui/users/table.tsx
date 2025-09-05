import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { User } from '@/app/lib/definitions';

import { placeholderUsers } from '@/public/placeholder-users';

export default function UsersTable({
  users = placeholderUsers, // Use placeholder data if no users are passed
}: {
  users?: User[]; // `users` is optional, defaulting to `placeholderUsers`
}) {
  const safeUsers = users || [];

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Users
      </h1>
      <Search placeholder="Search users..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              {/* Mobile View */}
              <div className="md:hidden">
                {safeUsers.map((user) => (
                  <div key={user.id} className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p>{user.first_name} {user.last_name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Phone</p>
                        <p className="font-medium">{user.phone_number}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Status</p>
                        <p className="font-medium">{user.is_active ? 'Active' : 'Inactive'}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>Created At: {user.created_at}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop View */}
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Name</th>
                    <th scope="col" className="px-3 py-5 font-medium">Email</th>
                    <th scope="col" className="px-3 py-5 font-medium">Phone Number</th>
                    <th scope="col" className="px-3 py-5 font-medium">Status</th>
                    <th scope="col" className="px-4 py-5 font-medium">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {safeUsers.map((user) => (
                    <tr key={user.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm sm:pl-6">
                        <p>{user.first_name} {user.last_name}</p>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{user.email}</td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{user.phone_number}</td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{user.is_active ? 'Active' : 'Inactive'}</td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{user.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}