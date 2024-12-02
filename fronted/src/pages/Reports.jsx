import axios from 'axios';
import { Label, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv'; // Import CSVLink
import banks from '../helper/bankName';

const Reports = () => {
  const [warning, setWarning] = useState("");
  const [data, setData] = useState([]);
  const [report, setReport] = useState("");
  const [bankName, setBankName] = useState("");

  const handleProceed = (e) => {
    e.preventDefault();
    if (report === "tpe") {
      setWarning("Please select a Type");
    } else if (report === "bank" && !bankName) {
      setWarning("Please select a bank name");
    } else {
      setWarning(""); // Clear warning if everything is fine
      // Proceed with the logic
    }
  };

  useEffect(() => {
    const registerData = async () => {
      try {
        const response = await axios.get('/api/getregister');
        setData(response.data.registerData || []); // Access the `registerData` array from the response
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.log("Error fetching data:", error);
        setWarning("Failed to fetch data. Please try again."); // User-friendly message
      }
    };
    registerData();
  }, []);

  // Prepare CSV data
  const csvData = data.map(item => ({
    id: item.id,
    name: item.name,
    amount: Number(item.lAmount) || 0, // Convert to number
  }));

  // Calculate total amount
  const totalAmount = csvData.reduce((acc, item) => acc + (item.amount || 0), 0);
  
  // Add total amount as the last row
  if (totalAmount > 0) {
    csvData.push({ id: 'Total', name: '', amount: totalAmount });
  }

  return (
    <>
      <div className='flex w-[50%] justify-center pl-10 mx-10 mt-5 flex-col'>
        <Label htmlFor='datatype' className='p-2 text-md' value='Select Report By' />
        <Select id='datatype' name='datatype' required onChange={(e) => setReport(e.target.value)}>
          <option value='tpe'>Select Type</option>
          <option value='bank'>By Bank Name</option>
          <option value='byperson'>By Person</option>
          <option value='month'>By Month</option>
        </Select>
      </div> 
      <div className='flex w-[50%] justify-center pl-10'>
        {
          report === 'bank' && (
            <div className='w-[50%] justify-center pl-10 m-10 flex'>
              <Label htmlFor='bank' className='p-2 text-md' value='Bank Name' />
              <Select 
                id='bank' 
                name='bank' 
                className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' 
                required 
                onChange={(e) => setBankName(e.target.value)}
              >
                <option value="">Select Bank</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.name}>{bank.name}</option>
                ))}
                <option value="other">Other</option>
              </Select>
            </div>
          )
        }
        <div className='flex flex-col gap-5'>
          <button className='h-10 bg-black text-white px-5 mt-10 rounded-md' onClick={handleProceed}>
            Process
          </button>
          <span className='text-red-500'>{warning}</span>

          {/* CSV Download Button */}
          <CSVLink
            data={csvData}
            filename={"report.csv"}
            className=' bg-green-600 text-white  py-5 mt-10 rounded-md'
            target="_blank"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
    </>
  );
};

export default Reports;
