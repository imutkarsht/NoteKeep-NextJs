'use client';
import TableShimmer from '@/components/admin/TableShimmer';
import UserTable from '@/components/admin/UserTable';
import { useUser } from '@/context/UserContext';
import React from 'react';

const ManageUsers = () => {
  const { loggedUser, fetchingLoggedUser } = useUser();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold mb-4">Users Management</h1>
        {fetchingLoggedUser ? (
          <TableShimmer />
        ) : (
          <UserTable loggedUser={loggedUser} />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
