'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Bug, Send } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { toast } from 'react-toastify';

const BugReport = ({ user }) => {
  const [bugType, setBugType] = useState('ui');
  const [bugSeverity, setBugSeverity] = useState('normal');
  const [bugDescription, setBugDescription] = useState('');
  const [bugPage, setBugPage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendReport = async () => {
    if (!bugPage || !bugDescription) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/user/report-bug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportedBy: user?.id,
          bugType:bugType,
          severity: bugSeverity,
          pageOrFeature: bugPage,
          description: bugDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Bug report submitted successfully!');
      setBugPage('');
      setBugDescription('');
      setBugType('ui');
      setBugSeverity('normal');
    } catch (error) {
      toast.error(error.message || 'Failed to submit bug report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white/10 dark:bg-zinc-800/70 rounded-lg">
      <h2 className="text-2xl font-semibold text-teal-500 flex items-center gap-2">
        <Bug size={22} />
        Report a Bug
      </h2>

      <div className="space-y-2">
        <label className="text-sm text-zinc-700 dark:text-zinc-300">
          Bug Type
        </label>
        <Select onValueChange={setBugType} value={bugType}>
          <SelectTrigger className="w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-md">
            <SelectValue placeholder="Select bug type" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-200 dark:bg-zinc-800">
            <SelectItem value="ui">UI Bug</SelectItem>
            <SelectItem value="feature">Feature Bug</SelectItem>
            <SelectItem value="performance">Performance Issue</SelectItem>
            <SelectItem value="suggestion">Suggestion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-700 dark:text-zinc-300">
          Bug Severity
        </label>
        <Select onValueChange={setBugSeverity} value={bugSeverity}>
          <SelectTrigger className="w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-md">
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-200 dark:bg-zinc-800">
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="major">Major</SelectItem>
            <SelectItem value="app-breaking">App Breaking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-700 dark:text-zinc-300">
          Page or Feature
        </label>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-md"
          placeholder="Where did you find the issue?"
          value={bugPage}
          onChange={(e) => setBugPage(e.target.value)}
        />
      </div>

      {/* Bug Description */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-700 dark:text-zinc-300">
          Bug Description
        </label>
        <textarea
          className="w-full p-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-md resize-none"
          rows="4"
          placeholder="Describe the issue in detail..."
          value={bugDescription}
          onChange={(e) => setBugDescription(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSendReport}
        disabled={loading}
        className="w-full bg-teal-500 hover:bg-teal-400 text-white flex items-center gap-2"
      >
        {loading ? 'Submitting...' : <Send size={18} />}
        {loading ? '' : 'Submit Bug Report'}
      </Button>
    </div>
  );
};

export default BugReport;
