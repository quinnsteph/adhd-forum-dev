import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { initializeStorage } from './utils/storage';
import Header from './components/Layout/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MembersArea from './pages/MembersArea';
import SectionView from './pages/SectionView';
import ThreadView from './pages/ThreadView';
import NewThread from './pages/NewThread';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function AppContent() {
  const [focusMode, setFocusMode] = useState(false);

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        focusMode={focusMode} 
        onToggleFocus={toggleFocusMode}
      />
      <Routes>
        <Route path="/" element={<Home focusMode={focusMode} />} />
        <Route 
          path="/members" 
          element={
            <ProtectedRoute>
              <MembersArea />
            </ProtectedRoute>
          } 
        />
        <Route path="/section/:sectionId" element={<SectionView />} />
        <Route path="/thread/:id" element={<ThreadView />} />
        <Route 
          path="/new-thread" 
          element={
            <ProtectedRoute>
              <NewThread />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;