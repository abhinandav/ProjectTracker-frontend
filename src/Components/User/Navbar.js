import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { set_authentication } from '../../redux/authenticationSlice';

export default function Navbar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const refreshToken = localStorage.getItem('refresh');

  const authentication_user=useSelector(state=>state.authentication_user)


  const logout=()=>{
    localStorage.clear()
    dispatch(
      set_authentication({
        name:null,
        isAuthenticated:null,
        isAdmin:false,
      })
    )
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg border-b-2">
    <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 md:text-3xl">
        <Link className="nav-link" to='/'>
          <span>Brand</span>
        </Link>
        </div>
        <div className="md:hidden">
          <button type="button" className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path className="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row hidden md:block -mx-2">           
       {authentication_user.isAuthenticated && !authentication_user.is_admin ? (
        <>  
            <span className="text-gray-800 rounded capitalize hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">{authentication_user.name}</span>                              
            <button onClick={logout} className="text-gray-800 text-md font-semibold border px-4 py-2 rounded-lg hover:text-orange-500 hover:border-orange-500 ml-5">
                 Log Out
            </button>             </>
       ):(
        <Link to='login'>
            Login
        </Link>
      )
       } 

      </div>
    </div>
  </nav>

  );
}
