'use client';
import BugTable from '@/components/admin/BugTable';
import ReviewTable from '@/components/admin/ReviewTable';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Reviews = () => {
  const [data, setData] = useState({ reviews: [], bugReports: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/all-reviews');
        if (!response.ok)
          throw new Error('Failed to fetch reviews & bug reports');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error('Invalid Response Format');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" transition-all duration-300">
      <h1 className="text-3xl font-semibold mb-6 text-teal-500 dark:text-teal-400">
        Manage Reviews & Bug Reports
      </h1>

      {loading ? (
        <div className="text-teal-600 dark:text-teal-300 text-lg">
          Loading data...
        </div>
      ) : (
        <>
          {/* Reviews Table */}
          <h2 className="text-2xl font-semibold my-4 text-teal-600 dark:text-teal-300">
            Reviews
          </h2>
          {data.reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No reviews found.
            </p>
          ) : (
            <ReviewTable data={data} />
          )}

          {/* Bug Reports Table */}
          <h2 className="text-2xl font-semibold my-4 text-rose-600 dark:text-rose-300">
            Bug Reports
          </h2>
          {data.bugReports.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No bug reports found.
            </p>
          ) : (
            <BugTable data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default Reviews;
