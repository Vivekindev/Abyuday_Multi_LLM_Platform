import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './Chatpage';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import AuthTokenReceiver from './utils/AuthTokenReceiver'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatPage props={{name:"sameer"}} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/auth/token' element={<AuthTokenReceiver />} />
        <Route path='/' element={<Homepage />} />

      </Routes>
    </Router>
  );
}

export default App; 