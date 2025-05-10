// src/components/FilterBar.jsx
import React, { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import '../styles/FilterBar.css';

const genres = [
  { id: '', name: 'All' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  // Add more genres as needed
];

export default function FilterBar({ onFilterChange }) {
  const [genre, setGenre] = useState('');

  const handleChange = (event) => {
    const selectedGenre = event.target.value;
    setGenre(selectedGenre);
    onFilterChange(selectedGenre);
  };

  return (
  <Box className="filter-bar-container">
    <FormControl className="filter-form-control">
      <InputLabel id="genre-label">Genre</InputLabel>
      <Select
        labelId="genre-label"
        id="genre-select"
        name="genre"
        value={genre}
        label="Genre"
        onChange={handleChange}
      >
        {genres.map((g) => (
          <MenuItem key={g.id} value={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);
}
