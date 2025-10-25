import React from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

export default function Pagination({ page = 1, totalPages = 1, onChange = () => {} }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
      <IconButton disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft /></IconButton>
      <Box sx={{ px: 1 }}>{page} / {totalPages}</Box>
      <IconButton disabled={page >= totalPages} onClick={() => onChange(page + 1)}><ChevronRight /></IconButton>
    </Box>
  );
}
