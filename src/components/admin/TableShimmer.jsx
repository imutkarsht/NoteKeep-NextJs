import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { motion } from 'framer-motion';

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
              <motion.div
                className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </TableCell>
            <TableCell>
              <motion.div
                className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </TableCell>
            <TableCell>
              <motion.div
                className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <motion.div
                  className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <motion.div
                  className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <motion.div
                  className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableShimmer;
