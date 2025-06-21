import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import MembersArea from './pages/MembersArea';
import ThreadView from './pages/ThreadView';
import NewThread from './pages/NewThread';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function App() {
  const [focusMode, setFocusMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // In real app, this would come from auth context

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header 
          focusMode={focusMode} 
          onToggleFocus={toggleFocusMode}
          isAuthenticated={isAuthenticated}
        />
        <Routes>
          <Route path="/" element={<Home focusMode={focusMode} isAuthenticated={isAuthenticated} />} />
          <Route path="/members" element={<MembersArea />} />
          <Route path="/thread/:id" element={<ThreadView />} />
          <Route path="/new-thread" element={<NewThread />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;