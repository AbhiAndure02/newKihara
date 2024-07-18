import {Sidebar} from 'flowbite-react'
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { FaCashRegister } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import {Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';



function SideBar() {
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
    <Sidebar className='w-full md:w-56 text-purple-700' >
    <Sidebar.Items >
       <Sidebar.ItemGroup className='flex flex-col gap-4 '>
        <Link to ='/home?tab=dashboard'>
           <Sidebar.Item active={tab==='dashboard'} className="text-purple-700 text-md" icon ={HiChartPie} labelColor='dark' as='div'>
               DashBoard
           </Sidebar.Item>
           </Link>
           <Link to='/home?tab=register'>
           <Sidebar.Item active={tab ==='register'} className="text-purple-700 text-md" as='div' icon={FaCashRegister}>
               Registration 
           </Sidebar.Item>
           </Link>

           <Link to='/home?tab=bankdetails'>
           <Sidebar.Item active= {tab==="bankdetails"} className="text-purple-700 text-md" icon={CiBank}>
               Bank Details
           </Sidebar.Item>
           </Link>
        
         
           <Sidebar.Item className="text-purple-700 text-md" icon ={HiArrowSmRight} >
               Log out
           </Sidebar.Item>
       </Sidebar.ItemGroup>

    </Sidebar.Items>
</Sidebar>

  )
}

export default SideBar
