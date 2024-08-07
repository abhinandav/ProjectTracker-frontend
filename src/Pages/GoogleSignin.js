import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn = () => {
  const handleSuccess = (response) => {
    fetch('http://localhost:8000/auth/complete/google/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onFailure={(error) => console.error('Login Failed:', error)}
    />
  );
};

export default GoogleSignIn;
