import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Chatbot from "./Pages/Test"
  
function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen flex items-center justify-center">
      <Routes>
          <Route path="/" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;