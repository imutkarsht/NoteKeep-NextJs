import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { Skeleton } from '../ui/skeleton';

const TableShimmer = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 4 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                <Skeleton className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                <Skeleton className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableShimmer;
