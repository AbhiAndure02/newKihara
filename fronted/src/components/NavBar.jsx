import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import logo from '../assets/images/logo.png';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { UserSignOutSuccess } from '../redux/user/userSlice';

function NavBar() {
  const notificationsCount = useSelector((state) => state.notifications.notificationsCount); // Access count
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();



const handleSignOut = async () => {
  try {
    const res = await axios.post('/api/auth/signout');
    dispatch(UserSignOutSuccess(res));
    
    // Assuming you have a user state to clear
    // resetUser(); // Example: Custom function to reset user state

    console.log("User signed out successfully");
    
    // Optional: Redirect to login or home page
    // navigate('/login'); // If using a routing library like React Router
  } catch (e) {
    console.error("Sign-out error:", e.response?.data?.message || e.message);
    // Display an error message to the user, e.g., using a toast
  }
};

  return (
    <div className='p-1 flex justify-between bg-transparent'>
      <div className='flex items-center'>
        <img src={logo} alt="logo" className='h-20 w-auto' />
      </div>
      <div className='font-bold text-3xl text-[#1974A6] pr-5 flex items-center'>
        KIHARAS FINANCE
      </div>
      <div className='flex gap-1'>
        <div className='relative font-bold text-3xl text-[#1974A6] pr-6 flex items-center'>
          <Link to='/notification'>
            <FaBell />
            {notificationsCount > 0 && (
              <span className='absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full px-2'>
                {notificationsCount}  {/* Show notification count */}
              </span>
            )}
          </Link>
        </div>

        <div>
        
            <button className='py-6 pr-5 text-[#1974A6] text-xl' onClick={handleSignOut}>
              Signout
            </button>
        
        </div>
      </div>
    </div>
  );
}
export default NavBar;
