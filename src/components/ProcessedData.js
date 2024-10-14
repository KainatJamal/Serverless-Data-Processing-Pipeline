import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

const ProcessedData = () => {
  const [data, setData] = useState([]);

  // Function to format file size
  const formatFileSize = (size) => {
    if (!size) {
      return 'Unknown size';  // Handle cases where size is undefined
    }

    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`; // Format size
  };

  useEffect(() => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    // Sort the files by date in descending order
    const sortedFiles = uploadedFiles.sort((a, b) => new Date(b.date) - new Date(a.date));
    setData(sortedFiles);
  }, []);

  return (
    <div className="main-content processed-data">
      <h1>Processed Data</h1>
      <ul className="file-list">
        {data.map((file, index) => (
          <li key={index} className="file-item">
            <a href={`YOUR_BACKEND_API_URL/download/${file.name}`} download className="file-name">
              {file.name}
            </a>
            <div className="file-info">
              <span className="file-date">{new Date(file.date).toLocaleString()}</span>
              <span className="file-size">
                {file.size ? formatFileSize(file.size) : 'Unknown size'}  {/* Handle undefined size */}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessedData;