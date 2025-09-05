import Pagination from '@/app/ui/users/pagination'; // Assuming you have pagination for users
import Search from '@/app/ui/search';
import Table from '@/app/ui/register/table'; // Assuming you have a table for users
import { lusitana } from '@/app/ui/fonts';
import { UsersTableSkeleton } from '@/app/ui/skeletons'; // Assuming you have a skeleton for users table
import { Suspense } from 'react';
import { fetchUsers, fetchUsersPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUsers(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
        {/* The CreateUser component has been removed */}
      </div>
      <Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
