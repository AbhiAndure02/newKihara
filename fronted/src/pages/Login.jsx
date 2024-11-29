import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const object = Object.fromEntries(formData.entries());
        try{
          const response = await axios.post('/api/auth/signin', {...object});
          const token = response.data.access_token;
          localStorage.setItem('token', token);
          dispatch(signInSuccess(response.data))
          navigate('/register')
        }
        catch(err){
          console.log(err);
        }
    }
  return (
 <>
 <div className='w-full h-screen flex justify-center items-center bg-gray-300'>
    <div className='bg-white h-[480px] w-[600px] rounded-lg border-2 border-gray-700 shadow-slate-900 shadow-2xl opacity-75'>
        <h1 className='text-[#1974A6] text-center p-2 text-3xl  mt-6 font-bold'>KIHARAS FINANCE</h1>
        <h1 className='text-[#1974A6] text-center p-2 mt-10 text-2xl font-bold mb-6' >SIGN IN</h1>
        
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 items-center">      
        <TextInput className='w-[350px] mb-1 text-black p-2 font-semibold' name='email' id="email1" type="email" placeholder="Enter your Email" required />
      
       
        <TextInput className='w-[350px] text-black p-2 font-semibold' name="password" id="password1" type="password" placeholder='Password' required />
     
      <button className='mt-4 text-white bg-[#1974A6] hover:bg-gray-700 w-[100px] p-2 rounded-md font-xl' type="submit">Sign In</button>
    </form>

    

    </div>

 </div>
 </>
  )
}

export default Login
