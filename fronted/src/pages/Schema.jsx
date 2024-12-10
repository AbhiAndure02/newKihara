import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function Schema() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // For modal data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getregister');
        setData(response.data.registerData);
        setFilteredData(response.data.registerData);
      } catch (error) {
        console.error("Error getting register:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleShowModal = (item) => {
    setSelectedItem(item); // Set selected item for the modal
  };

  const handleCopy = () => {
    const formattedData = `
    Application ID: ${selectedItem.applicationId}
    Name: ${selectedItem.name}
    Number: ${selectedItem.number}
    Registration Number: ${selectedItem.rNumber}
    Vehicle Name: ${selectedItem.vName}
    Bank Name: ${selectedItem.bank}
    1st EMI: ${new Date(selectedItem.femi).getDate()}/${new Date(selectedItem.femi).getMonth() + 1}/${new Date(selectedItem.femi).getFullYear()}
    ROI: ${selectedItem.roi}
    Flat: ${selectedItem.flat}
    Loan Amount: ${selectedItem.lAmount}
    LPI: ${selectedItem.lpi}
    Motor Insurance: ${selectedItem.moter}
    Admin: ${selectedItem.admin}
    Total Loan Amount: ${selectedItem.tloanamount}
    PF: ${selectedItem.pf}
    VC: ${selectedItem.vc}
    SD: ${selectedItem.sd}
    Document: ${selectedItem.document}
    LI: ${selectedItem.li}
    Other: ${selectedItem.other}
    Total Deductions: ${selectedItem.deduction}
    Net Disbursements: ${selectedItem.netdesb}
    RTO Status: ${selectedItem.rStatus}
    Loan Type: ${selectedItem.lType}
  `;
  

    navigator.clipboard.writeText(formattedData)
      .then(() => {
        alert(`Data for ${selectedItem.name} copied to clipboard!`);
        setSelectedItem(null); // Close modal after copying
      })
      .catch(err => console.error('Failed to copy data:', err));
  };

  const handleSearch = (term) => {
    const filtered = term
      ? data.filter(item =>
          item.name.toLowerCase().includes(term.toLowerCase()) ||
          item.applicationId.toLowerCase().includes(term.toLowerCase())
        )
      : data;
    setFilteredData(filtered);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div key={item._id} className="flex justify-between border p-3 mb-3 rounded shadow-sm mt-5">
            <div>
              <h1 className="text-xl font-bold">{item.name}</h1>
              <p className="text-gray-600">Application ID: {item.applicationId}</p>
            </div>
            <button
              onClick={() => handleShowModal(item)} // Open modal with item data
              className="p-3 bg-blue-600 px-10 rounded-xl text-white font-semibold"
            >
              Show
            </button>
          </div>
        ))
      ) : (
        <p className="text-center">No data available</p>
      )}

      {/* Modal Component */}
      {selectedItem && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">{selectedItem.name}</h2>
      <div className="grid grid-cols-2 gap-3 bg-gray-100 p-4 rounded-md max-h-60 overflow-y-auto text-sm">
        <p><span className="font-semibold">Application ID:</span> {selectedItem.applicationId}</p>
        <p><span className="font-semibold">Number:</span> {selectedItem.number}</p>
        <p><span className="font-semibold">Registration Number:</span> {selectedItem.rNumber}</p>
        <p><span className="font-semibold">Vehicle Name:</span> {selectedItem.vName}</p>
        <p><span className="font-semibold">Bank Name:</span> {selectedItem.bank}</p>
        <p><span className="font-semibold">1st EMI:</span> {new Date(selectedItem.femi).toLocaleDateString()}</p>
        <p><span className="font-semibold">ROI:</span> {selectedItem.roi}</p>
        <p><span className="font-semibold">Flat:</span> {selectedItem.flat}</p>
        <p><span className="font-semibold">Loan Amount:</span> {selectedItem.lAmount}</p>
        <p><span className="font-semibold">LPI:</span> {selectedItem.lpi}</p>
        <p><span className="font-semibold">Motor Insurance:</span> {selectedItem.moter}</p>
        <p><span className="font-semibold">Admin:</span> {selectedItem.admin}</p>
        <p><span className="font-semibold">Total Loan Amount:</span> {selectedItem.tloanamount}</p>
        <p><span className="font-semibold">PF:</span> {selectedItem.pf}</p>
        <p><span className="font-semibold">VC:</span> {selectedItem.vc}</p>
        <p><span className="font-semibold">SD:</span> {selectedItem.sd}</p>
        <p><span className="font-semibold">Document:</span> {selectedItem.document}</p>
        <p><span className="font-semibold">LI:</span> {selectedItem.li}</p>
        <p><span className="font-semibold">Other:</span> {selectedItem.other}</p>
        <p><span className="font-semibold">Total Deductions:</span> {selectedItem.deduction}</p>
        <p><span className="font-semibold">Net Disbursements:</span> {selectedItem.netdesb}</p>
        <p><span className="font-semibold">RTO Status:</span> {selectedItem.rStatus}</p>
        <p><span className="font-semibold">Loan Type:</span> {selectedItem.lType}</p>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={() => setSelectedItem(null)}
          className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
        >
          Close
        </button>
        <button
          onClick={handleCopy}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Schema;
