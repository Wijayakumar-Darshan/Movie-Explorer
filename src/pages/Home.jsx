// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import tmdb from '../api/tmdb';
import '../styles/Home.css'; // Import external CSS

export default function Home() {
  const { movies, setMovies } = useMovie();
  const { isAuthenticated, userName, logout } = useAuth();
  const navigate = useNavigate();

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await tmdb.get('/trending/movie/week');
        setMovies(res.data.results);
        setFilteredMovies(res.data.results);
      } catch (err) {
        console.error('Failed to fetch trending movies:', err);
      }
    };
    fetchTrending();
  }, [setMovies]);

  useEffect(() => {
    if (!selectedGenre) {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.genre_ids.includes(Number(selectedGenre))
        )
      );
    }
  }, [selectedGenre, movies]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="home-container">
      <Typography className="home-title" variant="h4">
        Trending Movies
      </Typography>

      {isAuthenticated ? (
        <Box className="user-info-bar">
          <Typography className="username" variant="h6">
            Welcome, {userName}!
          </Typography>
          <Button className="logout-button" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box className="auth-actions">
          <Button variant="contained" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="outlined" onClick={() => navigate('/register')}>
            Sign Up
          </Button>
        </Box>
      )}

      <SearchBar />
      <FilterBar onFilterChange={setSelectedGenre} />

      <Grid container spacing={2}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </div>
  );
} 