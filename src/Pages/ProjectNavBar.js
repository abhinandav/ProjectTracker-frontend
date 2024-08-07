import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { set_authentication } from '../redux/authenticationSlice';
import GistDownload from './GistDownload';

export default function ProjectNavbar({title,pendingTodos, completedTodos}) {
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
      <nav className=" shadow-lg bg-projectlist rounded-t-lg text-white">
        <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-start items-start">
            <Link className="nav-link" to='/'>
              <span className=' '>Home/projects</span>
            </Link>
            <span className='font-bold  text-3xl capitalize'>{title}</span>
            
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

          <div className="flex flex-row   -mx-2">           
           {authentication_user.isAuthenticated && !authentication_user.is_admin ? (
            <>   
               <span><GistDownload projectTitle={title} pendingTodos={pendingTodos} completedTodos={completedTodos}/></span>                             
                <button onClick={logout} className=" text-md font-semibold border px-4 py-2 rounded-lg hover:text-orange-500 hover:border-orange-500 ml-5">
                     Log Out
                </button>        
            </>
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
