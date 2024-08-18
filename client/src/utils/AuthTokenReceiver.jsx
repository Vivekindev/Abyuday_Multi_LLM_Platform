import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const authTokenReceiver = () => {
    const navigateTo = useNavigate();
  useEffect(() => {
    // Function to get a cookie by name
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    };

    // Read the accessToken cookie
    const token = getCookie('accessToken');

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