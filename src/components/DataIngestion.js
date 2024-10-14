import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const DataIngestion = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileSize, setFileSize] = useState('');
  const navigate = useNavigate();

  // Function to format file size
  const formatFileSize = (size) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setStatusMessage('');
    setProgress(0);
    setUploadComplete(false);

    if (selectedFile) {
      const formattedSize = formatFileSize(selectedFile.size);
      setFileSize(formattedSize);
    } else {
      setFileSize('');
    }
  };
  const handleUpload = async () => {
    if (!file) {
      setStatusMessage('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      await axios.post('http://localhost:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        }
      });
  
      // Store original size for analytics
      localStorage.setItem('processedFileSizeBytes', file.size); // Use processe
      
      // Update the total file count and data volume
      const totalProcessedFiles = parseInt(localStorage.getItem('totalProcessedFiles')) || 0;
      localStorage.setItem('totalProcessedFiles', totalProcessedFiles + 1);
      
      const totalDataVolume = parseInt(localStorage.getItem('totalDataVolume')) || 0;
      localStorage.setItem('totalDataVolume', totalDataVolume + file.size); // Update total data volume
      
      const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
      const newFile = { name: file.name, date: new Date().toISOString(), size: file.size };
      uploadedFiles.push(newFile);
      localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  
      setStatusMessage('File uploaded successfully!');
      setUploadComplete(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatusMessage(error.response?.data || error.message);
    }
  };  

  const handleProceed = () => {
    navigate('/serverless-functions', { state: { file, fileSize } });
  };

  return (
    <div className="main-content">
      <div className="data-ingestion-container">
        <h1>Data Ingestion and Processing</h1>
        <div className="upload-section">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
        {file && (
          <p className="file-details">
            <strong>File selected:</strong> {file.name} ({fileSize})
          </p>
        )}
        {progress > 0 && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}
        {statusMessage && <p className="status-message">{statusMessage}</p>}
        {uploadComplete && (
          <button onClick={handleProceed} className="proceed-button">
            Proceed to Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DataIngestion;