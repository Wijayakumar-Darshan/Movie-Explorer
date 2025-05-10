// src/pages/Favorites.jsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useMovie } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const { favorites } = useMovie();

  return (
    <div>
      <Typography variant="h4" sx={{ m: 2 }}>Your Favorites</Typography>
      <Grid container>
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </div>
  );
}