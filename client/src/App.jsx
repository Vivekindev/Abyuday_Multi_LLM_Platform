import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './Chatpage';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage props={{name:"sameer"}} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/homepage' element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App; 