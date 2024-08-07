import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const RegisterOTP = () => {
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const[error,setError]=useState([])
    const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));
    const baseURL='https://hatio.toeman.online/'
    const navigate = useNavigate();
    const registeredEmail = localStorage.getItem('registeredEmail')
    console.log(registeredEmail);

    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timer > 0) {
                setTimer(prevTimer => prevTimer - 1);
            }
        }, 1000);

      
        return () => clearInterval(intervalId);
    }, [timer,registeredEmail]);


    useEffect(() => {
      if (timer === 0) {
          clearInterval();
          // handleDeleteOTP(); 
      }
    }, [timer]);




    const handleInputChange = (index, value) => {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
  
      if (value !== '' && index < otpValues.length - 1 && inputRefs.current[index + 1]?.current) {
        inputRefs.current[index + 1].current.focus();
      }
    };
  
    const handleVerification = async (event) => {
      event.preventDefault();
      setError([])
      const enteredOtp = otpValues.join('');
      console.log(enteredOtp);
      console.log('Request payload:', { email: registeredEmail, otp: enteredOtp });
      try {
        const res = await axios.post(baseURL + 'otp/', {
          email: registeredEmail,
          otp: enteredOtp,
        });
        if (res.status === 200) {
          console.log('verified');
          navigate('/login');
          console.log(' Account created Successfully');
        } else {
          console.log('Verification failed');
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
        setError(error.response.data)

      }
    };


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full dark:bg-gray-900">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
        <p className="text-gray-600 text-center mb-4">Code sent to <span className="text-blue-500"> {registeredEmail}</span></p>
        <form onSubmit={handleVerification} method="post">
            <div className="grid grid-cols-4 gap-x- my-2 ">
            {otpValues.map((value, index) => (
                                <div key={index} className="w-16 h-16 border border-solid border-black rounded-xl">
                                <input
                                    type="text"
                                    name={`otp${index + 1}`}
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-100 focus:ring-1 ring-black-700"
                                    ref={inputRefs.current[index]}
                                />
                                </div>
                            ))}
            </div>
        
       
        <button className="w-full px-4 py-3 mt-10 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Verify
        </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterOTP;
