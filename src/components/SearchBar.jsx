// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import tmdb from '../api/tmdb';
import { useMovie } from '../context/MovieContext';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { setMovies } = useMovie();

  const handleSearch = async () => {
    const res = await tmdb.get('/search/movie', { params: { query } });
    setMovies(res.data.results);
    localStorage.setItem('lastSearch', query);
  };

  return (
  <div className="search-bar-container">
    <TextField
      label="Search Movies"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      fullWidth
    />
    <Button variant="contained" onClick={handleSearch}>
      Search
    </Button>
  </div>
);}