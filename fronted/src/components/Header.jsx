import { Navbar, TextInput } from 'flowbite-react';
import { CiSearch } from "react-icons/ci";
import React from 'react'
import { FiAlignJustify } from "react-icons/fi";



function Header() {
  return (
    <div className='p-2 flex  justify-between bg-gray-100'>
        <div>
        <h1 className='font-bold text-xl p-3'>LOGO</h1>
        </div>
        <div className='font-bold text-xl p-2'>
            KIHARAS FINANCE
        </div>
        <div>
            <TextInput className='text-xl mx-1' placeholder='Search' type='text' icon={CiSearch}/>
        </div>
      
    </div>
  )
}

export default Header
