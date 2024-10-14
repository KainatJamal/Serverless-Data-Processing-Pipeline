import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const ServerlessFunctions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, fileSize } = location.state || { file: null, fileSize: '0 Bytes' };

  const fileName = file ? file.name : 'logfile.csv';
  const [status, setStatus] = useState([
    { name: `Parsing ${fileName}...`, status: 'Pending' },
    { name: `Filtering ${fileName}...`, status: 'Pending' },
    { name: `Aggregating ${fileName}...`, status: 'Pending' },
  ]);

  useEffect(() => {
    const updateStatus = () => {
      setTimeout(() => {
        setStatus((prevStatus) =>
          prevStatus.map((item, index) => {
            if (index === 0) return { ...item, status: 'Completed' };
            if (index === 1) return { ...item, status: 'In Progress' };
            return item;
          })
        );
      }, 1000);

      setTimeout(() => {
        setStatus((prevStatus) =>
          prevStatus.map((item, index) => {
            if (index === 1) return { ...item, status: 'Completed' };
            if (index === 2) return { ...item, status: 'In Progress' };
            return item;
          })
        );
      }, 3000);

      setTimeout(() => {
        setStatus((prevStatus) =>
          prevStatus.map((item, index) => {
            if (index === 2) return { ...item, status: 'Completed' };
            return item;
          })
        );
      }, 5000);
    };

    updateStatus();
  }, [fileName]);

  const handleOpenDataStorage = () => {
    // Navigate to DataStorage and pass file + fileSize
    navigate('/data-storage', { state: { file, fileSize } });
  };

  const allCompleted = status.every((item) => item.status === 'Completed');

  return (
    <div className="main-content">
      <div className="serverless-functions-container">
        <h1>Serverless Functions</h1>
        <ul className="functions-list">
          {status.map((item, index) => (
            <li key={index} className="function-item">
              {item.name}
              <span className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>
                Status: {item.status}
              </span>
            </li>
          ))}
        </ul>

        {allCompleted && (
          <>
            <p>
              <strong>File Name:</strong> {fileName} <br />
              <strong>File Size:</strong> {fileSize}
            </p>
            <button onClick={handleOpenDataStorage} className="proceed-button">
              Proceed to Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ServerlessFunctions;