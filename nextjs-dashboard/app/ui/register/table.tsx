import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { User } from '@/app/lib/definitions'; // Ensure this is the correct path

export default function UsersTable({
  users = [], // Default to an empty array if users is undefined
}: {
  users?: User[]; // Make users optional
}) {
  if (!Array.isArray(users)) {
    return <p>Error: Users data is not available.</p>;
  }

  return (
    <div className="w-full">
      
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              {/* Mobile view */}
              <div className="md:hidden">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{`${user.first_name} ${user.last_name}`}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Status</p>
                        <p className="font-medium">
                          {user.is_active ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Admin</p>
                        <p className="font-medium">
                          {user.is_admin ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>User ID: {user.id}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop view */}
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Admin
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      User ID
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {users.map((user) => (
                    <tr key={user.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{`${user.first_name} ${user.last_name}`}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.is_active ? 'Active' : 'Inactive'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.is_admin ? 'Yes' : 'No'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {user.id}
                      </td>
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
