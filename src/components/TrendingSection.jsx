// src/components/TrendingSection.jsx
import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import tmdb from '../api/tmdb';
import MovieCard from './MovieCard';

export default function TrendingSection() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await tmdb.get('/trending/movie/week');
      setTrending(res.data.results);
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ m: 2 }}>Trending Now</Typography>
      <Grid container>
        {trending.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </div>
  );
}