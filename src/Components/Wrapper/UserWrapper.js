import React, { useEffect } from "react";
import {Route,Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserPrivateRoute from '../PrivateRoutes/UserPrivateRoute'
import isAuthUser from "../../utils/isAuthUser";
import { set_authentication } from "../../redux/authenticationSlice"; 

import Home from '../User/Home'
import Login from '../Credentials/Login'
import Register from '../Credentials/Register'
import Otp from '../../Pages/RegisterOTP'
import ProjectDetails from "../../Pages/ProjectDetail";






function UserWrapper() {
  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();

    dispatch(
      set_authentication({
        userid:isAuthenticated.userid,
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin: isAuthenticated.isAdmin,
      })
    );
  };

  useEffect(() => {
    if(!authentication_user.name)
    {
      checkAuth();  
    }
  }, [])


  
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route> 
          <Route path="login" element={<Login />}></Route>
          <Route path="register*" element={<Register />}></Route>
          <Route path="/project/:id/" element={<UserPrivateRoute> <ProjectDetails/></UserPrivateRoute> }></Route> 
          <Route path="registerotp" element={<Otp/>}></Route> 


        </Routes>
    </div>
  );
}

export default UserWrapper;
