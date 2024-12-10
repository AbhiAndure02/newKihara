import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, Modal, Select, Spinner, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from 'react-redux';



const DataPage = () => {
    const { slug } = useParams(); // Destructure the slug parameter
    const [registerData, setRegisterData] = useState(null); // State to store the product data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors
    const [openModal, setOpenModal] = useState(false);
    const [ConfirmDelete, setConfirmDelete] = useState(false)
    const [updateData, setUpdateData] = useState({});
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(updateData);
    };


   const handeleDelete = async(e) =>{
    e.preventDefault();
    try {
        const res = await axios.delete(`/api/deleteData/${registerData._id}`)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
   }

   const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`/api/registrations/${registerData._id}`, { ...updateData });
        alert('Update successful');
        setOpenModal(false);
    } catch (error) {
        console.log(error);
    }
};



    useEffect(() => {
        const getRegiData = async () => {
            setLoading(true)

            try {
                console.log(`Fetching product with slug: ${slug}`);
                const res = await axios.get(`/api/getregister?slug=${slug}`);
                console.log('Response data:', res.data);

                // Assuming your API returns a single item array for the specific slug
                if (res.data.registerData && res.data.registerData.length > 0) {
                    // Check if the slug in the response matches the requested slug
                    const filteredData = res.data.registerData.find(item => item.slug === slug);
                    if (filteredData) {
                        console.log("filteredData"+ filteredData)  // Log the fetched data
                        setRegisterData(filteredData); 
                        setLoading(false)

                        // Store the correct entry
                    } else {
                        setError('No products found for this slug');
                        setLoading(false)

                    }
                } else {
                    setError('No products found for this slug');
                    setLoading(false)

                }
            } catch (error) {
                console.error('Error fetching the product:', error);
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        getRegiData();
    }, [slug]);

    if (loading) {
        return (
        <div className='w-full h-screen flex justify-center items-center'>

            <Spinner size ='md' />
        </div>
        )
    }

  
    return (
        <div className='w-full h-screen flex justify-center bg-[#1974A6]'>
            {error && <p>{error}</p>} {/* Show error message if any */}
            {registerData ? ( // Check if registerData is not null
                <div className='w-[70%] mt-16 p-6 rounded-md text-md font-sans opacity-95 h-fit shadow-lg shadow-blue-400 bg-white'>
                    <h1 className='text-2xl text-black text-center font-bold p-4 mb-4'>Information </h1>
                    <div className='flex flex-wrap gap-10'>
                        <p>Name :{registerData.name}</p>
                        <p>Number: {registerData.number}</p>
                        <p>Vehicle Number: {registerData.rNumber}</p>
                        <p>Vehicle Name: {registerData.vName}</p>
                        <p>Bank Name : {registerData.bank}</p>
                        <p>Loan Amount : {registerData.lAmount}</p>
                        <p>Loan Type: {registerData.lType}</p>
                        <p>RTO Status: {registerData.rStatus}</p>
                        <p>Total Loan Amount: {registerData.tAmount}</p>

                       

                    </div>
                    <div className='w-full flex  gap-10 justify-center items-center'>
                        {
                            registerData.userId === currentUser._id ? 
                            (
                                <>
                               <Link to={`/update/${registerData.slug}`}>                               
                               <button className='mt-10 text-xl bg-black px-5 py-2 rounded-md text-white'>Update</button>
                               </Link> 
                                <button onClick={() => setConfirmDelete(true)} className='mt-10 text-xl bg-red-600 px-5 py-2 rounded-md text-white'>Delete</button>
                                
                                </>

                            ):
                            <p className='p-5 mt-8 text-red-500 text-xl'>You are not allow to update and delete</p>

                        }
                        

                    </div>


                </div>
            ) : (
                <p>No data found</p>
            )}

<Modal show={ConfirmDelete} size="md" onClose={() => setConfirmDelete(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handeleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setConfirmDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </div>
    );
}

export default DataPage;
