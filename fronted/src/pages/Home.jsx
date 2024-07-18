
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard"
import Header from "../components/Header"
import Register from "../components/Register"
import SideBar from "../components/SideBar"
import { useLocation } from "react-router-dom";
import BankDetails from "../components/BankDetails";

function Home() {
  const [tab, setTab] = useState('');
  const location = useLocation();
  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])


  return (
<>
<Header />
<div className="min-h-screen flex flex-col md:flex-row">
<div className="md:w-56">
  <SideBar />
</div>

{tab === 'dashboard' && <Dashboard />}
{tab === 'register' && <Register />}

{tab === 'bankdetails' && <BankDetails />}

</div>
</>

  )
}

export default Home
