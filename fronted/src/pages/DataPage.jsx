import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
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

                        {
                            registerData.lType === 'Purchase' ? (
                                <>
                                    <p>RTO Charges : {registerData.prtoCharges}</p>
                                    <p>RTO Agent : {registerData.prtoAgent}</p>
                                    <p>Kiharas : {registerData.pkiharas}</p>
                                    <p>Customer Pay : {registerData.pcustomerPay}</p>
                                    <p>RTO Hold : {registerData.prHold}</p>
                                    <p>NOC Hold : {registerData.pnoc}</p>
                                    <p>Prve Bank : {registerData.ppBank}</p>
                                    <p>Net Pay To : {registerData.pnpt}</p>
                                    <p>FC Amount : {registerData.pfc}</p>




                                 
                                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        <h1 className='text-center mb-10 font-bold'>Purchase</h1>
                                        <Modal.Body>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div className='w-full flex flex-wrap justify-center items-center gap-5 mb-3'>

                                              
                                                <div className='flex flex-col'>
                                                    <Label htmlFor='rStatus' className='p-2 text-md' value='RTO Status *' />
                                                    <Select id='rStatus' name='rStatus' onChange={handleChange}>
                                                        <option value=''>RTO Status</option>
                                                        <option value='Not Applicable'>Not Applicable</option>
                                                        <option value='In Process'>In Process</option>
                                                        <option value='Completed'>Completed</option>
                                                        <option value='Hold'>Hold</option>
                                                    </Select>
                                                </div>
                                                <div className='flex flex-col w-[40%] gap-2'>
                                                    <label> RTO Charges</label>
                                                    <input type='text' placeholder='RTO Charges' name='prtoCharges' id='prtoCharges' className='p-1 rounded-md' onChange={handleChange} />
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label> RTO Agent</label>
                                                    <input type='text' placeholder='RTO Agent' name='prtoAgent' id='prtoAgent' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label> Kiharas</label>
                                                    <input type='text' placeholder='Kiharas' name='pkiharas' id='pkiharas' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Customer Pay </label>
                                                    <input type='text' placeholder='customer Pay' name='pcustomerPay' id='pcustomerPay'  className='p-1 rounded-md' onChange={handleChange} />
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>RTO Hold </label>
                                                    <input type='text' placeholder='RTO Hold' name='prHold' id='prHold'  className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Noc Hold </label>
                                                    <input type='text' placeholder='Noc Hold' name='pnoc' id='pnoc'  className='p-1 rounded-md' onChange={handleChange} />
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Prev Bank </label>
                                                    <input type='text' placeholder='Previous bank' name='ppBank' id='ppBank' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>
                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Net Pay to </label>
                                                    <input type='text' placeholder='Net Pay To' name='pnpt' id='pnpt' className='p-1 rounded-md' onChange={handleChange} />
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>FC Amount </label>
                                                    <input type='text' placeholder='FC Amount' name='pfc' id='pfc' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>
                                                </div>

                                                <div className='flex gap-3'>
                                                    <button onClick={handleUpdate} className='bg-green-600 px-3 py-2 rounded-md'>Update</button>
                                                    <button onClick={()=>setOpenModal(false)} className='bg-red-700 px-3 py-2 rounded-md'>cancel</button>
                                                </div>





                                            </div>

                                        </Modal.Body>
                                    </Modal>



                                </>
                            ) :
                                null
                        }


                        {
                            registerData.lType === 'BT Top Up' ? (
                                <>
                                    <p>RTO Charges: {registerData.brtoCharges2}</p>
                                    <p>RTO Agent : {registerData.brAgent}</p>
                                    <p>Kiharas : {registerData.bkiharas2}</p>
                                    <p>Customer Pay: {registerData.bcustomerPay2}</p>
                                    <p>RTO Hold: {registerData.brHold2}</p>
                                    <p>Other Amount: {registerData.boAmount}</p>
                                    <p>Prve Bank: {registerData.bpBank1}</p>
                                    <p>FC Amount:{registerData.bfc2}</p>



                                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        <h1 className='text-center mb-10 font-bold'> BT TOP UP</h1>
                                        <Modal.Body>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div className='w-full flex flex-wrap justify-center items-center gap-5 mb-3'>

                                              
                                                <div className='flex flex-col'>
                                                    <Label htmlFor='rStatus' className='p-2 text-md' value='RTO Status *' />
                                                    <Select id='rStatus' name='rStatus' onChange={handleChange}>
                                                        <option value=''>RTO Status</option>
                                                        <option value='Not Applicable'>Not Applicable</option>
                                                        <option value='In Process'>In Process</option>
                                                        <option value='Completed'>Completed</option>
                                                        <option value='Hold'>Hold</option>
                                                    </Select>
                                                </div>
                                                <div className='flex flex-col w-[40%] gap-2'>
                                                    <label> RTO Charges</label>
                                                    <input type='text' placeholder='RTO Charges' name='brtoCharges2' id='brtoCharges2' className='p-1 rounded-md' onChange={handleChange} />
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label> RTO Agent</label>
                                                    <input type='text' placeholder='RTO Agent' name='brAgent' id='brAgent' c className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label> Kiharas</label>
                                                    <input type='text' placeholder='Kiharas' name='bkiharas2' id='bkiharas2' c className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Customer Pay </label>
                                                    <input type='text' placeholder='customer Pay' name='bcustomerPay2' id='bcustomerPay2'  className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>RTO Hold </label>
                                                    <input type='text' placeholder='RTO Hold' name='brHold2' id='brHold2'  className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Other Amount </label>
                                                    <input type='text' placeholder='other Amount' name='boAmount' id='boAmount'  className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Prev Bank </label>
                                                    <input type='text' placeholder='Previous bank' name='bpBank1' id='bpBank1' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>FC Amount </label>
                                                    <input type='text' placeholder='FC Amount' name='bfc2' id='bfc2' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>
                                                </div>

                                                <div className='flex gap-3'>
                                                    <button onClick={handleUpdate} className='bg-green-600 px-3 py-2 rounded-md'>Update</button>
                                                    <button onClick={()=>setOpenModal(false)} className='bg-red-700 px-3 py-2 rounded-md'>cancel</button>
                                                </div>





                                            </div>

                                        </Modal.Body>
                                    </Modal>
                                </>

                            ) :
                                null
                        }
                        {
                            registerData.lType === 'New Car' ? (
                                <>
                                    <p>Show Room Name: {registerData.sname}</p>
                                    <p>Car Details : {registerData.newCarD}</p>

                                    


                                    <Modal className='rounded-md' show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        <h1 className='text-center text-xl mb-5 font-bold'>New Car</h1>
                                        <Modal.Body>
                                        <div className='flex flex-col justify-center items-center'>
                                                <div className='w-full flex flex-wrap justify-center items-center gap-5 mb-3'>

                                              
                                                <div className='flex flex-col gap-1'>
                                                    <Label htmlFor='rStatus' className='p-2 text-md' value='RTO Status *' />
                                                    <Select id='rStatus' name='rStatus' onChange={handleChange}>
                                                        <option value=''>RTO Status</option>
                                                        <option value='Not Applicable'>Not Applicable</option>
                                                        <option value='In Process'>In Process</option>
                                                        <option value='Completed'>Completed</option>
                                                        <option value='Hold'>Hold</option>
                                                    </Select>
                                                </div>
                                                </div>
                                                <div className='flex gap-10 mt-5'>
                                                    <button onClick={handleUpdate} className='bg-green-600 px-3 py-2 rounded-md'>Update</button>
                                                    <button onClick={() => setOpenModal(false)} className='bg-red-700 px-3 py-2 rounded-md'>cancel</button>
                                                </div>
                                                </div>
                                        </Modal.Body>
                                    </Modal>

                                </>

                            ) :
                                null
                        }

                        {
                            registerData.lType === 'Refinance' ? (
                                <>
                                    <p>RTO Charges: {registerData.rrtoCharges1}</p>
                                    <p>NOC : {registerData.rnoc1}</p>
                                    <p>Customer pay: {registerData.rcustomerPay1}</p>
                                    <p>FC Amount:{registerData.rfc1}</p>
                                    <p>Prve Bank: {registerData.rpBank1}</p>
                                    <p>RTO Hold: {registerData.rrHold1}</p>
                                    <p>Kiharas: {registerData.rkiharas1}</p>
                                    <p>RTO Agent: {registerData.rrtoAgent1}</p>


                                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
                                        <Modal.Header />
                                        <h1 className='text-center mb-10 font-bold'>Refinance</h1>
                                        <Modal.Body>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div className='w-full flex flex-wrap justify-center items-center gap-5 mb-3'>

                                              
                                                <div className='flex flex-col'>
                                                    <Label htmlFor='rStatus' className='p-2 text-md' value='RTO Status *' />
                                                    <Select id='rStatus' name='rStatus' onChange={handleChange}>
                                                        <option value=''>RTO Status</option>
                                                        <option value='Not Applicable'>Not Applicable</option>
                                                        <option value='In Process'>In Process</option>
                                                        <option value='Completed'>Completed</option>
                                                        <option value='Hold'>Hold</option>
                                                    </Select>
                                                </div>
                                                <div className='flex flex-col w-[40%] gap-2'>
                                                    <label> RTO Charges</label>
                                                    <input type='text' placeholder='RTO Charges' name='rrtoCharges1' id='rrtoCharges1' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label> RTO Agent</label>
                                                    <input type='text' placeholder='RTO Agent' name='rrtoAgent1' id='rrtoAgent1' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label> Kiharas</label>
                                                    <input type='text' placeholder='Kiharas' name='rkiharas1' id='rkiharas1' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Customer Pay </label>
                                                    <input type='text' placeholder='customer Pay' name='rcustomerPay1' id='rcustomerPay1' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>RTO Hold </label>
                                                    <input type='text' placeholder='RTO Hold' name='rrHold1' id='rrHold1'  className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Noc Hold </label>
                                                    <input type='text' placeholder='Noc Hold' name='rnoc1' id='rnoc1'  className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Prev Bank </label>
                                                    <input type='text' placeholder='Previous bank' name='rpBank1' id='rpBank1' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>
                                                <div className='flex flex-col w-[40%]'>
                                                    <label>Net Pay to </label>
                                                    <input type='text' placeholder='Net Pay To' name='pnpt' id='pnpt' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>

                                                <div className='flex flex-col w-[40%]'>
                                                    <label>FC Amount </label>
                                                    <input type='text' placeholder='FC Amount' name='rfc1' id='rfc1' className='p-1 rounded-md' onChange={handleChange}/>
                                                </div>
                                                </div>

                                                <div className='flex gap-3'>
                                                    <button onClick={handleUpdate} className='bg-green-600 px-3 py-2 rounded-md'>Update</button>
                                                    <button onClick={() => setOpenModal(false)} className='bg-red-700 px-3 py-2 rounded-md'>cancel</button>
                                                </div>
                                            </div>

                                        </Modal.Body>
                                    </Modal>


                                </>
                            ) :
                                null
                        }









                    </div>
                    <div className='w-full flex  gap-10 justify-center items-center'>
                        {
                            registerData.userId === currentUser._id ? 
                            (
                                <>
                                <button onClick={() => setOpenModal(true)} className='mt-10 text-xl bg-black px-5 py-2 rounded-md text-white'>Update</button>
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
