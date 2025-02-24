import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const BugTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden">
        <TableHeader className="bg-zinc-200 dark:bg-zinc-800 text-rose-700 dark:text-rose-300">
          <TableRow>
            <TableHead className="p-3 text-left">Reporter</TableHead>
            <TableHead className="p-3 text-left">Bug Type</TableHead>
            <TableHead className="p-3 text-left">Severity</TableHead>
            <TableHead className="p-3 text-left">Page / Feature</TableHead>
            <TableHead className="p-3 text-left">Description</TableHead>
            <TableHead className="p-3 text-left">Status</TableHead>
            <TableHead className="p-3 text-left">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.bugReports.map((bug) => (
            <TableRow
              key={bug._id}
              className="border-b border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <TableCell className="p-3">
                <div>
                  <p className="font-semibold">
                    {bug.reportedBy.firstName} {bug.reportedBy.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {bug.reportedBy.email}
                  </p>
                </div>
              </TableCell>
              <TableCell className="p-3">{bug.bugType}</TableCell>
              <TableCell className="p-3">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${
                    bug.severity === 'minor'
                      ? 'bg-yellow-500 text-white'
                      : bug.severity === 'major'
                        ? 'bg-orange-500 text-white'
                        : 'bg-red-500 text-white'
                  }`}
                >
                  {bug.severity}
                </span>
              </TableCell>
              <TableCell className="p-3">{bug.pageOrFeature}</TableCell>
              <TableCell className="p-3">{bug.description}</TableCell>
              <TableCell className="p-3">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${
                    bug.status === 'Open'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {bug.status}
                </span>
              </TableCell>
              <TableCell className="p-3">
                {new Date(bug.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BugTable;
