import React from 'react';
import '../styles/styles.css'; // Import CSS file

const Orchestration = () => {
  return (
    <div className="main-content">
      <h1>Orchestration</h1>
      <div className="pipeline">
        <div className="step">
          <h3>Step 1</h3>
          <p>Ingest Data</p>
        </div>
        <div className="step">
          <h3>Step 2</h3>
          <p>Validate Data</p>
        </div>
        <div className="step">
          <h3>Step 3</h3>
          <p>Parse & Filter Data</p>
        </div>
        <div className="step">
          <h3>Step 4</h3>
          <p>Transform Data</p>
        </div>
        <div className="step">
          <h3>Step 5</h3>
          <p>Analyze Data</p>
        </div>
        <div className="step">
          <h3>Step 6</h3>
          <p>Store Processed Data</p>
        </div>
        
        <div className="step">
          <h3>Step 8</h3>
          <p>Monitor & Manage</p>
        </div>
      </div>
    </div>
  );
};

export default Orchestration;