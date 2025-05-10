// src/pages/MoviePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import tmdb from '../api/tmdb';
import { Typography, Container, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await tmdb.get(`/movie/${id}`, {
          params: { append_to_response: 'videos,credits' }
        });
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer');

  if (!isAuthenticated) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>You must be logged in to view this movie's details and trailer.</Typography>
        <Box sx={{ mt: 2 }}>
          <Link to="/login" state={{ from: location }} style={{ textDecoration: 'none' }}>
            <Button variant="contained">Login to Continue</Button>
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">{movie.title}</Typography>
      <Typography variant="body1" sx={{ my: 2 }}>{movie.overview}</Typography>
      {trailer && (
        <Box sx={{ my: 2 }}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </Container>
  );
}
