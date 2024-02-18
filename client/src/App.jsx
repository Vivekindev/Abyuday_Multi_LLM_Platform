// App.jsx
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

import sendMsgToNvidia from './functions/sendMsgToNvidia.jsx';
import formatMessage from './functions/formatMessage.jsx';
import BasicSelect from './components/BasicSelect.jsx';

const App = () => {
  const msgEnd = useRef(null);
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "I operate with advanced capabilities provided by a Large Language Model, empowering me with enhanced language processing and understanding.",
      isBot: true,
    }
  ]);
  const [age, setAge] = useState("Mixtral8x7BInstruct"); // Initialize age state

  useEffect(() => {
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
    if (e.key === 'Enter') await handleSent();
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
          <div className="listItems">
            <img src={home} alt="" className="listItemsImg" />Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listItemsImg" />Saved
          </div>
          <div className="listItems">
            <img src={logout} alt="" className="listItemsImg logout" />Logout
          </div>
        </div>
      </div>
      <div className="main">
        {/* Pass age state and setAge function as props */}
        <BasicSelect age={age} setAge={setAge} />

        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className="chatImg" src={message.isBot ? gptImgLogo : userIcon} alt="" />
              <p className="txt" style={{ whiteSpace: 'pre-line', maxWidth: message.isBot ? '87%' : '87%', overflow: 'hidden' }}>
                {formatMessage(message.text)}
              </p>
            </div>
          ))}
          <div ref={msgEnd}></div>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" name="" id="" placeholder='Send a Message' value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
            <button className="send" onClick={handleSent}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>It may produce inaccurate information about people, places, or facts. AbyuDAY January 2024 version</p>
        </div>
      </div>
    </div>
  );
};

export default App;

