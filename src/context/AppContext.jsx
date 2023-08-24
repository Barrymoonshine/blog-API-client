import { createContext } from 'react';
import useApp from '../hooks/useApp';

export const AppContext = createContext();

export const AppProvider = ({ children }) => (
  <AppContext.Provider value={useApp()}>{children}</AppContext.Provider>
);
