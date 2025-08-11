import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ChipDisplay({ chips }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        backgroundColor: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 2,
        boxShadow: 2,
        width: 200,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 1 }}>
        Your Chips
      </Typography>
      {chips.length > 0 ? (
        chips.map((chip, index) => (
          <Typography key={index} variant="body2">
            {chip.category}
          </Typography>
        ))
      ) : (
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          No chips yet
        </Typography>
      )}
    </Box>
  );
}