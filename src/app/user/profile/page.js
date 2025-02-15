'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pencil } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const { loggedUser } = useUser();

  const handleSave = () => {
    toast.info("comming soon..., feature in development")
  };

  return (
    <div className="max-w-lg mt-2 mx-auto p-6">
      <Card className="shadow-md rounded-xl">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={loggedUser?.avatar} alt={loggedUser?.name} />
            <AvatarFallback>
              {loggedUser?.name
                .split(' ')
                .map((e) => e.charAt(0))}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold">
              {loggedUser?.name}
            </CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {loggedUser?.email}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <Input
                value={loggedUser.name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
                placeholder="Full Name"
              />
              <Input
                value={loggedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
                placeholder="Email Address"
              />

              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="outline"
                className="mt-4 w-full flex items-center gap-2"
                onClick={() => setEditing(true)}
              >
                <Pencil className="w-4 h-4" /> Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
