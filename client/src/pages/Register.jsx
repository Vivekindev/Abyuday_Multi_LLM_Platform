import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/regLogo.svg";
import "./Register.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const strengthLabels = ["weak", "medium", "medium", "strong"];

export const PasswordStrength = ({ placeholder, onChange }) => {
  const [strength, setStrength] = useState("");

  const getStrength = (password) => {
    let strengthIndicator = -1;

    if (/[a-z]/.test(password)) strengthIndicator++;
    if (/[A-Z]/.test(password)) strengthIndicator++;
    if (/\d/.test(password)) strengthIndicator++;
    if (/[^a-zA-Z0-9]/.test(password)) strengthIndicator++;

    if (password.length >= 16) strengthIndicator++;

    return strengthLabels[strengthIndicator];
  };

  const handleChange = (event) => {
    setStrength(getStrength(event.target.value));
    onChange(event.target.value);
  };

  return (
    <>
      <input
        name="password"
        spellCheck="false"
        className="control"
        type="password"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div className={`bars ${strength}`}>
        <div></div>
      </div>
      <div className="strength">{strength && `${strength} password`}</div>
    </>
  );
};

const PasswordStrengthExample = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState("register");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigateTo = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (value) => setPassword(value);
  const handleOtpChange = (event) => setOtp(event.target.value);

  const emailIsValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    return otp;
  };

  const initiateRegistration = async () => {
    if (!emailIsValid(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    setLoading(true); // Start loading
    const otp = generateOtp();
    try {
      await axios.post('/api/otpverification', { email, otp });
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const registerData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post('/api/register', { email, password });
      const token = response.headers['authorization'];
      console.log(token);
      localStorage.setItem('accessToken', token);
      toast.success("Registered successfully");
      setTimeout(() => {
        navigateTo('/chat');
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      registerData();
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <>
      <div className="page">
        <div className="login-card">
          <img src={logo} style={{ width: '60%' }} alt="Logo" />
          <h2>{step === "register" ? "Sign Up" : "Enter OTP"}</h2>
          <form className="login-form" onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}>
            {step === "register" && (
              <>
                <div className="username">
                  <input
                    autoComplete="on"
                    spellCheck="false"
                    className="control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <div id="spinner" className="spinner"></div>
                </div>
                <PasswordStrength
                  placeholder="Enter Password"
                  onChange={handlePasswordChange}
                />
                <button className="control" type="button" onClick={initiateRegistration} disabled={loading}>
                  {loading ? "Processing..." : <b>Register</b>}
                </button>
                <a href='./login'>
                  <button className="control" type="button">
                    <b>Existing User?</b>
                  </button>
                </a>
              </>
            )}
            {step === "otp" && (
              <>
                <input
                  className="control"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />
                <button className="control" type="button" onClick={verifyOtp} disabled={loading}>
                  {loading ? "Verifying..." : <b>Verify OTP</b>}
                </button>
              </>
            )}
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
