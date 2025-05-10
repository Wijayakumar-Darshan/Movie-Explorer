// src/components/FavouritesList.jsx
import React from 'react';
import { useMovie } from '../context/MovieContext';
import MovieCard from './MovieCard';
import { Grid, Typography } from '@mui/material';

export default function FavouritesList() {
  const { favorites } = useMovie();

  return (
    <div>
      <Typography variant="h5" sx={{ m: 2 }}>Your Favorite Movies</Typography>
      <Grid container>
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </div>
  );
}
