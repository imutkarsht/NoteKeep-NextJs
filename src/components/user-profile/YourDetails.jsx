import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const YourDetails = ({user}) => {
  return (
    <div className="md:w-[50vw] w-[95vw] h-auto p-6 rounded-lg shadow-lg bg-zinc-200 space-y-4 dark:bg-zinc-800">
          <h3 className="text-2xl font-semibold underline underline-offset-4 decoration-teal-500">
            Your Details
          </h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-4 justify-start">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  disabled
                  className="dark:bg-zinc-900"
                  value = {user?.name.split(" ")[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  disabled
                  value = {user?.name.split(" ")[1]}
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
                disabled
                value = {user?.bio}
                placeholder="Tell us about yourself"
                className="dark:bg-zinc-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" disabled className="dark:bg-zinc-900" />
            </div>
          </div>
        </div>
  )
}

export default YourDetails