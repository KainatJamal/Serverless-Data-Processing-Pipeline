import React, { useEffect, useState } from 'react';
import '../styles/styles.css'; // Import CSS file

const Analytics = () => {
    const [fileSize, setFileSize] = useState(0);
    const [fileSizeUnit, setFileSizeUnit] = useState('Bytes'); // State to store unit
    const [processingTime, setProcessingTime] = useState(0);

    // Helper function to convert file size and determine the appropriate unit
    const formatFileSize = (sizeInBytes) => {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let size = sizeInBytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return { size: size.toFixed(2), unit: units[unitIndex] }; // Return the size and its corresponding unit
    };

    useEffect(() => {
        // Retrieve values from localStorage on page load
        const storedFileSizeBytes = localStorage.getItem('processedFileSizeBytes'); // Use the same key for original size in bytes
        const storedProcessingTime = localStorage.getItem('processingTime');

        console.log(`Stored File Size (Bytes): ${storedFileSizeBytes}`); // Log the raw stored value
        console.log(`Stored Processing Time: ${storedProcessingTime}`); // Log the stored processing time

        if (storedFileSizeBytes) {
            const parsedSize = parseFloat(storedFileSizeBytes);
            console.log(`Parsed File Size: ${parsedSize}`); // Log the parsed size

            const { size, unit } = formatFileSize(parsedSize); // Format the size and get the unit
            setFileSize(size); // Set the formatted size
            setFileSizeUnit(unit); // Set the appropriate unit
        }

        if (storedProcessingTime) {
            setProcessingTime(parseFloat(storedProcessingTime));
        }
    }, []);

    return (
        <div className="main-content">
            <h1>Analytics</h1>
            <div className="report">
                <h2>Data Processing Time</h2>
                <p>Total Time: {processingTime} seconds</p> {/* Display time in seconds */}
            </div>
            <div className="report">
                <h2>Total Data Processed</h2>
                <p>Total Size: {fileSize} {fileSizeUnit}</p> {/* Display file size with dynamic unit */}
            </div>
        </div>
    );
};

export default Analytics;