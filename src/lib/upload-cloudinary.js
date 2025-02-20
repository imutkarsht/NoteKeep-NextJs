import { cloudinary } from '@/lib/cloudinary'; 

const uploadToCloudinary = (fileUri, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: 'auto',
        filename_override: fileName,
        folder: 'notekeep-images', 
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

export default uploadToCloudinary
