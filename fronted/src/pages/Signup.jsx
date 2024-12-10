import React, { useState } from 'react';
import { TextInput } from "flowbite-react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [error, setError] = useState(''); // State for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData.entries());

    if (object.password !== object.confirmPassword) { // Check if passwords match
      setError('Passwords do not match!');
      return;
    }

    try {
      await axios.post('/api/auth/signup', { email: object.email, password: object.password });
      navigate('/login'); // Redirect to login on successful signup
    } catch (err) {
      console.log(err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-300'>
      <div className='bg-white h-[560px] w-[600px] rounded-lg border-2 border-gray-700 shadow-2xl opacity-75'>
        <h1 className='text-[#1974A6] text-center p-2 text-3xl mt-6 font-bold'>KIHARAS FINANCE</h1>
        <h1 className='text-[#1974A6] text-center p-2 mt-10 text-2xl font-bold mb-6'>SIGN UP</h1>
        
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 items-center">
          <TextInput 
            className='w-[350px] mb-1 text-black p-2 font-semibold' 
            name='email' 
            id="email" 
            type="email" 
            placeholder="Enter your Email" 
            required 
          />
          <TextInput 
            className='w-[350px] text-black p-2 font-semibold' 
            name="password" 
            id="password" 
            type="password" 
            placeholder='Password' 
            required 
          />
          <TextInput 
            className='w-[350px] text-black p-2 font-semibold' 
            name="confirmPassword" // Use a different name for confirm password
            id="confirmPassword" 
            type="password" 
            placeholder='Confirm Password' 
            required 
          />
          
          {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}
          
          <button 
            className='mt-4 text-white bg-[#1974A6] hover:bg-gray-700 w-[100px] p-2 rounded-md font-xl' 
            type="submit"
          >
            Sign Up
          </button>
          <p>Already have an account? <span className='text-blue-800'><Link to='/login'>Login</Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
