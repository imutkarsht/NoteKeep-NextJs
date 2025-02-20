'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CameraIcon, File, Upload, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function UploadPopup({ user }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
      setUploadError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      toast.warn('Please select a file.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      if (user?.avatar) {
        await fetch('/api/user/delete-avatar', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: user?.avatar }),
        });
      }

      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed. Please try again.');
      }

      const data = await response.json();
      const uploadedImageUrl = data.imgUrl;

      setImageUrl(uploadedImageUrl);
      toast.success('File uploaded successfully!');

      const updateResponse = await fetch(
        `/api/user/update-avatar/${user?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl: uploadedImageUrl }),
        }
      );

      const updateData = await updateResponse.json();

      if (updateResponse.ok) {
        toast.success('Profile Picture Updated successfully!');
        window.location.reload();
      } else {
        throw new Error(updateData.message || 'Failed to update profile.');
      }
    } catch (error) {
      setUploadError(error.message);
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CameraIcon size={32} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] dark:bg-zinc-900 bg-white rounded-xl shadow-xl p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold">
            Change Profile Picture
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Upload an image of your choice to personalize your profile.
          </DialogDescription>
        </DialogHeader>

        {/* Profile Picture Preview */}
        <div className="flex flex-col items-center space-y-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded file"
              className="w-24 h-24 rounded-full border-2 border-teal-400 shadow-md object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
              <CameraIcon size={32} />
            </div>
          )}

          {/* File Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-3 w-full"
          >
            <input
              type="file"
              id="fileInput"
              className=""
              onChange={handleFileChange}
            />

            {/* Choose File Button */}
            <label htmlFor="fileInput" className="w-full flex justify-center">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-2 border-teal-500 px-4 py-2 rounded-lg text-teal-500 hover:bg-teal-500 hover:text-white transition"
              >
                <File size={18} />
                Choose File
              </Button>
            </label>

            {/* Upload Button */}
            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-400 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition"
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Upload size={18} />
              )}
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </form>

          {/* Error Message */}
          {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
