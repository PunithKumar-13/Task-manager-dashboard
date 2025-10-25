import React, { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { getTheme } from './theme';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TasksPage from './pages/TasksPage';
import AuditLogsPage from './pages/AuditLogsPage';
import ProfileDialog from './components/ProfileDialog';

export default function App() {
  const saved = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(saved === 'true');
  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);
  const [selected, setSelected] = useState('tasks');
  const [profileOpen, setProfileOpen] = useState(false);

  // sample profile (front-end only)
  const profile = { name: 'Demo User', email: 'demo@you.com', phone: '+91 90000 00000', role: 'Developer' };

  function handleToggleTheme() {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar onNav={(s) => setSelected(s)} selected={selected} />
        <Box sx={{ flexGrow: 1 }}>
          <Header
            title="Task Manager Dashboard"
            onToggleTheme={handleToggleTheme}
            darkMode={darkMode}
            onProfileOpen={() => setProfileOpen(true)}
          />
          {selected === 'tasks' && <TasksPage />}
          {selected === 'logs' && <AuditLogsPage />}
        </Box>
      </Box>

      <ProfileDialog open={profileOpen} onClose={() => setProfileOpen(false)} profile={profile} />
    </ThemeProvider>
  );
}
