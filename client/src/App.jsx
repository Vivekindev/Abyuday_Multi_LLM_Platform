import React, { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, materialDark, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';
import gptLogo from './assets/robotics.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import logout from './assets/logout.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user.svg';
import gptImgLogo from './assets/robotics.svg';


const App = () => {
  const msgEnd = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: "I am operating with the advanced capabilities provided by the Mixtral 8x7B LLM, which empowers me with enhanced language processing and understanding",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const formatBoldText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      } else {
        return part;
      }
    });
  };

  const formatMessage = (message) => {
    const parts = message.split(/(```(.*?)\n([\s\S]*?)```)/s);
    return parts.map((part, index) => {
      if (index % 4 === 0) {
        // Regular text outside code blocks
        const formattedText = part.replace(/`([^`]+)`/g, (_, content) => `<span style="color: #F9E076; ">${content}</span>`);
  
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      } else if (index % 4 === 2) {
        // Code block
        const language = parts[index];
        const codeContent = parts[index + 1];
  
        if (language && codeContent) {
          
          return (
            <SyntaxHighlighter
            key={index}
            language={language.trim()}
            style={atomDark}
            showLineNumbers={false}
            wrapLines={true}
            lineNumberStyle={{ minWidth: '2em', paddingRight: '1em' }}
            customStyle={{ maxWidth: '100%', overflowX: 'auto' }}  // Set maximum width and enable horizontal scrolling
          >
            {codeContent.trim()}
          </SyntaxHighlighter>
          );
        }
      }
      return null;
    });
  };
  
  
  

  const sendMsgToNvidia = async (message) => {
    const apiUrl = "/api"; // Update this with your server's URL

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              content: message,
              role: "user",
            },
          ],
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 1024,
          seed: 42,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Nvidia Assistant Response:", responseData);

      return responseData; // You can modify this to return specific data if needed
    } catch (error) {
      console.error("Error sending message to Nvidia API:", error);
      throw error; // You can handle the error in the calling code
    }
  };

  const handleSent = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ]);
    const res = await sendMsgToNvidia(text);
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
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res = await sendMsgToNvidia(text);
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
            <button className="query" value={"Tourist places in Tumkur"} onClick={handleQuery}>
              <img src={msgIcon} alt="query" />Tourist places in Tumkur
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