import { Navbar, TextInput } from 'flowbite-react';
import { CiSearch } from "react-icons/ci";
import React, { useState } from 'react'
import { FiAlignJustify } from "react-icons/fi";



function Header({onSearch}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); 
    onSearch(searchTerm.name) || onSearch(searchTerm.applicationId)


  };
  return (
    <div className='p-2 flex  justify-center mb-4 bg-gray-100'>
      
        
        <div>
            <TextInput className='text-xl mx-1' 
            placeholder='Search' 
            type='text' 
            icon={CiSearch}
            value={searchTerm}
            onChange={handleSearch}/>
        </div>
      
    </div>
  )
}

export default Header
