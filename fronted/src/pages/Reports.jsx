import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import banks from '../helper/bankName';

const Reports = () => {
  const [warning, setWarning] = useState("");
  const [data, setData] = useState([]);
  const [report, setReport] = useState("");
  const [bankName, setBankName] = useState("");


  

  // Function to fetch all data
  const fetchAllData = async () => {
    try {
      const response = await axios.get('/api/getregister');
      setData(response.data.registerData || []);
      console.log("Fetched Data:", response.data); // Debugging log
    } catch (error) {
      console.log("Error fetching data:", error);
      setWarning("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllData(); // Initial data load
  }, []);

  // Prepare CSV data with all fields
  const csvData = data.map(item => ({
    name: item.name,
    amount: Number(item.lAmount) || 0,
    date: item.date, // Example field: Add more if necessary
    bank: item.bank 
  }));

  // Calculate total amount
  const totalAmount = csvData.reduce((acc, item) => acc + (item.amount || 0), 0);
  if (totalAmount > 0) {
    csvData.push({ id: 'Total', name: '', amount: totalAmount, date: '', bank: '' });
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Reports</h1>
      {warning && <p className="text-red-500">{warning}</p>}

      {/* CSV Download Button */}
      <div className="mt-4">
        <CSVLink
          data={csvData}
          filename="report.csv"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          target="_blank"
        >
          Download Report
        </CSVLink>
      </div>
    </div>
  );
};

export default Reports;
