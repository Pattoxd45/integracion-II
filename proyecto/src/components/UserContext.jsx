import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [userId, setUser] = useState(() => {
    // Recuperar el userId del localStorage
    return localStorage.getItem('userId') || null;
  });

  // Guardar el userId en localStorage cuando cambia
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};