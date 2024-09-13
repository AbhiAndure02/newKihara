import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import DataPage from './pages/DataPage'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import NavBar from './components/NavBar'
import MiniNavBar from './components/MiniNavBar'
import Schema from './pages/Schema'
import Reports from './pages/Reports'
import Notification from './pages/Notification'


function App() {
  return (
   <>
   <BrowserRouter>
    <NavBar />
    <MiniNavBar />
   <Routes>
    
    <Route path="/login" element={<Login/>}/>
    <Route element ={<PrivateRoute />} >
    <Route path='/register' element={<Register/>} />
    <Route path='/' element={<Dashboard/>} />
    <Route path= '/scheme' element = {<Schema/>} /> 
    <Route path='/report' element={<Reports/>} />
    <Route path ='notification' element={<Notification />} />
    <Route path = '/home/register/:slug' element={<DataPage />}/>
    </Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
