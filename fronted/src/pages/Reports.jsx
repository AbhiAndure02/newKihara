import axios from 'axios';
import { Button, Label, Select } from 'flowbite-react';
import React, { useEffect, useState} from 'react'
import banks from '../components/bankName'


const Reports = () => {


  const [report, setreport] = useState("")

  useEffect(() => {
    const registerData = async () => {
      try {
        const response = await axios.get('/api/getregister');
        setData(response.data.registerData); // Access the `registerData` array from the response
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.log(error);
      }
    };
    registerData();
  }, []);

  return (
    <>
    <div className='flex w-[50%] justify-center pl-10 mx-10 mt-5 flex-col'>
    <Label htmlFor='select' className='p-2 text-md' value='Select Report By' />
    <Select id='rStatus' name='rStatus' required onChange={(e)=> setreport(e.target.value)}>
        <option value=''>select Type</option>
        <option value='bank'>By Bank Name </option>
        <option value='byperson'>By Person</option>
        <option value='month'>by month</option>


    </Select>
</div> 
<div className='flex w-[50%] justify-center pl-10 '>
  {
    report === 'bank' && (
      <div className=' w-[50%] justify-center pl-10 m-10 flex'>
         <Label htmlFor='bank' className='p-2 text-md' value='Bank Name ' />
                                <Select id='bank' name='bank'className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' type='text' required onChange={(e)=> setbankname(e.target.value)} >
                                    <option value="">select Bank</option>
                                    {
                                        banks.map((bank) => (
                                            <option key={bank.id} value={bank.name}>{bank.name}</option>
                                            ))
                                    }
                                    <option value="other">other</option>
                                    {/* <option value="Idfc">Idfc</option>
                                    <option value="Idfc">Idfc</option>
                                    <option value="Idfc">Idfc</option> */}

                                    </Select>
        </div>
      
    )
  }
  <button className='h-20'>Process</button>
</div>
    </>
  )
}

export default Reports
