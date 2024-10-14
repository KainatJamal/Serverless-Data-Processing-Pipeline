import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('/dashboard'); // Set default active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Update the active link state
  };

  return (
    <div className="sidebar">
      <h2>Data Pipeline</h2>
      <ul>
        <li>
          <Link 
            to="/dashboard" 
            onClick={() => handleLinkClick('/dashboard')}
            className={activeLink === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/data-ingestion" 
            onClick={() => handleLinkClick('/data-ingestion')}
            className={activeLink === '/data-ingestion' ? 'active' : ''}
          >
            Data Ingestion
          </Link>
        </li>
        <li>
          <Link 
            to="/serverless-functions" 
            onClick={() => handleLinkClick('/serverless-functions')}
            className={activeLink === '/serverless-functions' ? 'active' : ''}
          >
            Serverless Functions
          </Link>
        </li>
        <li>
          <Link 
            to="/data-storage" 
            onClick={() => handleLinkClick('/data-storage')}
            className={activeLink === '/data-storage' ? 'active' : ''}
          >
            Data Storage
          </Link>
        </li>
        <li>
          <Link 
            to="/processed-data" 
            onClick={() => handleLinkClick('/processed-data')}
            className={activeLink === '/processed-data' ? 'active' : ''}
          >
            Processed Data
          </Link>
        </li>
        <li>
          <Link 
            to="/analytics" 
            onClick={() => handleLinkClick('/analytics')}
            className={activeLink === '/analytics' ? 'active' : ''}
          >
            Analytics
          </Link>
        </li>
        <li>
          <Link 
            to="/orchestration" 
            onClick={() => handleLinkClick('/orchestration')}
            className={activeLink === '/orchestration' ? 'active' : ''}
          >
            Orchestration
          </Link>
        </li>
        <li>
          <Link 
            to="/settings" 
            onClick={() => handleLinkClick('/settings')}
            className={activeLink === '/settings' ? 'active' : ''}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;