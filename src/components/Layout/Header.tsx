import React, { useState } from 'react';
import { Brain, Menu, X, Focus, Globe, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAnalytics } from '../../hooks/useAnalytics';

interface HeaderProps {
  focusMode: boolean;
  onToggleFocus: () => void;
}

export default function Header({ focusMode, onToggleFocus }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { trackFeature, trackNavigation } = useAnalytics();

  const handleFocusModeToggle = () => {
    onToggleFocus();
    trackFeature.focusMode(!focusMode);
  };

  const handleNavigationClick = (section: string, isPublic: boolean) => {
    trackNavigation.section(section, section, isPublic);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors">
              <Brain className="h-6 w-6 text-primary-600" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-gray-900">ADHD Forum</h1>
              <p className="text-xs text-gray-500 -mt-1">Safe space for support</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              onClick={() => handleNavigationClick('public', true)}
            >
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>Public</span>
              </div>
            </Link>
            {isAuthenticated && (
              <Link 
                to="/members" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => handleNavigationClick('members', false)}
              >
                <div className="flex items-center space-x-1">
                  <Lock className="w-4 h-4" />
                  <span>Members</span>
                </div>
              </Link>
            )}
            <Link to="/topics" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Topics
            </Link>
            <Link to="/new-thread" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium">
              New Thread
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Focus Mode Toggle */}
            <button
              onClick={handleFocusModeToggle}
              className={`p-2 rounded-lg transition-colors ${
                focusMode 
                  ? 'bg-secondary-100 text-secondary-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Toggle Focus Mode"
            >
              <Focus className="h-5 w-5" />
            </button>

            {/* User Profile / Auth */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2">
                    <img
                      src={user?.avatar || "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium">{user?.username || 'You'}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="text-gray-500 hover:text-gray-700 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                    Sign In
                  </Link>
                  <Link to="/signup" className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors font-medium">
                    Join Us
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium">
                <Globe className="w-4 h-4" />
                <span>Public Discussions</span>
              </Link>
              {isAuthenticated && (
                <Link to="/members" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium">
                  <Lock className="w-4 h-4" />
                  <span>Members Only</span>
                </Link>
              )}
              <Link to="/topics" className="block text-gray-700 hover:text-primary-600 font-medium">
                Topics
              </Link>
              <Link to="/new-thread" className="block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium text-center">
                New Thread
              </Link>
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <img
                        src={user?.avatar || "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-700 font-medium">{user?.username || 'You'}</span>
                    </div>
                    <button 
                      onClick={logout}
                      className="block text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block text-gray-700 hover:text-primary-600 font-medium">
                      Sign In
                    </Link>
                    <Link to="/signup" className="block bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors font-medium text-center">
                      Join Us
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}