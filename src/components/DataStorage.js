import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage, firestore } from './firebaseConfig';
import { doc, updateDoc, increment } from 'firebase/firestore';
import '../styles/styles.css';

const DataStorage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || { file: null };

  const [progress, setProgress] = useState(0); // Track the upload progress
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!file) {
      setUploadError(true);
      setErrorMessage('No file provided. Please go back to the previous page.');
      return;
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(`Uploading file: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress); // Update the progress
        console.log(`Upload is ${progress}% done`);

        // Check if upload is complete
        if (progress === 100) {
          setUploadSuccess(true); // Set success message on complete
        }
      },
      (error) => {
        console.error('Upload failed:', error);
        setUploadError(true);
        setErrorMessage(error.message || 'An unknown error occurred.');
      },
      () => {
        // Upload complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          getMetadata(uploadTask.snapshot.ref).then((metadata) => {
            console.log("Uploaded file metadata:", metadata);
            const calculatedFileSize = metadata.size / (1024 * 1024);
            localStorage.setItem('processedFileSize', calculatedFileSize.toFixed(2));

            const fileCountRef = doc(firestore, 'fileStats', 'count');
            updateDoc(fileCountRef, { count: increment(1) })
              .then(() => {
                console.log('File count updated successfully!');
              })
              .catch((error) => {
                console.error('Error updating file count:', error);
                setUploadError(true);
                setErrorMessage('File uploaded, but failed to update file count.');
              });
          })
          .catch((error) => {
            console.error('Error getting metadata:', error);
            setErrorMessage('Failed to retrieve metadata. Upload may be incomplete.');
            setUploadError(true);
          });
        });
      }
    );
  }, [file]);

  const handleAnalyticsRedirect = () => {
    navigate('/analytics');
  };

  return (
    <div className="main-content">
      <div className="data-storage-container">
        <h1>Data Storage</h1>

        {/* Progress bar will be shown only while uploadSuccess is false */}
        {!uploadSuccess && (
          <div className="progress-bar-container">
            <label>Upload Progress: {Math.round(progress)}%</label>
            <progress value={progress} max="100"></progress>
          </div>
        )}

        {/* Success message will be shown after the upload completes */}
        {uploadSuccess && (
          <>
            <p className="success-message">File uploaded successfully: <strong>{file.name}</strong></p>
            <button className="proceed-button" onClick={handleAnalyticsRedirect}>View Analytics</button>
          </>
        )}

        {/* Error message for upload failure */}
        {uploadError && (
          <p className="error-message">File upload failed: <strong>{errorMessage}</strong>. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default DataStorage;