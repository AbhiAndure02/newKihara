import { Link } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';


function MiniNavBar() {
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
    <div className='bg-white text-[#1974A6] flex gap-6 text-xl font-semibold ml-2'>
        <div>

        <Link to=''>Home</Link>
        </div>
        <Link to='register'>New Application</Link>
        <Link to='scheme'>Scheme</Link>
        <CSVLink
          data={csvData}
          filename="report.csv"
          className="rounded "
          target="_blank"
        >
          Download Report
        </CSVLink>        
      
    </div>
  )
}

export default MiniNavBar
