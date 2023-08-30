import { createContext } from 'react';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import useAuthDispatch from '../hooks/useAuthDispatch';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
);
