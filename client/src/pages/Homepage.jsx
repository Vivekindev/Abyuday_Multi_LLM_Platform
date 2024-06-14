import React, { useState, useEffect } from 'react';
import './Homepage.css';
import roboLogo from '../assets/Homepage/robotics.svg';
import mistralImage from '../assets/Homepage/mistral.png';
import metaImage from '../assets/Homepage/meta.png';
import videoFile from '../assets/Homepage/gradient.mp4';



const Homepage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const setCookie = (model) => {
    document.cookie = model;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (<>
    <div className="navbar">
    <div className="container">
        {(window.innerWidth>600)?(
    <div className="left" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <img src={roboLogo} alt="Robot Logo" id="robo" width="8%" />
     <a href='#features'><button type="button" className="btn navbtn left">MODELS</button></a> 
     <a href='/register'><button type="button" className="btn navbtn left">REGISTER</button></a> 
     <a href='#about'><button type="button" className="btn navbtn left">ABOUT</button></a> 
    </div>
):(
<img src={roboLogo} alt="Robot Logo" id="robo" width="8%" />
)}
    
      <ul className="navbar-menu">
        {(window.innerWidth>600)?(
            <li><a href='/login'><button type="button" className="btn navbtn" >LOGIN</button></a></li>
        ):(
            <li><a href='/login'><button type="button" className="btn navbtn" style={{width:"13rem",fontSize:"2rem",marginTop:"0rem"}}>LOGIN</button></a></li>
        )}
        
      </ul>
    </div>
  </div>
    <div className="App">
       
     
    <header className="header">
            <video autoPlay muted loop id="header-video">
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="info-text">
                <div className="prodName">
                    <div className="jaro">ABYUDAY<br /></div>
                    <h4>A Multi LLM Platform</h4>
                </div>
                <a href="/chat" className="button">
                    <button type="button" className="btn">Try Now</button>
                </a>
                <a href="#features" className="scroll">
                    <img src="https://img.icons8.com/ios-filled/100/FFFFFF/sort-down.png" style={{ width: "22px", transform: 'translate(-23%, -15%)' }} alt="Scroll Down" />
                </a>
            </div>
        </header>
      
    <div className="info">
      <section id="features">
        <div className="header">
          <h1>LLM Models</h1>
          <a href="#" id="seeMore">See More</a>
        </div>
        <div className="feature-cards">
          <div className="card">
            <div className="info">
              <img src={mistralImage} alt="" style={{ width: '100%' }} />
              <h1>Mixtral 8x7B Instruct</h1>
              <p className="paragraph">
                Mixtral8x7B is a powerful open-source language model excelling in tasks like code generation and translation. It offers high performance at a fraction of the cost compared to similar models.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=Mixtral8x7BInstruct')}>Chat</button></a>
          </div>
          <div className="card">
            <div className="info">
              <img src={mistralImage} alt="" style={{ width: '100%' }} />
              <h1>Mistral 7B Instruct</h1>
              <p className="paragraph">
                Mistral 7B Instruct is a large language model fine-tuned for conversation and question answering, built for easy adaptation to new tasks.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=Mistral7BInstruct')}>Chat</button></a>
          </div>
          <div className="card">
            <div className="info">
              <img src={metaImage} alt="" style={{ width: '100%' }} />
              <h1>Llama2 70B</h1>
              <p className="paragraph">
                Llama2 70B is a large language model with 70 billion parameters, trained for conversation and integrated with the Hugging Face Transformers library.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=Llama270B')}>Chat</button></a>
          </div>
          <div className="card">
            <div className="info">
              <img src={metaImage} alt="" style={{ width: '100%' }} />
              <h1>Code Llama 70B</h1>
              <p className="paragraph">
                Code Llama 70B, a Meta LLM, tackles code creation and comprehension. Open-source, it offers general and Python-focused versions, nearing the power of GPT-3.5.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=CodeLlama70B')}>Chat</button></a>
          </div>
          <div className="card">
            <div className="info">
              <img src={metaImage} alt="" style={{ width: '100%' }} />
              <h1>Code Llama 34B</h1>
              <p className="paragraph">
                Code Llama 34B is a large language model, specializing in understanding and generating code. With 34 billion parameters, it's a powerhouse for programmers.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=CodeLlama34B')}>Chat</button></a>
          </div>
          <div className="card">
            <div className="info">
              <img src={metaImage} alt="" style={{ width: '100%' }} />
              <h1>Code Llama 13B</h1>
              <p className="paragraph">
                Code Llama 13B is a large language model (LLM) that generates and understands computer code. At 13 billion parameters, it's a powerful tool for programmers.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=CodeLlama13B')}>Chat</button></a>
          </div>
          <div className="card">
            <div className="info">
              <img src={metaImage} alt="" style={{ width: '100%' }} />
              <h1>NV-Llama2-70B-RLHF</h1>
              <p className="paragraph">
                NV-Llama2-70B-RLHF is a large language model by Nvidia with 70 billion parameters, trained to follow instructions and respond to prompts.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=NVLlama270BRLHF')}>Chat</button></a>
          </div>
          <div className="card">
            <div className="info">
              <img src={metaImage} alt="" style={{ width: '100%' }} />
              <h1>NV-Llama2-70B-SteerLM-Chat</h1>
              <p className="paragraph">
                NV-Llama2-70B-SteerLM-Chat is a large language model by NVIDIA with 70 billion parameters, allowing adjustable chat conversation style.
              </p>
            </div>
            <a href="/chat"><button type="button" className="btn para" onClick={() => setCookie('Model=NVLlama270BSteerLMChat')}>Chat</button></a>
          </div>
        </div>
      </section>
      </div>
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <i className='bx bxs-up-arrow'></i>
        </button>
      )}
    </div>
    
    </>
  );
};

export default Homepage;
