// chatPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import './App.css';
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

const chatPage = () => {
  const msgEnd = useRef(null);
/*---------------------------mobilePrompt----------------------------- */
  const [isVisible, setIsVisible] = useState(true);
  
  const toggleVisibility = () => {
    if(isVisible)
    setIsVisible(!isVisible);
  };

  const divStyle = {

    display: isVisible ? 'flex' : 'none'
  };
/*--------------------------------------------------------------------- */
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "I operate with advanced capabilities provided by a Large Language Model, empowering me with enhanced language processing and understanding.",
      isBot: true,
    }
  ]);
  const [age, setAge] = useState("Mixtral8x7BInstruct"); // Initialize age state

  useEffect(() => {
    if(!isVisible)
    msgEnd.current.scrollIntoView();
  }, [messages]);


  

  const handleSent = async () => {
    // Access the age variable here
    console.log(age);

    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ]);
    const res = await sendMsgToNvidia(text,age);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      // Close the virtual keyboard
      toggleVisibility();
      document.activeElement.blur(); // Blur the currently focused element
      e.target.blur(); // Blur the input element
      await handleSent(); // Perform the desired action
    }
  };
  

  const handleQuery = async (e) => {
    console.log(age);
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res = await sendMsgToNvidia(text,age);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true }
    ]);
  };

  
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt='logo' className="logo" />
            <span className="brand">AbyuDAY</span>
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
          
          <a href="/home#features">
          <button className="query bottomQuery "  >
              <img src={thunder} alt="query"  className="listItemsImg"/>Models
            </button>
           </a>
           <a href="/home">
          <button className="query bottomQuery "  >
              <img src={home} alt="query"  className="listItemsImg"/>Home
            </button>
           </a>

        </div>
      </div>
      
      <div className="rightPart">
        <div className="navbar">
        <BasicSelect age={age} setAge={setAge} />
        </div>
      <div className="main">
        {/* Pass age state and setAge function as props */}
       <div className="select"><BasicSelect age={age} setAge={setAge} /></div> 

        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt" style={{ whiteSpace: 'pre-line', maxWidth: message.isBot ? '87%' : '87%', overflow: 'hidden' }}>
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
          <p>It may produce inaccurate information about people, places, or facts. AbyuDAY January 2024 version</p>
        </div>
      </div>
      <div className="inpPad">
            <input type="text" name="" id="" placeholder='Message AbyuDAY...' value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
            <button className="send" onClick={()=>{handleSent();toggleVisibility();}}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          </div>
    </div>
  );
};

export default chatPage;