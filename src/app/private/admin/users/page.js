import UserTable from '@/components/admin/UserTable';
import React from 'react'

const ManageUsers = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Users Management</h1>
      <UserTable />
    </div>
  );
}

export default ManageUsers