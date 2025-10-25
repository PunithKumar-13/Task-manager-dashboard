import React, { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { getTheme } from './theme';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import TaskPage from './pages/TaskPage.jsx';
import AuditLogsPage from './pages/AuditLogsPage.jsx';
import ProfileDialog from './components/ProfileDialog.jsx';

export default function App() {
  const saved = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(saved === 'true');
  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode]);
  const [selected, setSelected] = useState('tasks');
  const [profileOpen, setProfileOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@you.com',
    phone: '+91 90000 00000',
    role: 'Developer',
    image: null
  });

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
            profile={profile}
          />

          {selected === 'tasks' && <TaskPage profile={profile} />}
          {selected === 'logs' && <AuditLogsPage profile={profile} />}
        </Box>
      </Box>

      <ProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profile={profile}
        onUpdate={setProfile}
      />
    </ThemeProvider>
  );
}
