import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { initializeStorage } from '../utils/storage';
import Header from './Layout/Header';
import HomePage from './HomePage';

export default function PageWrapper() {
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    initializeStorage();
  }, []);

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  // Determine which page to render based on current URL
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header 
          focusMode={focusMode} 
          onToggleFocus={toggleFocusMode}
        />
        
        {pathname === '/' && <HomePage focusMode={focusMode} />}
        
        {/* Focus Mode Indicator */}
        {focusMode && (
          <div className="fixed bottom-4 right-4 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            Focus Mode Active
          </div>
        )}
      </div>
    </AuthProvider>
  );
}