import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Chatpage.css';
import Cookies from 'js-cookie';
import gptLogo from './assets/robotics.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import logout from './assets/logout.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user.svg';
import gptImgLogo from './assets/robotics.svg';
import thunder from './assets/thunder.png';

import sendMsgToNvidia from './functions/sendMsgToNvidia.jsx';
import formatMessage from './functions/formatMessage.jsx';
import BasicSelect from './components/BasicSelect.jsx';

const ChatPage = () => {
  const navigateTo = useNavigate();
  const msgEnd = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "I operate with advanced capabilities provided by a Large Language Model, empowering me with enhanced language processing and understanding.",
      isBot: true,
    }
  ]);
  const [age, setAge] = useState('Mixtral8x7BInstruct'); // Initialize SELECT model state
  const [isVisibleEg, setIsVisibleEg] = useState(true);


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
    }
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken')
          }
        });
        if (response.ok) {
          setIsVisible(true);
        } else {
          navigateTo('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsVisible(false);
      }
    };

    verifyToken();
  }, []);

  const handleSent = async () => {
    const text = input;
    setInput('');
    setMessages(prevMessages => [
      ...prevMessages,
      { text, isBot: false },
      { text: "Generating...", isBot: true }
    ]);
    setLoading(true);
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
    try {
      const res = await sendMsgToNvidia(text, age);
      setMessages(prevMessages => [
        ...prevMessages.slice(0, -1),
        { text: res, isBot: true }
      ]);
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages.slice(0, -1),
        { text: "Error occurred, Try Refreshing page", isBot: true, isError: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      toggleVisibility();
      await handleSent();
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuery = async (e) => {
    toggleVisibility();
    const text = e.target.value;
    setMessages(prevMessages => [
      ...prevMessages,
      { text, isBot: false },
      { text: "Generating...", isBot: true }
    ]);
    setLoading(true);
    try {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
      const res = await sendMsgToNvidia(text, age);
      setMessages(prevMessages => [
        ...prevMessages.slice(0, -1),
        { text: res, isBot: true }
      ]);
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages.slice(0, -1),
        { text: "Error occurred, Try Refreshing page", isBot: true, isError: true }
      ]);
    } finally {
      setLoading(false);
    }
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const toggleVisibility = () => {
    setIsVisibleEg(!isVisibleEg);
  };

  const divStyle = {
    display: isVisibleEg ? 'flex' : 'none'
  };

  const LogoutFunction = ()=>{
    Cookies.remove('accessToken');
    localStorage.setItem('accessToken', '')
  }
  

  return (
    <div className="Appp">
      {isVisible && (
        <div className="sideBar">
          <div className="upperSide">
            <div className="upperSideTop">
              <img src={gptLogo} alt='logo' className="logo" />
              <span className="brand jaro" style={{fontSize:'3.5rem',fontWeight:'500',animation:'none',opacity:'100%'}}>ABYUDAY</span>
            </div>
            <button className="midBtn" onClick={() => { window.location.reload() }}>
              <img src={addBtn} alt="new Chat" className="addBtn" /> New Chat
            </button>
            <div className="upperSideBottom">
              <button className="query" value={"What are Data Structures?"} onClick={handleQuery}>
                <img src={msgIcon} alt="query" />What are Data Structures?
              </button>
              <button className="query" value={"What is Computer Networks?"} onClick={handleQuery}>
                <img src={msgIcon} alt="query" />What is Computer Networks?
              </button>
              <button className="query" value={"What is Websocket?"} onClick={handleQuery}>
                <img src={msgIcon} alt="query" />What is Websocket?
              </button>
              <button className="query" value={"Generate code to Fetch Data Asynchronously from an API in Javascript"} onClick={handleQuery}>
                <img src={msgIcon} alt="query" />Generate a Code in JS
              </button>
            </div>
          </div>
          <div className="lowerSide">
            <a href="/login">
              <button className="query bottomQuery " onClick={LogoutFunction}>
                <img src={logout} alt="query" className="listItemsImg" />Logout
              </button>
            </a>
            <a href="/">
              <button className="query bottomQuery ">
                <img src={thunder} alt="query" className="listItemsImg" />Models
              </button>
            </a>
            <a href="/home">
              <button className="query bottomQuery ">
                <img src={home} alt="query" className="listItemsImg" />Home
              </button>
            </a>
          </div>
        </div>
      )}
      {isVisible && (
        <div className="rightPart">
          <div className="navbarr">
            <BasicSelect age={age} setAge={setAge} />
          </div>
          <div className="main">
            <div className="select"><BasicSelect age={age} setAge={setAge} /></div>
            <div className="chats">
              {messages.map((message, i) => (
                <div key={i} className={message.isBot && message.text === "Generating..." ? "chat bot generating" : message.isError ? "chat bot error" : message.isBot ? "chat bot" : "chat"}>
                  <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
                  <p className="txt" style={{ whiteSpace: 'pre-line', maxWidth: '87%', overflow: 'hidden' }}>
                    {formatMessage(message.text)}
                  </p>
                </div>
              ))}
              <div className="egPrompt" style={divStyle}>
                <button className="query mob" value={"What are Data Structures?"} onClick={(e) => { handleQuery(e); toggleVisibility(); }}>
                  <img src={msgIcon} alt="query" />What are Data Structures?
                </button>
                <button className="query mob" value={"What is Computer Networks?"} onClick={(e) => { handleQuery(e); toggleVisibility(); }}>
                  <img src={msgIcon} alt="query" />What is Computer Networks?
                </button>
                <button className="query mob" value={"What is Websocket?"} onClick={(e) => { handleQuery(e); toggleVisibility(); }}>
                  <img src={msgIcon} alt="query" />What is Websocket?
                </button>
                <button className="query mob" value={"Generate code to Fetch Data Asynchronously from an API in Javascript"} onClick={(e) => { handleQuery(e); toggleVisibility(); }}>
                  <img src={msgIcon} alt="query" />Generate a Code in JS
                </button>
              </div>
              <div ref={msgEnd}></div>
            </div>
            <div className="chatFooter">
              <div className="inp">
                <input type="text" name="" id="" placeholder='Message AbyuDAY...' value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
                <button className="send" onClick={handleSent}>
                  <img src={sendBtn} alt="Send" />
                </button>
              </div>
              <div style={{ fontSize: "1.3rem", marginTop: "1rem", marginBottom: "1rem", color: "#E1D9D1" }}>It may produce inaccurate information about people, places or facts. © Abyuday (June 2024 version)</div>
            </div>
          </div>
          <div className="inpPad">
            <input type="text" name="" id="" placeholder='Message AbyuDAY...' value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
            <button className="send" onClick={handleSent}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
