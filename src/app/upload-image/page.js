'use client'

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }

      const data = await response.json();
      setImageUrl(data.imgUrl);
      setUploadError(null);
    } catch (error) {
      setUploadError('Failed to upload file.');
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {imageUrl && (
        <div>
          <p>File uploaded successfully:</p>
          <img src={imageUrl} alt="Uploaded file" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
    </div>
  );
};

export default UploadForm;
