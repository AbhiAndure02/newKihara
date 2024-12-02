import React from 'react'
import { Link } from 'react-router-dom'

function MiniNavBar() {
  return (
    <div className='bg-white text-[#1974A6] flex gap-4 text-xl font-semibold ml-2'>
        <div>

        <Link to=''>Home</Link>
        </div>
        <Link to='register'>New Application</Link>
        <Link to='scheme'>Scheme</Link>
        {/* <Link to = 'report'>Reports</Link> */}
        
      
    </div>
  )
}

export default MiniNavBar
