import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ReviewTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden">
        <TableHeader className="bg-zinc-200 dark:bg-zinc-800 text-teal-700 dark:text-teal-300">
          <TableRow>
            <TableHead className="p-3 text-left">Reviewer</TableHead>
            <TableHead className="p-3 text-left">Review</TableHead>
            <TableHead className="p-3 text-left">Stars</TableHead>
            <TableHead className="p-3 text-left">Visibility</TableHead>
            <TableHead className="p-3 text-left">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.reviews.map((review) => (
            <TableRow
              key={review._id}
              className="border-b border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <TableCell className="p-3">
                <div>
                  <p className="font-semibold">
                    {review.reviewBy.firstName} {review.reviewBy.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.reviewBy.email}
                  </p>
                </div>
              </TableCell>
              <TableCell className="p-3">{review.review}</TableCell>
              <TableCell className="p-3">{review.stars} ⭐</TableCell>
              <TableCell className="p-3">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${
                    review.isVisible
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {review.isVisible ? 'Visible' : 'Hidden'}
                </span>
              </TableCell>
              <TableCell className="p-3">
                {new Date(review.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewTable;
