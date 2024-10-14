import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'; // Check this path
import ProcessedData from './components/ProcessedData';
import Analytics from './components/Analytics';
import DataIngestion from './components/DataIngestion';
import DataStorage from './components/DataStorage';
import Orchestration from './components/Orchestration';
import ServerlessFunction from './components/ServerlessFunctions';
import Settings from './components/Settings';
import './styles/styles.css'; // Import your styles

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/processed-data" element={<ProcessedData />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/data-ingestion" element={<DataIngestion />} />
            <Route path="/data-storage" element={<DataStorage />} />
            <Route path="/orchestration" element={<Orchestration />} />
            <Route path="/serverless-functions" element={<ServerlessFunction />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;