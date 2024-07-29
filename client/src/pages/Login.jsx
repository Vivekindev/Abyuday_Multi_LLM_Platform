import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/regLogo.svg";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordStrengthExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleLogin = async () => {
    // Email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid Email ID");
      return;
    }

    const data = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post('/api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        // Extract the token from the Authorization header
        const token = response.headers['authorization'];
        console.log(token); // Log the Authorization token

        // Log the response body
        console.log(response.data); 

        // Assuming you want to store the token in local storage
        localStorage.setItem('accessToken', token);

        // If response is successful, show success toast
        toast.success("Login Successful");

        // Redirect to '/chat' route
        setTimeout(() => {
          navigateTo('/chat');
        }, 1000);

      } else {
        // If response is not successful, show error toast
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred");
    }
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
                required // Making the field required
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
                required // Making the field required
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <br />
            <button className="control" type="button" onClick={handleLogin}>
              <b>Login</b>
            </button>
            <a href="/register">
              <button className="control" type="button">
                <b>New User?</b>
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
