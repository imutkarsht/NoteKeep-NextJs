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
import {
  Trash,
  Eye,
  NotebookText,
  Verified,
  MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import TableShimmer from '@/components/admin/TableShimmer';
import { toast } from 'react-toastify';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

const UserTable = ({ loggedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/all-users');
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
      const response = await fetch(`/api/admin/delete/${id}`, {
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
      const response = await fetch(`/api/admin/isadmin/${id}`, {
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
        <p className="text-center text-zinc-500">No users found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Join Time</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Admin Right</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div className="relative flex items-start">
                      <Avatar className="relative">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map((letter) => letter.charAt(0))}
                        </AvatarFallback>
                      </Avatar>
                      {user?.isVerified && (
                        <Verified
                          size={16}
                          className="dark:text-white text-black ml-2"
                        />
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleTimeString()}
                </TableCell>
                <TableCell className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-44 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    >
                      <DropdownMenuItem
                        asChild
                        className="flex items-center gap-2 px-4 py-2 rounded-md dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                      >
                        <Link
                          href={`/private/admin/users/${user.id}`}
                          className="flex items-center w-full"
                        >
                          <Eye className="w-4 h-4" /> Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="flex items-center gap-2 px-4 py-2 rounded-md dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                      >
                        <Link
                          href={`/private/admin/users/${user.id}/notes`}
                          className="flex items-center w-full"
                        >
                          <NotebookText className="w-4 h-4" /> Notes
                        </Link>
                      </DropdownMenuItem>
                      <div className="border-t border-zinc-200 dark:border-zinc-700 my-1"></div>
                      <DropdownMenuItem
                        className="flex items-center gap-2 px-4 py-2 rounded-md dark:bg-zinc-800 text-red-600 dark:hover:text-red-200 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer"
                        onClick={() => handleDelete(user.id)}
                        disabled={loggedUser?.id === user.id}
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
