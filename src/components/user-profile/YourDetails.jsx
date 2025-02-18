'use client';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { toast } from 'react-toastify';

const YourDetails = ({ user, isClicked }) => {
  const [firstName, setFirstName] = useState(user?.name.split(' ')[0]);
  const [lastName, setLastName] = useState(user?.name.split(' ')[1]);
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
    };

    try {
      const response = await fetch(`/api/user/update-user/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profile Updated Successfully');
        window.location.reload();
      } else {
        toast.error('Error updating User: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating Profile:', error);
      toast.warning('Something went wrong!');
    }
  };

  return (
    <div className="md:w-[50vw] w-[95vw] max-w-[95vw] lg:max-w-[40vw] h-auto p-6 rounded-lg shadow-lg bg-zinc-200 space-y-4 dark:bg-zinc-800">
      <h3 className="text-2xl font-semibold underline underline-offset-4 decoration-teal-500">
        Your Details
      </h3>

      <div className="space-y-3">
        <div className="flex items-center space-x-4 justify-start">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              disabled={!isClicked}
              onChange={(e) => setFirstName(e.target.value)}
              className="dark:bg-zinc-900"
              value={isClicked ? firstName : user?.name.split(' ')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              disabled={!isClicked}
              onChange={(e) => setLastName(e.target.value)}
              value={isClicked ? lastName : user?.name.split(' ')[1]}
              className="dark:bg-zinc-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user?.email}
            disabled
            className="dark:bg-zinc-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            disabled={!isClicked}
            value={user?.bio}
            placeholder="Tell us about yourself"
            className="dark:bg-zinc-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            disabled={!isClicked}
            className="dark:bg-zinc-900"
          />
        </div>
      </div>
      {isClicked && (
        <Button
          className="bg-teal-500 hover:bg-teal-400 dark:text-white w-full"
          onClick={handleUpdateUser}
        >
          Update Profile
        </Button>
      )}
    </div>
  );
};

export default YourDetails;
