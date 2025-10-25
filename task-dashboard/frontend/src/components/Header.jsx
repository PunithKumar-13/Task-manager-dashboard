import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Header({ title, onToggleTheme, darkMode, onProfileOpen, profile }) {
  return (
    <AppBar position="static" color="inherit" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>{title}</Typography>

        <IconButton onClick={onToggleTheme} edge="end" aria-label="toggle-theme">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Box sx={{ ml: 1 }}>
          <IconButton onClick={onProfileOpen}>
            <Avatar
              alt={profile.name}
              src={profile.image || ''}
            >
              {!profile.image && (profile.name ? profile.name.charAt(0).toUpperCase() : 'U')}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
