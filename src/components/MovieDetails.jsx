// src/components/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import tmdb from '../api/tmdb';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await tmdb.get(`/movie/${id}`, {
        params: { append_to_response: 'videos,credits' }
      });
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer');

  return (
    <Container>
      <Typography variant="h3">{movie.title}</Typography>
      <Typography variant="body1">{movie.overview}</Typography>
      {trailer && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="YouTube trailer"
          allowFullScreen
        />
      )}
    </Container>
  );
}
