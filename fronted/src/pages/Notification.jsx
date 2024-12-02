import React, { useEffect, useState } from 'react';
import daysBetweenDatesIST from '../helper/timeCalculator';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotificationsCount } from '../redux/notification/notificationSlice';
import monthBetweenDtaseIST from '../helper/monthCalculator';

const Notification = () => {

  const dispatch = useDispatch();


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const registerData = async () => {
      try {
        const response = await axios.get('/api/getregister');
        setData(response.data.registerData);
        setFilteredData(response.data.registerData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    registerData();
  }, []);

  // Filter data where showNotification is true
  const notifications = filteredData.filter(item => {
    const daysAgo = item.createdDate ? daysBetweenDatesIST(item.createdDate) : 0;
    const monthAgo = item.femi ? monthBetweenDtaseIST(item.femi) : 0;
    console.log(monthAgo);
    return monthAgo >=9 || (daysAgo > 29 && item.rStatus === 'In Process');
  });

  

  // Update the notification count when `notifications` changes
  useEffect(() => {
    // Fetch and filter notifications...
    dispatch(setNotificationsCount(notifications.length)); // Set the count
  }, [notifications]);


  const handleSearch = (term) => {
    if (term === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.applicationId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  if (loading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <p className='text-red-800'>{error}</p>
      </div>
    );
  }

  return (
    <div className='p-4 w-full bg-slate-100'>
      <Header onSearch={handleSearch} />
    {/* Display notification count */}

      {notifications.length > 0 ? (
        notifications.map((item) => {
          const daysAgo = item.createdDate ? daysBetweenDatesIST(item.createdDate) : "Invalid date";
          const monthAgo = item.femi ? monthBetweenDtaseIST(item.femi) : "Invalid date";

          return (
            <div key={item._id} className='flex flex-col gap-5 mb-2 w-full'>
              <Link to={`/register/${item.slug}`}>
                <div className='bg-white shadow-sm rounded-md mt-2 shadow-black w-full flex justify-between p-2'>
                  <div className='px-2 py-3'>
                    <h1>{item.name}</h1>
                  </div>
                  <div className='px-2 py-3'>
                    {
                      item.rStatus === 'In Process' && (
                        <p>Your RTO status is in process for <span className='text-red-500'>{daysAgo}</span> days</p>
                      )
                    }
                    <p>First EMI date is <span className='text-red-500'>{monthAgo}</span> months ago</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <div className='flex h-[550px] justify-center items-center'>
        
        <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
