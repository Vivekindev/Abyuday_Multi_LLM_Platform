import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/regLogo.svg";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from "react-icons/fa";
const PasswordStrengthExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid Email ID");
      return;
    }

    const data = { email, password };

    try {
      const response = await axios.post('/api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const token = response.headers['authorization'];
        localStorage.setItem('accessToken', token);
        toast.success("Login Successful");

        setTimeout(() => {
          navigateTo('/chat');
        }, 1000);
      } else if(response.status === 401){
        toast.error("Incorrect Password");
      }
    } catch (error) {
      toast.error("Unauthorised !");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <>
      <div className="page">
        <div className="login-card">
          <img src={logo} style={{ width: '60%' }} alt="Logo" />
          <h2>Login</h2>
          <form className="login-form">
            <div className="username">
              <input
                autoComplete="on"
                spellCheck="false"
                className="control"
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <div className="username">
              <input
                autoComplete="on"
                spellCheck="false"
                className="control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <br />
            <button className="control" type="button" onClick={handleLogin}>
              <b>Login</b>
            </button>
            <button className="google-login" type="button" onClick={handleGoogleLogin}>
            <FaGoogle size={30} style={{marginRight:'0.8rem'}} /> <b> Sign in with Google</b>
            </button>
            <a href="/register">
              <button className="control" type="button">
                <b>Register with Email ID</b>
              </button>
            </a>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ fontSize: '16px' }}
      />
    </>
  );
};

export default PasswordStrengthExample;
