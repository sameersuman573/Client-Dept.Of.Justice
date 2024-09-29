 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatbotUI from './Pages/ChatBot';
 
function App() {
  return (
    <Router>
      <div>
        <Routes>
           <Route path="/" element={<ChatbotUI />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;