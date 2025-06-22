import React from 'react';
import { AuthProvider as AuthContextProvider } from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}