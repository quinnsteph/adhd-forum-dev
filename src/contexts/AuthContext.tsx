import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  adhdType?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('adhd-forum-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const { trackAuth, setUserProperties } = useAnalytics();

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('adhd-forum-users') || '[]');
      const existingUser = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
      
      if (existingUser) {
        const userData: User = {
          id: existingUser.id,
          username: existingUser.username,
          avatar: existingUser.avatar,
          bio: existingUser.bio,
          adhdType: existingUser.adhdType,
          joinedAt: new Date(existingUser.joinedAt),
          isOnline: true,
          role: existingUser.role || 'member',
          isVerified: existingUser.isVerified || false,
        };
        
        setUser(userData);
        localStorage.setItem('adhd-forum-user', JSON.stringify(userData));
        
        // Track successful login
        trackAuth.login('email', true, userData.adhdType);
        setUserProperties({
          user_id: userData.id,
          username: userData.username,
          adhd_type: userData.adhdType,
          user_role: userData.role,
          member_since: userData.joinedAt.toISOString(),
          is_authenticated: true,
        });
        
        return true;
      }
      
      // Track failed login
      trackAuth.login('email', false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      trackAuth.login('email', false);
      return false;
    } finally {
      setLoading(false);
    }
  }, [trackAuth, setUserProperties]);

  const signup = useCallback(async (userData: SignupData): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('adhd-forum-users') || '[]');
      const existingUser = users.find((u: { email: string; username: string }) => u.email === userData.email || u.username === userData.username);
      
      if (existingUser) {
        // Track failed signup - user already exists
        trackAuth.signup(false, userData.adhdType);
        return false; // User already exists
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username)}&background=6366f1&color=fff`,
        bio: '',
        adhdType: userData.adhdType || undefined,
        joinedAt: new Date(),
        isOnline: true,
        role: 'member',
        isVerified: false,
      };
      
      // Store user with password for future logins
      const userWithPassword = { ...newUser, email: userData.email, password: userData.password };
      users.push(userWithPassword);
      localStorage.setItem('adhd-forum-users', JSON.stringify(users));
      
      // Set current user
      setUser(newUser);
      localStorage.setItem('adhd-forum-user', JSON.stringify(newUser));
      
      // Track successful signup
      trackAuth.signup(true, newUser.adhdType);
      setUserProperties({
        user_id: newUser.id,
        username: newUser.username,
        adhd_type: newUser.adhdType,
        user_role: newUser.role,
        member_since: newUser.joinedAt.toISOString(),
        is_authenticated: true,
      });
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      trackAuth.signup(false, userData.adhdType);
      return false;
    } finally {
      setLoading(false);
    }
  }, [trackAuth, setUserProperties]);

  const logout = useCallback(() => {
    trackAuth.logout();
    setUser(null);
    localStorage.removeItem('adhd-forum-user');
  }, [trackAuth]);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}