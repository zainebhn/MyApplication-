import Form from '@/app/ui/users/edit-form';
import Breadcrumbs from '@/app/ui/users/breadcrumbs';
import { fetchUsers, fetchDailyApiCalls } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { users as placeholderUsers, apiCalls as placeholderApiCalls } from '@/app/lib/placeholder-data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  let user = null;
  let apiCalls = null;

  try {
    // Attempt to fetch users and API calls
    const [usersData, apiCallsData] = await Promise.all([
      fetchUsers(),
      fetchDailyApiCalls(),
    ]);

    // Find the specific user by ID
    user = usersData.find((u: any) => u.id === id);
    apiCalls = apiCallsData;

    // If the user is not found in the fetched data, return a 404
    if (!user) {
      return notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);

    // If fetching fails, use placeholder data
    user = placeholderUsers.find((u: any) => u.id === id) || placeholderUsers[0];
    apiCalls = placeholderApiCalls;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Edit user',
            href: `/dashboard/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form users={user} apicalls={apiCalls} />
    </main>
  );
}

