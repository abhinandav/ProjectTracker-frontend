import React,{useEffect,useState} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { set_authentication } from '../../redux/authenticationSlice';
import {jwtDecode} from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import signinbg from '../../images/signinbg.jpg'


const Login = () => {
    const {state}=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [message,setMessage]=useState(null)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')
    const baseURL='https://hatio.toeman.online'

    const authentication_user=useSelector(state=>(state.authentication_user))
    console.log(authentication_user.name);
    console.log('auth admin',authentication_user.isAdmin);
    console.log('name',authentication_user.isAuthenticated);
  
    useEffect(() => {
        if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin && !authentication_user.isTeacher)) {
          console.log('User is already authenticated. Redirecting...');
          navigate('/');
        }
      }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.Teacher, navigate]);
      
    
      useEffect(() => {
        if (state) {
          setMessage(state)
          
        }
      }, [state, navigate])
      
    
    

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        setEmailError('')
        setPasswordError('')
        setLoginError('')
    
        const email = event.target.email.value
        const password = event.target.password.value
    
        if (!email.trim()) {
            setEmailError('Email is required')
        }
    
        if (!password.trim()) {
            setPasswordError('Password is required');
        }
    
        if (password.length > 0 && password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
        }
    
        const formData = new FormData();
        formData.append('email', event.target.email.value);
        formData.append('password', event.target.password.value);
    
        try {
            const res = await axios.post(baseURL + '/login/', formData);
            console.log('Response', res)
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access_token);
                localStorage.setItem('refresh', res.data.refresh_token);
                localStorage.setItem('userid', res.data.userid);
    
                console.log('logined', res.data);
                console.log('Access Token:', res.data.access_token);
                console.log('Refresh Token:', res.data.refresh_token);
    
                dispatch(
                    set_authentication({
                        name: jwtDecode(res.data.access_token).username,
                        isAuthenticated: true,
                        userid:res.data.userid,
                        isAdmin: false,
                        isActive:res.data.userid
                    })
                );
                navigate('/');
            }
    
        } catch (error) {
    
            console.error('Error during login:', error);
    
            if (error.response) {
                console.error('Response data:', error.response);
                if (error.response.status === 403) {
                    
                } else {
                    setLoginError('Invalid Credentials');
                }
            } else {
                setLoginError('Invalid Credentials');
            }
        }
    };

   

    return (
        <div className="pt-7 pb-20  text-gray-900 flex justify-center" style={{
            backgroundImage: `url(${signinbg})`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="max-w-screen-lg  m-0 sm:m-10 bg-gray-300 shadow rounded-2xl flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12">
                    
                    <div className="mt-5 flex flex-col items-center">
                        <div className="w-full  mt-5">
                            <div className="my-4  text-center ">
                                <div className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium transform translate-y-1/2">
                                    Sign In Using E-mail Id
                                </div>
                            </div>
                            <form method='post' onSubmit={handleLoginSubmit}>
                            <div className="mx-auto max-w-xs !my-5">
                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" type="email" placeholder="Email" name='email'/>
                                {emailError && <span className="text-md text-red-800 mt-1 mb-5">{emailError}</span>}
                                
                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="password" placeholder="Password" name='password' />
                                {passwordError ? (<>
                                    {passwordError && <span className="text-md text-red-800 " >{passwordError}</span>}
                                    </>):(<>
                                    {loginError && <span className="text-md text-red-800 " >{loginError}</span>}
                                    </>)}

                                <button type='submit' className="mt-5 tracking-wide font-semibold bg-violet-500 text-white-500 w-full py-4 rounded-lg text-white  hover:bg-violet-700 flex items-center justify-center focus:shadow-outline focus:outline-none
                                active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">Sign In</span>
                                </button>

                                <p className='text-sm text-gray-600 ml-5 mt-3'>Dont you have an Account 
                                    <Link to='/register'>
                                    <span className='underline text-blue-500 mx-2'>Sign Up</span>
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
                        </div>
                    </div>
                </div>
                <div className="flex-1 h-full w-1/2 relative bg-gray-600 text-center hidden lg:flex items-center justify-center rounded-r-2xl">
                        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"/>
                        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
