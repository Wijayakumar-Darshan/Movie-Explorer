// src/components/MovieCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import '../styles/MovieCard.css';

export default function MovieCard({ movie }) {
  const { toggleFavorite, favorites } = useMovie();
  const { isAuthenticated } = useAuth();
  const isFav = favorites.some((m) => m.id === movie.id);
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // prevent navigation if inside <Link>

    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    toggleFavorite(movie);
  };

  const handleClose = () => setShowLoginDialog(false);
  const goToLogin = () => navigate('/login');
  const goToSignup = () => navigate('/register');

  return (
    <>
      <Card sx={{ width: 200, margin: 2 }}>
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>
        <CardContent>
          <Typography variant="h6" noWrap>{movie.title}</Typography>
          <Typography variant="body2">{movie.release_date?.split('-')[0]}</Typography>
          <Typography variant="body2">⭐ {movie.vote_average}</Typography>

          <Tooltip title={isAuthenticated ? 'Add to Favorites' : 'Login required'}>
            <IconButton
              onClick={handleFavoriteClick}
              aria-label={isAuthenticated ? "Add to favorites" : "Login to favorite"}
            >
              <FavoriteIcon color={isFav ? 'error' : 'disabled'} />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Card>

      <Dialog open={showLoginDialog} onClose={handleClose}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>You must be logged in to add favorites.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={goToLogin} variant="contained">Login</Button>
          <Button onClick={goToSignup} variant="outlined">Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
