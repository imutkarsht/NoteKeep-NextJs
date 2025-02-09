'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trash, Eye, NotebookText } from 'lucide-react';
import Link from 'next/link';
import TableShimmer from '@/components/admin/TableShimmer';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserContext';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedUser } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/all');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();

        if (data.success && data.users.accounts) {
          setUsers(data.users.accounts);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`/api/user/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');

      toast.success('User deleted successfully');
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAdminRight = async (id) => {
    try {
      const response = await fetch(`/api/user/isadmin/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to update role');

      const data = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: data.user.role } : user
        )
      );

      toast.success(`User role updated to ${data.user.role}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-4 max-w-fit bg-zinc-50 dark:bg-zinc-900 rounded-md border-2 border-zinc-200 dark:border-zinc-700 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>

      {loading ? (
        <TableShimmer />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Join Time</TableHead>
              <TableHead>Admin Right</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={user.avatar || '/default-avatar.png'}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((letter) => letter.charAt(0).toUpperCase())}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleTimeString()}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/private/admin/users/${user.id}`}>
                      <Eye className="w-4 h-4 mr-1" /> Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/private/admin/users/${user.id}/notes`}>
                      <NotebookText className="w-4 h-4 mr-1" /> Notes
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    disabled={loggedUser?.id === user.id}
                  >
                    <Trash className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </TableCell>
                <TableCell>
                  {user.role === 'admin' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleAdminRight(user.id)}
                      disabled={loggedUser?.id === user.id}
                    >
                      Revoke
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
                      onClick={() => handleAdminRight(user.id)}
                    >
                      Grant
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserTable;
