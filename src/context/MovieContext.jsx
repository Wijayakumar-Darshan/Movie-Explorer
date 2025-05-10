// src/context/MovieContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const MovieContext = createContext();

export const useMovie = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load favorites for the logged-in user
  useEffect(() => {
    if (currentUser) {
      const stored = JSON.parse(localStorage.getItem('userFavorites')) || {};
      setFavorites(stored[currentUser.email] || []);
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  // Save favorites for the current user
  const saveFavorites = (updated) => {
    const allFavs = JSON.parse(localStorage.getItem('userFavorites')) || {};
    allFavs[currentUser.email] = updated;
    localStorage.setItem('userFavorites', JSON.stringify(allFavs));
  };

  const toggleFavorite = (movie) => {
    if (!currentUser) {
      alert('You must be logged in to add favorites.');
      return;
    }

    let updated;
    if (favorites.some(m => m.id === movie.id)) {
      updated = favorites.filter(m => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    saveFavorites(updated);
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies, favorites, toggleFavorite }}>
      {children}
    </MovieContext.Provider>
  );
};
