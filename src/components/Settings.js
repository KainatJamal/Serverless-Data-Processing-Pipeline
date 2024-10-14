import React, { useState } from 'react';
import '../styles/styles.css';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [maxFileSize, setMaxFileSize] = useState('10 GB');
  const [maxProcessingTime, setMaxProcessingTime] = useState('1 hour');

  const handleSaveChanges = () => {
    // Save the settings (you could save to local storage, an API, etc.)
    localStorage.setItem('emailNotifications', emailNotifications);
    localStorage.setItem('maxFileSize', maxFileSize);
    localStorage.setItem('maxProcessingTime', maxProcessingTime);
    alert('Settings saved!');
  };

  return (
    <div className="main-content">
      <div className="settings">
        <h1>Settings</h1>
        <h2>Processing Limits</h2>
        <label>
          Max File Size:
          <input 
            type="text" 
            value={maxFileSize} 
            onChange={(e) => setMaxFileSize(e.target.value)} 
          />
        </label>
        <label>
          Max Processing Time:
          <input 
            type="text" 
            value={maxProcessingTime} 
            onChange={(e) => setMaxProcessingTime(e.target.value)} 
          />
        </label>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;