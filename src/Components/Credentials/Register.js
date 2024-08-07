import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Register = () => {
    const baseURL='https://hatio.toeman.online'
    const navigate=useNavigate()
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [cpasswordError, setCPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')

    const authentication_user=useSelector(state=>(state.authentication_user))

    useEffect(() => {
      if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin && !authentication_user.isTeacher)) {
        console.log('User is already authenticated. Redirecting...');
        navigate('/');
      }
    }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.Teacher, navigate]);
    


    const handleFormSumbmit= async (event)=>{
        event.preventDefault();
    
          setEmailError('')
          setPasswordError('')
          setLoginError('')
          setUsernameError('')
          setCPasswordError('')
    
          const username=event.target.username.value
          const email=event.target.email.value
          const password=event.target.password.value
          const cpassword=event.target.cpassword.value
          const alphabeticRegex = /^[A-Za-z]+$/;
    
          if (!username.trim()) {
            setUsernameError('Username is required *')
         
          }
    
          if (!alphabeticRegex.test(username)) {
            setUsernameError('Username must contain only alphabetic characters');
            return;
          }
    
          if (username.length > 0 && username.length < 4) {
            setUsernameError('length must be atleast 4 characters *')
          }
    
          if (!email.trim()) {
            setEmailError('Email is required *')
          }
      
          if (!password.trim()) {
            setPasswordError('Password is required *');
          }
    
          if (password.length > 0 && password.length < 8) {
            setPasswordError('Password must be at least 8 characters *');
          }
    
    
          if (!cpassword.trim()) {
            setCPasswordError('Confirm Password is required *');
            return
          }
    
          if (cpassword.length > 0 && cpassword.length < 8) {
            setCPasswordError('Confirm Password must be at least 8 characters *');
            return
          }
    
          if  (String(cpassword) !== String(password)){
            setCPasswordError('Passwords are not matching!!');
            setPasswordError('Passwords are not matching!!');
            return
          }
    
    
        const formData=new FormData()
        formData.append('username',event.target.username.value)
        formData.append('email',event.target.email.value)
        formData.append('password',event.target.password.value)
        formData.append('cpassword',event.target.cpassword.value)
    
    
    
        try{
          const res = await axios.post(baseURL+'/register/', formData);
    
    
          if (res.status === 200){
            console.log('Server Response:', res.data);
            const registeredEmail = res.data.email;
            localStorage.setItem('registeredEmail', registeredEmail);
            navigate('/registerotp');
            console.log(' Otp Sented to your Email');
            return res;
          }
        }
        catch (error) {
          if (error.response && error.response.status === 400) {
            console.log('Error:', error.response.data);
            const errorData = error.response.data;
            if (errorData.email && errorData.email.length > 0) {
              setEmailError(errorData.email[0]);
            } else {
              setLoginError('An error occurred during registration.');
            }
          } else {
            console.log('Error:', error.message); 
          }
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-lg max-h-screen-md m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">

                <div className="flex-1 h-full w-1/2 relative bg-violet-300 text-center hidden lg:flex items-center justify-center">
                        <div className="w-60 h-60 bg-gradient-to-tr from-pink-500 to-green-500 rounded-full animate-bounce"/>
                        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
                </div>

                <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12">     
                    {/* <div className="mt-5 flex flex-col items-center"> */}
                        {/* <div className="w-full flex-1 mt-5"> */}
                            {/* <div className="flex flex-col items-center">
                                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                            <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                            <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                            <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Sign In with Google</span>
                                </button>
                            </div> */}
                            <div className="my-5 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                     Sign Up Using E-mail Id
                                </div>
                            </div>
                            <form onSubmit={handleFormSumbmit} method='post' className='mt-2'>

                                <div className="mx-auto max-w-xs mt-2">
                                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" placeholder="Username" name="username" />
                                    {usernameError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{usernameError}</span>}

                                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="email" placeholder="Email" name="email" />
                                    {emailError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{emailError}</span>}

                                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password" name='password'/>
                                    {passwordError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{passwordError}</span>}
                                    
                                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Confirm Password" name='cpassword'/>
                                    {cpasswordError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{cpasswordError}</span>}
                                    {loginError && <span className="text-sm font-bold text-red-500 mt-1 mb-5">{loginError}</span>}


                                    <button className="mt-5 tracking-wide font-semibold bg-violet-500 text-white-500 w-full py-4 rounded-lg text-white  hover:bg-violet-700 flex items-center justify-center focus:shadow-outline focus:outline-none
                                    active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                    <p className='text-sm text-gray-600 ml-5 mt-3'>Already have an Account 
                                      <Link to='/login'>
                                      <span className='underline text-blue-500 mx-2'>Sign in</span>
                                      </Link>
                                       now!!</p>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by Cartesian Kinetics
                                        <span className="border-b border-gray-500 border-dotted">Terms of Service</span>
                                        and its
                                        <span className="border-b border-gray-500 border-dotted">Privacy Policy</span>
                                    </p>
                                </div>
                            </form>
                        {/* </div> */}
                    {/* </div> */}
                </div>

            </div>
        </div>
    );
};

export default Register;
