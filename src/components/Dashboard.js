import React, { useEffect, useState } from 'react'; 
import '../styles/styles.css'; 
import { FaFileAlt, FaDatabase, FaFileUpload, FaCheckCircle } from 'react-icons/fa'; 
const Dashboard = () => {
  const [fileCount, setFileCount] = useState(0); 
  const [totalDataVolume, setTotalDataVolume] = useState(0); 
  const [recentActivity, setRecentActivity] = useState([]); 
  const formatFileSize = (size) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };
  useEffect(() => {
    const totalProcessedFiles = localStorage.getItem('totalProcessedFiles') || 0;
    setFileCount(parseInt(totalProcessedFiles)); 
    const totalDataVolume = localStorage.getItem('totalDataVolume') || 0;
    setTotalDataVolume(formatFileSize(parseInt(totalDataVolume))); 
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const sortedFiles = uploadedFiles.sort((a, b) => new Date(b.date) - new Date(a.date)); 
    const lastTwoFiles = sortedFiles.slice(0, 2); 
    setRecentActivity(lastTwoFiles); 
  }, []); 

  return (
    <div className="main-content dashboard">
      <h1>Dashboard</h1>
      <div className="summary">
        <div className="card">
          <FaFileAlt />
          <h2>Total Files Processed</h2>
          <p>{fileCount}</p> {/* Display the file count */}
        </div>
        <div className="card">
          <FaDatabase />
          <h2>Total Data Volume</h2>
          <p>{totalDataVolume}</p> {/* Display the formatted total data volume */}
        </div>
      </div>

      <div className="activity-feed">
        <h2>Recent Activity</h2>
        <ul>
          {recentActivity.map((file, index) => (
            <li key={index}>
              <FaFileUpload />
              File "{file.name}" uploaded at {new Date(file.date).toLocaleTimeString()} {/* Display upload time */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;