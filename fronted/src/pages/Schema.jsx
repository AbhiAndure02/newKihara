import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function Schema() {
  const [data, setData] = useState([]); // Initialize as an array
  const [filteredData, setFilteredData] = useState([]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getregister');
        setData(response.data.registerData); // Access the specific array in response
        setFilteredData(response.data.registerData);
        console.log(response.data);
      } catch (error) {
        console.error("Error getting register:", error.message); // Improved error logging
      }
    };
    fetchData();
  }, []);

  // Function to copy specific item data to clipboard
  const handleCopy = (item) => {
    const formattedData = `
    Application ID: ${item.applicationId}
    Name: ${item.name}
    Number: ${item.number}
    Registration Number: ${item.rNumber}
    Vehicle Name: ${item.vName}
    bank Name: ${item.bank}
    1st EMI: ${new Date(item.femi).getDate()}/${new Date(item.femi).getMonth()+1}/${new Date(item.femi).getFullYear()}
    ROI: ${item.roi}
    flat: ${item.flat}
    Loan Amount: ${item.lAmount}
    LPI: ${item.lpi}
    Moter Insurence: ${item.moter}
    Admin: ${item.admin}
    Total Loan Amount: ${item.tloanamount}
    pf: ${item.pf}
    Vc: ${item.vc}
    sd: ${item.sd}
    Document: ${item.document}
    LI: ${item.li}
    Other: ${item.other}
    Total Deductions: ${item.deduction}
    Net Disbursements: ${item.netdesb}
    Rto Status: ${item.rStatus}
    Loan Type: ${item.lType}
    `;

    // Use Clipboard API to copy formatted data
    navigator.clipboard.writeText(formattedData)
      .then(() => {
        alert(`Data for ${item.name} copied to clipboard!`);
      })
      .catch(err => {
        console.error('Failed to copy data:', err);
      });
  };


  const handleSearch = (term) => {
    if (term === '') {
      setFilteredData(data); // Reset to all data if search term is empty
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()) || 
        item.applicationId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };


  return (
    <div>
            <Header onSearch={handleSearch} />
      {data.length > 0 ? (
        filteredData.map((item) => (
          <div key={item._id} className="flex justify-between border p-3 mb-3 rounded shadow-sm mt-5">
            <div>
              <h1 className="text-xl font-bold">{item.name}</h1>
              <p className="text-gray-600">Application ID: {item.applicationId}</p>
            </div>
            <div>
              <button
                onClick={() => handleCopy(item)} // Pass specific item to copy function
                className="p-3 bg-blue-600 px-10 rounded-xl text-white font-semibold"
              >
                Copy
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No data available</p> 
      )}
    </div>
  );
}

export default Schema;
