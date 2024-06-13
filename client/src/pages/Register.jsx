import { useState } from "react";
import logo from "../assets/regLogo.svg";
import "./Register.css";

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
  const handleChange = (value) => console.log(value);
  const notify = () => toast.success("Registered");

  return (
    <>
    <div className="page">
      <div className="login-card">
        <img src={logo} style={{ width: '60%' }}/>
        <h2>Sign Up</h2>
        <form className="login-form">
          <div className="username">
            <input
              autoComplete="on"
              spellCheck="false"
              className="control"
              type="email"
              placeholder="Email"
            />
            <div id="spinner" className="spinner"></div>
          </div>
         
          <PasswordStrength placeholder="Enter Password" onChange={handleChange} />
          <button className="control" type="button" onClick={notify}>
            <b>Register</b>
          </button>
         <a href='./login'><button className="control" type="button" >
            <b>Existing User?</b>
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
