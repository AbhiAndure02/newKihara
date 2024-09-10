import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import DataPage from './pages/DataPage'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import NavBar from './components/NavBar'
import MiniNavBar from './components/MiniNavBar'


function App() {
  return (
   <>
   <BrowserRouter>
    <NavBar />
    <MiniNavBar />
   <Routes>
    
    <Route path="/" element={<Login/>}/>
    <Route element ={<PrivateRoute />} >
    <Route path='/register' element={<Register/>} />
    <Route path='/home' element={<Dashboard/>} />

    <Route path = '/home/register/:slug' element={<DataPage />}/>
    </Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
