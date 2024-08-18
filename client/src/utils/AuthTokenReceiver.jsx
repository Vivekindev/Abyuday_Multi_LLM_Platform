import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const authTokenReceiver = () => {
    const navigateTo = useNavigate();
  useEffect(() => {
    
    // Read the accessToken cookie
    const token = Cookies.get('accessToken');

    // Save the token to localStorage if it exists
    if (token) {
      localStorage.setItem('accessToken', `Bearer ${token}`);
      navigateTo('/chat');
    }
    else{
        navigateTo('/login');
    }
  }, []);
  return (
    <div></div>
  )
}

export default authTokenReceiver