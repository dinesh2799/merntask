// import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import EditProfile from './pages/EditProfile';
import {useSelector} from 'react-redux'

function App() {
  const {user} =useSelector((state) => state.auth)
  console.log(user)
  return (
    <>
      <Router>
      <div className="container">
        <Header />
        <Routes>
           <Route path='/' element={<Dashboard />} />
           <Route path="/login" element= {<Login/>} />
          <Route path = '/register' element = {<Register/>} />  
          <Route path='/editprofile' element ={<EditProfile data={user} />} />
          
        </Routes> 
      </div>
      </Router>
      <ToastContainer />
    </>
    
  );
}

export default App;
