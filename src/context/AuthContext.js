// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from '../utils/localStorageHelpers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = loadFromLocalStorage('authUser');
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const login = async (email, password, rememberMe = false) => {
    const users = loadFromLocalStorage('users') || [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        u.password === password
    );

    if (user) {
      saveToLocalStorage('authUser', user);
      setCurrentUser(user);
      return { success: true };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const signup = async (username, email, password) => {
    const users = loadFromLocalStorage('users') || [];

    const userExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      return { success: false, message: 'Email already in use' };
    }

    const newUser = { username, email, password };
    const updatedUsers = [...users, newUser];

    saveToLocalStorage('users', updatedUsers);
    return { success: true };
  };

  const logout = () => {
    removeFromLocalStorage('authUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        userName: currentUser?.username || currentUser?.email || 'User',
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
