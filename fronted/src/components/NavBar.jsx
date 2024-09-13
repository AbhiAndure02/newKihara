import logo from '../assets/images/logo.png'
import { FaBell } from "react-icons/fa";


function NavBar() {
    return (
      <div className='p-1 flex justify-between bg-transparent'> {/* Set bg-transparent here */}
        <div className='flex items-center'>
          <img src={logo} alt="logo" className='h-20 w-auto' /> {/* Adjust height/width as needed */}
        </div>
        <div className='font-bold text-3xl text-[#1974A6] pr-5 flex items-center'>
          KIHARAS FINANCE
        </div>
        <div className='flex gap-1'>
        <div className='font-bold text-3xl text-[#1974A6] pr-5 flex items-center'>
          <FaBell />
        </div>
        <div>
          <button className='py-7 pr-2 text-[#1974A6] text-xl'>signout</button>
        </div>

        </div>
      </div>
    );
  }
  
  export default NavBar;
